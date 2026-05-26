#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

let sharp

try {
  sharp = (await import('sharp')).default
} catch (error) {
  console.error('This script requires sharp. Run `pnpm install` in the repository first.')
  process.exit(1)
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const skillDir = path.resolve(scriptDir, '..')
const defaultLogoDir = path.join(skillDir, 'assets')

const validCorners = new Set(['lower-left', 'lower-right', 'upper-left', 'upper-right'])
const validLogos = new Set(['auto', 'black', 'white'])

function usage() {
  return `Usage:
  node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs --input <path> --output <path> [options]

Options:
  --input <path>       Image to watermark.
  --output <path>      Output image. May equal --input for in-place replacement.
  --corner <corner>    lower-left, lower-right, upper-left, or upper-right. Default: lower-left.
  --logo <choice>      auto, black, or white. Default: auto.
  --logo-dir <path>    Directory containing logo-black.png and logo-white.png.
  --scale <number>     Logo width as a fraction of image width. Default: 0.065.
  --margin <number>    Margin as a fraction of image width. Default: 0.042.
  --opacity <number>   Logo opacity from 0 to 1. Default: 0.95.
  --json               Print machine-readable JSON.
  --help               Show this help text.
`
}

function parseArgs(argv) {
  const options = {
    corner: 'lower-left',
    logo: 'auto',
    logoDir: defaultLogoDir,
    scale: 0.065,
    margin: 0.042,
    opacity: 0.95,
    json: false,
  }
  const positional = []

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === '--help' || arg === '-h') {
      options.help = true
      continue
    }

    if (arg === '--json') {
      options.json = true
      continue
    }

    if (!arg.startsWith('--')) {
      positional.push(arg)
      continue
    }

    const [rawKey, inlineValue] = arg.slice(2).split('=', 2)
    const key = rawKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    const value = inlineValue ?? argv[index + 1]

    if (inlineValue === undefined) {
      index += 1
    }

    options[key] = value
  }

  if (!options.input && positional[0]) {
    options.input = positional[0]
  }

  if (!options.output && positional[1]) {
    options.output = positional[1]
  }

  if (!options.output && options.input) {
    const parsed = path.parse(options.input)
    options.output = path.join(parsed.dir, `${parsed.name}-watermarked${parsed.ext || '.png'}`)
  }

  options.scale = Number(options.scale)
  options.margin = Number(options.margin)
  options.opacity = Number(options.opacity)

  return options
}

function fail(message) {
  console.error(message)
  console.error('')
  console.error(usage())
  process.exit(1)
}

function validateOptions(options) {
  if (options.help) {
    console.log(usage())
    process.exit(0)
  }

  if (!options.input) {
    fail('Missing --input.')
  }

  if (!options.output) {
    fail('Missing --output.')
  }

  if (!validCorners.has(options.corner)) {
    fail(`Invalid --corner "${options.corner}".`)
  }

  if (!validLogos.has(options.logo)) {
    fail(`Invalid --logo "${options.logo}".`)
  }

  if (!Number.isFinite(options.scale) || options.scale <= 0 || options.scale > 0.5) {
    fail('--scale must be a number greater than 0 and no more than 0.5.')
  }

  if (!Number.isFinite(options.margin) || options.margin < 0 || options.margin > 0.5) {
    fail('--margin must be a number from 0 to 0.5.')
  }

  if (!Number.isFinite(options.opacity) || options.opacity <= 0 || options.opacity > 1) {
    fail('--opacity must be a number greater than 0 and no more than 1.')
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function srgbToLinear(value) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(red, green, blue) {
  return 0.2126 * srgbToLinear(red) + 0.7152 * srgbToLinear(green) + 0.0722 * srgbToLinear(blue)
}

function getPosition({ imageWidth, imageHeight, logoWidth, logoHeight, margin, corner }) {
  const x = corner.endsWith('left') ? margin : imageWidth - logoWidth - margin
  const y = corner.startsWith('upper') ? margin : imageHeight - logoHeight - margin

  return {
    left: Math.round(clamp(x, 0, Math.max(0, imageWidth - logoWidth))),
    top: Math.round(clamp(y, 0, Math.max(0, imageHeight - logoHeight))),
  }
}

async function getAverageLuminance(input, region) {
  const stats = await sharp(input).extract(region).stats()
  const [red, green, blue] = stats.channels.slice(0, 3).map((channel) => channel.mean / 255)

  return relativeLuminance(red, green, blue)
}

function chooseLogo(luminance) {
  const blackContrast = (luminance + 0.05) / 0.05
  const whiteContrast = 1.05 / (luminance + 0.05)

  return {
    selected: whiteContrast >= blackContrast ? 'white' : 'black',
    blackContrast,
    whiteContrast,
  }
}

async function makeLogoBuffer(logoPath, logoWidth, opacity) {
  const resized = sharp(logoPath).resize({ width: logoWidth }).ensureAlpha()

  if (opacity >= 0.999) {
    const buffer = await resized.png().toBuffer()
    const metadata = await sharp(buffer).metadata()
    return { buffer, width: metadata.width, height: metadata.height }
  }

  const { data, info } = await resized.raw().toBuffer({ resolveWithObject: true })

  for (let index = 3; index < data.length; index += info.channels) {
    data[index] = Math.round(data[index] * opacity)
  }

  const buffer = await sharp(data, { raw: info }).png().toBuffer()
  return { buffer, width: info.width, height: info.height }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  validateOptions(options)

  const input = path.resolve(options.input)
  const output = path.resolve(options.output)
  const logoDir = path.resolve(options.logoDir)
  const metadata = await sharp(input).metadata()

  if (!metadata.width || !metadata.height) {
    fail(`Could not read image dimensions for ${input}.`)
  }

  const imageWidth = metadata.width
  const imageHeight = metadata.height
  const minLogoWidth = Math.min(56, Math.floor(imageWidth * 0.25), Math.floor(imageHeight * 0.25))
  const maxLogoWidth = Math.max(
    minLogoWidth,
    Math.min(104, Math.floor(imageWidth * 0.18), Math.floor(imageHeight * 0.24))
  )
  const logoWidth = Math.round(clamp(imageWidth * options.scale, minLogoWidth, maxLogoWidth))
  const margin = Math.round(clamp(imageWidth * options.margin, 24, Math.max(24, imageWidth * 0.08)))
  const samplePosition = getPosition({
    imageWidth,
    imageHeight,
    logoWidth,
    logoHeight: logoWidth,
    margin,
    corner: options.corner,
  })
  const sampleRegion = {
    left: samplePosition.left,
    top: samplePosition.top,
    width: Math.min(logoWidth, imageWidth - samplePosition.left),
    height: Math.min(logoWidth, imageHeight - samplePosition.top),
  }
  const luminance = await getAverageLuminance(input, sampleRegion)
  const contrast = chooseLogo(luminance)
  const selectedLogo = options.logo === 'auto' ? contrast.selected : options.logo
  const logoPath = path.join(logoDir, `logo-${selectedLogo}.png`)
  const logo = await makeLogoBuffer(logoPath, logoWidth, options.opacity)
  const position = getPosition({
    imageWidth,
    imageHeight,
    logoWidth: logo.width,
    logoHeight: logo.height,
    margin,
    corner: options.corner,
  })

  await fs.mkdir(path.dirname(output), { recursive: true })

  const samePath = input === output
  const tempOutput = samePath ? path.join(path.dirname(output), `.${path.basename(output)}.${process.pid}.tmp.png`) : output

  await sharp(input)
    .composite([{ input: logo.buffer, left: position.left, top: position.top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(tempOutput)

  if (samePath) {
    await fs.rename(tempOutput, output)
  }

  const outputMetadata = await sharp(output).metadata()
  const summary = {
    input,
    output,
    selectedLogo,
    corner: options.corner,
    position,
    logoSize: { width: logo.width, height: logo.height },
    imageSize: { width: imageWidth, height: imageHeight },
    outputSize: { width: outputMetadata.width, height: outputMetadata.height },
    luminance: Number(luminance.toFixed(4)),
    contrast: {
      black: Number(contrast.blackContrast.toFixed(2)),
      white: Number(contrast.whiteContrast.toFixed(2)),
    },
  }

  if (options.json) {
    console.log(JSON.stringify(summary, null, 2))
    return
  }

  console.log(`Watermarked ${path.relative(process.cwd(), output)}`)
  console.log(`logo: ${summary.selectedLogo}`)
  console.log(`corner: ${summary.corner}`)
  console.log(`position: ${summary.position.left},${summary.position.top}`)
  console.log(`logoSize: ${summary.logoSize.width}x${summary.logoSize.height}`)
  console.log(`imageSize: ${summary.imageSize.width}x${summary.imageSize.height}`)
  console.log(`contrast: black ${summary.contrast.black}, white ${summary.contrast.white}`)
}

main().catch((error) => {
  console.error(error?.stack || error)
  process.exit(1)
})

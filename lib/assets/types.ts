import { z } from 'zod'

export type AssetId = `/static/images/${string}`

const ASSET_ID_PREFIX = '/static/images/'

export function isAssetId(value: string): value is AssetId {
  if (!value.startsWith(ASSET_ID_PREFIX)) return false
  if (value.includes('\\') || value.includes('%') || value.includes('?') || value.includes('#')) {
    return false
  }

  const relativePath = value.slice(ASSET_ID_PREFIX.length)
  if (!relativePath || relativePath.startsWith('/') || relativePath.endsWith('/')) return false

  return relativePath
    .split('/')
    .every(
      (segment) =>
        segment.length > 0 &&
        segment !== '.' &&
        segment !== '..' &&
        /^[A-Za-z0-9_.-]+$/.test(segment)
    )
}

export function isHttpsAssetUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && Boolean(url.hostname) && !url.username && !url.password
  } catch {
    return false
  }
}

export const AssetIdSchema = z
  .string()
  .trim()
  .refine(isAssetId, 'Asset IDs must be normalized paths below /static/images/')

export const ASSET_ROLES = [
  'avatar',
  'logo',
  'card',
  'poster',
  'header',
  'diagram',
  'video',
] as const

export type AssetRole = (typeof ASSET_ROLES)[number]

export const BlogImageRolesSchema = z
  .object({
    homeRail: AssetIdSchema.optional(),
    gridCard: AssetIdSchema.optional(),
    listRow: AssetIdSchema.optional(),
    articleBanner: AssetIdSchema.optional(),
    social: AssetIdSchema.optional(),
  })
  .strict()

export type BlogImageRoles = z.infer<typeof BlogImageRolesSchema>

const httpsAssetUrlSchema = z
  .string()
  .trim()
  .refine(isHttpsAssetUrl, 'Remote media sources must be valid HTTPS URLs without credentials')

const assetSourceSchema = z.union([AssetIdSchema, httpsAssetUrlSchema])

const dimensionsSchema = z
  .object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })
  .strict()

export const ProjectImageHeroMediaSchema = dimensionsSchema.extend({
  type: z.literal('image'),
  src: assetSourceSchema,
  alt: z.string().trim().min(1, 'Image hero media requires alternative text'),
})

export const ProjectVideoHeroMediaSchema = dimensionsSchema.extend({
  type: z.literal('video'),
  label: z.string().trim().min(1, 'Video hero media requires an accessible label'),
  poster: assetSourceSchema,
  sources: z.tuple([
    z.object({ src: assetSourceSchema, type: z.literal('video/webm') }).strict(),
    z.object({ src: assetSourceSchema, type: z.literal('video/mp4') }).strict(),
  ]),
  caption: z.string().trim().min(1).optional(),
})

export const ProjectHeroMediaSchema = z.discriminatedUnion('type', [
  ProjectImageHeroMediaSchema,
  ProjectVideoHeroMediaSchema,
])

export type ProjectHeroMedia = z.infer<typeof ProjectHeroMediaSchema>

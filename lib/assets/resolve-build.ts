import type { ImageProps } from 'next/image'
import rawAssetManifest from '@/data/assets-manifest.json'
import type { AssetId, AssetRole } from './types'
import { isAssetId, isHttpsAssetUrl } from './types'

export type ResolvableAsset = ImageProps['src']

export interface AssetRecord {
  url: `https://${string}`
  sha256: string
  bytes: number
  contentType: string
  role: AssetRole
  width?: number
  height?: number
}

export type AssetManifest = Partial<Record<AssetId, AssetRecord>>

export interface AssetResolutionOptions {
  manifest?: AssetManifest
  allowLocalFallback?: boolean
  approvedRemoteHosts?: readonly string[]
}

const assetManifest = rawAssetManifest as AssetManifest
const permanentlyApprovedHosts = ['picsum.photos']

function isSafeImageDataUrl(value: string): boolean {
  return /^data:image\/(?:avif|gif|jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(value)
}

function configuredBlobHost(): string | undefined {
  const origin = process.env.BLOB_PUBLIC_ORIGIN?.trim()
  if (origin) {
    try {
      const url = new URL(origin)
      if (
        url.protocol === 'https:' &&
        url.pathname === '/' &&
        !url.username &&
        !url.password &&
        !url.search &&
        !url.hash
      ) {
        return url.hostname
      }
    } catch {
      // next.config.js owns the deployment-time configuration error. The
      // resolver simply declines to approve an invalid origin.
    }
  }

  // Keep the store-ID fallback for local publisher workflows, where the
  // operator has store credentials but may not be running an application build.
  const storeId = process.env.BLOB_PUBLIC_STORE_ID?.trim()
  if (!storeId || !/^[A-Za-z0-9]+$/.test(storeId)) return undefined
  return `${storeId}.public.blob.vercel-storage.com`
}

function approvedHosts(options: AssetResolutionOptions): Set<string> {
  return new Set(
    [
      ...permanentlyApprovedHosts,
      configuredBlobHost(),
      ...(options.approvedRemoteHosts ?? []),
    ].filter((host): host is string => Boolean(host))
  )
}

function isApprovedHttpsUrl(value: string, options: AssetResolutionOptions): boolean {
  if (!isHttpsAssetUrl(value)) return false
  return approvedHosts(options).has(new URL(value).hostname)
}

function resolveLogicalAsset(id: AssetId, options: AssetResolutionOptions): string {
  const manifest = options.manifest ?? assetManifest
  const record = manifest[id]
  if (record) {
    if (!isApprovedHttpsUrl(record.url, options)) {
      throw new Error(`Manifest asset uses an unapproved remote host: ${id}`)
    }
    return record.url
  }

  const allowLocalFallback =
    options.allowLocalFallback ?? process.env.ASSET_LOCAL_FALLBACK !== 'false'
  if (allowLocalFallback) return id

  throw new Error(`Unknown logical asset ID: ${id}`)
}

export function resolveAssetUrl(
  value: ResolvableAsset,
  options: AssetResolutionOptions = {}
): ResolvableAsset {
  if (typeof value !== 'string') return value

  if (isAssetId(value)) return resolveLogicalAsset(value, options)
  if (isApprovedHttpsUrl(value, options) || isSafeImageDataUrl(value)) return value

  throw new Error(`Unsupported asset source: ${value}`)
}

export function resolveOptionalAssetUrl(
  value?: ResolvableAsset | null,
  options: AssetResolutionOptions = {}
): ResolvableAsset | undefined {
  return value == null ? undefined : resolveAssetUrl(value, options)
}

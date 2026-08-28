import type { BlogImageRoles, ProjectHeroMedia } from './types'
import { BlogImageRolesSchema, ProjectHeroMediaSchema } from './types'
import { resolveAssetUrl } from './resolve-build'
import { resolveProjectHeroMedia } from './project-media'

type BlogAssetFields = {
  images?: unknown
  cardImage?: string
  imageRoles?: unknown
  structuredData?: unknown
}

type ProjectAssetFields = {
  image?: string
  cardImage?: string
  heroMedia?: unknown
}

type AuthorAssetFields = { avatar?: string }
type CompanyAssetFields = { logo?: string }

function resolveString(value: string | undefined): string | undefined {
  return value ? (resolveAssetUrl(value) as string) : undefined
}

function resolveImages(value: unknown): unknown {
  if (typeof value === 'string') return resolveAssetUrl(value) as string
  if (Array.isArray(value)) {
    return value.map((image) => (typeof image === 'string' ? resolveAssetUrl(image) : image))
  }
  return value
}

function resolveBlogImageRoles(value: unknown): BlogImageRoles | undefined {
  if (value == null) return undefined
  const roles = BlogImageRolesSchema.parse(value)
  return Object.fromEntries(
    Object.entries(roles).map(([role, assetId]) => [role, resolveAssetUrl(assetId)])
  ) as BlogImageRoles
}

function resolveStructuredData(value: unknown, socialImage?: string): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !socialImage) return value
  return { ...value, image: socialImage }
}

/**
 * Resolves author-facing logical asset IDs before content crosses a client boundary.
 * The checked-in manifest therefore stays in server/build chunks rather than every card bundle.
 */
export function resolveBlogContentAssets<T extends BlogAssetFields>(content: T): T {
  const imageRoles = resolveBlogImageRoles(content.imageRoles)
  const images = resolveImages(content.images)
  const firstImage =
    typeof images === 'string' ? images : Array.isArray(images) ? images[0] : undefined
  const socialImage =
    imageRoles?.social ?? (typeof firstImage === 'string' ? firstImage : undefined)

  return {
    ...content,
    images,
    cardImage: resolveString(content.cardImage),
    imageRoles,
    structuredData: resolveStructuredData(content.structuredData, socialImage),
  }
}

export function resolveProjectContentAssets<T extends ProjectAssetFields>(content: T): T {
  const parsedHeroMedia =
    content.heroMedia == null ? undefined : ProjectHeroMediaSchema.parse(content.heroMedia)

  return {
    ...content,
    image: resolveString(content.image),
    cardImage: resolveString(content.cardImage),
    heroMedia: parsedHeroMedia
      ? (resolveProjectHeroMedia(parsedHeroMedia) as ProjectHeroMedia)
      : undefined,
  }
}

export function resolveAuthorContentAssets<T extends AuthorAssetFields>(content: T): T {
  return { ...content, avatar: resolveString(content.avatar) }
}

export function resolveCompanyContentAssets<T extends CompanyAssetFields>(content: T): T {
  return { ...content, logo: resolveString(content.logo) }
}

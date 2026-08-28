import type { AssetId, BlogImageRoles } from '@/lib/assets/types'

export type BlogImageSurface = 'home-rail' | 'grid-card' | 'list-row' | 'article-banner' | 'social'

type BlogImageContent = {
  images?: unknown
  cardImage?: string
  imageRoles?: BlogImageRoles
}

const roleForSurface: Record<BlogImageSurface, keyof BlogImageRoles> = {
  'home-rail': 'homeRail',
  'grid-card': 'gridCard',
  'list-row': 'listRow',
  'article-banner': 'articleBanner',
  social: 'social',
}

const globalSocialBanner = '/static/images/social-banner.png'

function firstImage(images: unknown): string | undefined {
  if (typeof images === 'string') return images
  return Array.isArray(images) && typeof images[0] === 'string' ? images[0] : undefined
}

export function getBlogImage(
  post: BlogImageContent,
  surface: BlogImageSurface
): string | undefined {
  const roleImage = post.imageRoles?.[roleForSurface[surface]] as AssetId | undefined
  if (roleImage) return roleImage

  const banner = firstImage(post.images)

  switch (surface) {
    case 'home-rail':
      return post.cardImage ?? banner
    case 'grid-card':
    case 'list-row':
      return banner ?? post.cardImage
    case 'article-banner':
    case 'social':
      return banner ?? globalSocialBanner
  }
}

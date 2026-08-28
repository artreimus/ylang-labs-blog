import { resolveAssetUrl, type AssetResolutionOptions } from './resolve-build'
import type { ProjectHeroMedia } from './types'

export type ResolvedProjectHeroMedia = ProjectHeroMedia

export function resolveProjectHeroMedia(
  media: ProjectHeroMedia,
  options: AssetResolutionOptions = {}
): ResolvedProjectHeroMedia {
  if (media.type === 'image') {
    return { ...media, src: resolveAssetUrl(media.src, options) as string }
  }

  return {
    ...media,
    poster: resolveAssetUrl(media.poster, options) as string,
    sources: [
      { ...media.sources[0], src: resolveAssetUrl(media.sources[0].src, options) as string },
      { ...media.sources[1], src: resolveAssetUrl(media.sources[1].src, options) as string },
    ],
  }
}

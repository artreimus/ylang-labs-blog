import Image from '@/components/Image'
import { resolveProjectHeroMedia } from '@/lib/assets/project-media'
import { parseProjectHeroMedia } from '@/lib/content/project-hero-media'

type ProjectHeroMediaProps = {
  media?: unknown
  fallbackImage?: string
  title: string
}

function withBasePath(source: string): string {
  return source.startsWith('/') ? `${process.env.BASE_PATH || ''}${source}` : source
}

export default function ProjectHeroMedia({ media, fallbackImage, title }: ProjectHeroMediaProps) {
  const parsedMediaValue = parseProjectHeroMedia(media)
  const parsedMedia = parsedMediaValue ? resolveProjectHeroMedia(parsedMediaValue) : undefined

  if (parsedMedia?.type === 'video') {
    return (
      <figure className="mb-8">
        <video
          aria-label={parsedMedia.label}
          className="h-auto w-full rounded-lg"
          controls
          height={parsedMedia.height}
          playsInline
          poster={withBasePath(parsedMedia.poster)}
          preload="metadata"
          width={parsedMedia.width}
        >
          {parsedMedia.sources.map((source) => (
            <source key={source.type} src={withBasePath(source.src)} type={source.type} />
          ))}
          Your browser does not support embedded videos.
        </video>
        {parsedMedia.caption && (
          <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {parsedMedia.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (parsedMedia?.type === 'image') {
    return (
      <div className="mb-8">
        <Image
          src={parsedMedia.src}
          alt={parsedMedia.alt}
          className="h-auto w-full rounded-lg"
          width={parsedMedia.width}
          height={parsedMedia.height}
          sizes="(min-width: 1280px) 896px, 100vw"
        />
      </div>
    )
  }

  if (!fallbackImage) return null

  return (
    <div className="mb-8">
      <Image
        src={fallbackImage}
        alt={title}
        className="h-auto w-full rounded-lg"
        width={1200}
        height={630}
        sizes="(min-width: 1280px) 896px, 100vw"
      />
    </div>
  )
}

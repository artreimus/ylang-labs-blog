import { render, screen } from '@testing-library/react'
import ProjectHeroMedia from '@/components/ProjectHeroMedia'

describe('ProjectHeroMedia', () => {
  it('renders poster-backed WebM and MP4 sources with user controls', () => {
    const { container } = render(
      <ProjectHeroMedia
        title="Example project"
        media={{
          type: 'video',
          label: 'Example product walkthrough',
          width: 1200,
          height: 630,
          poster: '/static/images/projects/example/demo-poster.webp',
          sources: [
            { src: '/static/images/projects/example/demo.webm', type: 'video/webm' },
            { src: '/static/images/projects/example/demo.mp4', type: 'video/mp4' },
          ],
          caption: 'A short product walkthrough.',
        }}
      />
    )

    const video = screen.getByLabelText('Example product walkthrough')
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('playsinline')
    expect(video).toHaveAttribute('poster', '/static/images/projects/example/demo-poster.webp')
    expect(container.querySelectorAll('source')).toHaveLength(2)
    expect(screen.getByText('A short product walkthrough.')).toBeInTheDocument()
  })

  it('keeps the legacy image as a migration fallback', () => {
    render(
      <ProjectHeroMedia
        title="Legacy project"
        fallbackImage="/static/images/projects/legacy/demo.gif"
      />
    )

    expect(screen.getByRole('img', { name: 'Legacy project' })).toBeInTheDocument()
  })

  it('prefixes local video sources for base-path deployments', () => {
    const previousBasePath = process.env.BASE_PATH
    const previousBlobOrigin = process.env.BLOB_PUBLIC_ORIGIN
    process.env.BASE_PATH = '/blog'
    process.env.BLOB_PUBLIC_ORIGIN = 'https://store123.public.blob.vercel-storage.com'

    try {
      const { container } = render(
        <ProjectHeroMedia
          title="Example project"
          media={{
            type: 'video',
            label: 'Example product walkthrough',
            width: 1200,
            height: 630,
            poster: '/static/images/projects/example/demo-poster.webp',
            sources: [
              { src: '/static/images/projects/example/demo.webm', type: 'video/webm' },
              {
                src: 'https://store123.public.blob.vercel-storage.com/public/projects/example/demo.mp4',
                type: 'video/mp4',
              },
            ],
          }}
        />
      )

      expect(screen.getByLabelText('Example product walkthrough')).toHaveAttribute(
        'poster',
        '/blog/static/images/projects/example/demo-poster.webp'
      )
      const sources = container.querySelectorAll('source')
      expect(sources[0]).toHaveAttribute('src', '/blog/static/images/projects/example/demo.webm')
      expect(sources[1]).toHaveAttribute(
        'src',
        'https://store123.public.blob.vercel-storage.com/public/projects/example/demo.mp4'
      )
    } finally {
      if (previousBasePath === undefined) delete process.env.BASE_PATH
      else process.env.BASE_PATH = previousBasePath
      if (previousBlobOrigin === undefined) delete process.env.BLOB_PUBLIC_ORIGIN
      else process.env.BLOB_PUBLIC_ORIGIN = previousBlobOrigin
    }
  })
})

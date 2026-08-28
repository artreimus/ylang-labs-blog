import { getBlogImage } from '@/lib/content/blog-images'

const post = {
  images: ['/static/images/blogs/example/blogHeader.png'],
  cardImage: '/static/images/blogs/example/cardImage.png',
}

describe('getBlogImage', () => {
  it('uses portrait card art for the home rail fallback', () => {
    expect(getBlogImage(post, 'home-rail')).toBe(post.cardImage)
  })

  it('uses wide art for grid, list, article, and social fallbacks', () => {
    expect(getBlogImage(post, 'grid-card')).toBe(post.images[0])
    expect(getBlogImage(post, 'list-row')).toBe(post.images[0])
    expect(getBlogImage(post, 'article-banner')).toBe(post.images[0])
    expect(getBlogImage(post, 'social')).toBe(post.images[0])
  })

  it('prefers an explicit surface role', () => {
    const withRoles = {
      ...post,
      imageRoles: { gridCard: '/static/images/blogs/example/grid.webp' as const },
    }

    expect(getBlogImage(withRoles, 'grid-card')).toBe(withRoles.imageRoles.gridCard)
  })

  it('supports the legacy single-string images shape', () => {
    expect(getBlogImage({ images: post.images[0] }, 'article-banner')).toBe(post.images[0])
  })
})

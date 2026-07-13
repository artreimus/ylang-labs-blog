import {
  resolveAuthorContentAssets,
  resolveBlogContentAssets,
  resolveCompanyContentAssets,
  resolveProjectContentAssets,
} from '@/lib/assets/content.server'

describe('server content asset resolution', () => {
  it('resolves every blog surface while retaining legacy image shapes', () => {
    const blog = resolveBlogContentAssets({
      images: ['/static/images/blogs/example/header.webp'],
      cardImage: '/static/images/blogs/example/card.webp',
      imageRoles: { social: '/static/images/blogs/example/social.webp' },
      structuredData: { image: '/static/images/blogs/example/header.webp' },
    })

    expect(blog).toMatchObject({
      images: ['/static/images/blogs/example/header.webp'],
      cardImage: '/static/images/blogs/example/card.webp',
      imageRoles: { social: '/static/images/blogs/example/social.webp' },
      structuredData: { image: '/static/images/blogs/example/social.webp' },
    })
  })

  it('resolves project hero sources, authors, and company media', () => {
    const project = resolveProjectContentAssets({
      image: '/static/images/projects/example/fallback.gif',
      heroMedia: {
        type: 'video',
        label: 'Demo',
        poster: '/static/images/projects/example/poster.webp',
        sources: [
          { src: '/static/images/projects/example/demo.webm', type: 'video/webm' },
          { src: '/static/images/projects/example/demo.mp4', type: 'video/mp4' },
        ],
        width: 1200,
        height: 675,
      },
    })

    expect(project.heroMedia).toMatchObject({
      poster: '/static/images/projects/example/poster.webp',
      sources: [
        { src: '/static/images/projects/example/demo.webm' },
        { src: '/static/images/projects/example/demo.mp4' },
      ],
    })
    expect(resolveAuthorContentAssets({ avatar: '/static/images/avatars/example.webp' })).toEqual({
      avatar: '/static/images/avatars/example.webp',
    })
    expect(resolveCompanyContentAssets({ logo: '/static/images/logo-light.svg' })).toEqual({
      logo: '/static/images/logo-light.svg',
    })
  })
})

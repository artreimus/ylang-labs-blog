import { render, screen } from '@testing-library/react'

import AssetHtmlImage from '@/components/mdx/AssetHtmlImage'
import { resolveAssetUrl } from '@/lib/assets/resolve-build'

jest.mock('@/lib/assets/resolve-build', () => ({
  resolveAssetUrl: jest.fn(
    () => 'https://store123.public.blob.vercel-storage.com/public/projects/example/screenshot.png'
  ),
}))

describe('AssetHtmlImage', () => {
  it('backs lowercase MDX img tags with manifest-aware asset resolution', () => {
    render(
      <AssetHtmlImage
        src="/static/images/projects/example/screenshot.png"
        alt="Project screenshot"
        width="800"
      />
    )

    expect(resolveAssetUrl).toHaveBeenCalledWith('/static/images/projects/example/screenshot.png')
    expect(screen.getByRole('img', { name: 'Project screenshot' })).toHaveAttribute(
      'src',
      'https://store123.public.blob.vercel-storage.com/public/projects/example/screenshot.png'
    )
  })
})

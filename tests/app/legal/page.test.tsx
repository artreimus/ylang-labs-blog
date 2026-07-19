import { render, screen } from '@testing-library/react'

import LegalPage from '@/app/legal/page'

describe('Legal page', () => {
  it('presents the publishing, advice, and licensing terms as scannable sections', () => {
    render(<LegalPage />)

    expect(screen.getByRole('heading', { level: 1, name: 'Legal notice' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Independent publishing' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Educational content' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Copyright and reuse' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /MIT License/i })).toHaveAttribute(
      'href',
      'https://github.com/artreimus/ylang-labs-blog/blob/main/LICENSE'
    )
    expect(screen.getByRole('link', { name: /contact Ylang Labs/i })).toHaveAttribute(
      'href',
      '/contact-us'
    )
  })
})

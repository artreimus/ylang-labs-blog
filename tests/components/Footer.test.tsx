import { render, screen } from '@testing-library/react'

import Footer from '@/components/Footer'

describe('Footer', () => {
  it('shows the site-wide personal publishing disclaimer and open-source license', () => {
    render(<Footer />)

    expect(
      screen.getByRole('complementary', { name: 'Personal publishing note' })
    ).toBeInTheDocument()
    expect(screen.getByText('Independent publishing.')).toBeInTheDocument()
    expect(screen.getByText(/views are the authors’ own/i)).toBeInTheDocument()
    expect(
      screen.getByText(/do not knowingly publish confidential or proprietary/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/content is educational, not professional advice/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'MIT License' })).toHaveAttribute(
      'href',
      'https://github.com/artreimus/ylang-labs-blog/blob/main/LICENSE'
    )
  })
})

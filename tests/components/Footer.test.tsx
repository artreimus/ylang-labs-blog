import { render, screen } from '@testing-library/react'

import Footer from '@/components/Footer'

describe('Footer', () => {
  it('shows the site-wide personal publishing disclaimer and open-source license', () => {
    render(<Footer />)

    expect(screen.getByRole('heading', { name: 'Personal publishing note' })).toBeInTheDocument()
    expect(screen.getByText(/authors’ personal views/i)).toBeInTheDocument()
    expect(
      screen.getByText(/do not knowingly include confidential, proprietary/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/educational purposes, not professional advice/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'MIT License' })).toHaveAttribute(
      'href',
      'https://github.com/artreimus/ylang-labs-blog/blob/main/LICENSE'
    )
  })
})

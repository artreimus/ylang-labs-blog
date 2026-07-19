import { render, screen, within } from '@testing-library/react'

import Footer from '@/components/Footer'

describe('Footer', () => {
  it('links to the legal page without rendering the full notice inline', () => {
    render(<Footer />)

    const exploreGroup = screen.getByText('Explore').closest('div')

    expect(exploreGroup).not.toBeNull()
    expect(
      within(exploreGroup as HTMLElement).getByRole('link', { name: 'Legal' })
    ).toHaveAttribute('href', '/legal')
    expect(screen.getAllByRole('link', { name: 'Legal' })).toHaveLength(1)
    expect(screen.queryByText('Independent publishing.')).not.toBeInTheDocument()
    expect(screen.queryByRole('complementary', { name: 'Personal publishing note' })).toBeNull()
  })
})

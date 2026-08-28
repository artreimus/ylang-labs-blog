import { render, screen } from '@testing-library/react'
import BlogPagination from '@/layouts/components/BlogPagination'

jest.mock('next/navigation', () => ({
  usePathname: () => '/blogs',
}))

describe('BlogPagination', () => {
  it('renders disabled pagination as non-focusable content', () => {
    render(<BlogPagination currentPage={1} totalPages={3} />)

    expect(screen.queryAllByRole('link', { name: 'Previous' })).toHaveLength(0)
    expect(screen.getAllByText('Previous')[0]).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('1', { selector: '[aria-current="page"]' })).toBeInTheDocument()
  })

  it('gives enabled pagination visible keyboard focus treatment', () => {
    render(<BlogPagination currentPage={2} totalPages={3} />)

    for (const link of screen.getAllByRole('link', { name: 'Previous' })) {
      expect(link).toHaveClass('focus-visible:ring-2')
      expect(link).toHaveAttribute('rel', 'prev')
    }

    for (const link of screen.getAllByRole('link', { name: 'Next' })) {
      expect(link).toHaveClass('focus-visible:ring-2')
      expect(link).toHaveAttribute('rel', 'next')
    }
  })
})

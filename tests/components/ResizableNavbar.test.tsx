import { fireEvent, render, screen } from '@testing-library/react'
import { NavItems } from '@/components/ui/resizable-navbar'

describe('NavItems', () => {
  it('shows the navigation highlight for keyboard focus', () => {
    render(
      <NavItems
        items={[
          { name: 'Blogs', link: '/blogs' },
          { name: 'Projects', link: '/projects' },
        ]}
      />
    )

    const blogsLink = screen.getByRole('link', { name: 'Blogs' })

    expect(blogsLink.querySelector('[data-nav-highlight="true"]')).not.toBeInTheDocument()

    fireEvent.focus(blogsLink)

    expect(blogsLink).toHaveClass('focus-visible:ring-2')
    expect(blogsLink.querySelector('[data-nav-highlight="true"]')).toBeInTheDocument()

    fireEvent.blur(blogsLink)

    expect(blogsLink.querySelector('[data-nav-highlight="true"]')).not.toBeInTheDocument()
  })

  it('clears only the focus-driven highlight on blur', () => {
    render(<NavItems items={[{ name: 'Blogs', link: '/blogs' }]} />)

    const blogsLink = screen.getByRole('link', { name: 'Blogs' })

    fireEvent.mouseEnter(blogsLink)
    fireEvent.focus(blogsLink)
    fireEvent.blur(blogsLink)

    expect(blogsLink.querySelector('[data-nav-highlight="true"]')).toBeInTheDocument()

    fireEvent.mouseLeave(blogsLink.closest('div') as HTMLElement)

    expect(blogsLink.querySelector('[data-nav-highlight="true"]')).not.toBeInTheDocument()
  })

  it('keeps focused items highlighted when the pointer leaves the navigation', () => {
    render(<NavItems items={[{ name: 'Blogs', link: '/blogs' }]} />)

    const blogsLink = screen.getByRole('link', { name: 'Blogs' })

    fireEvent.focus(blogsLink)
    fireEvent.mouseLeave(blogsLink.closest('div') as HTMLElement)

    expect(blogsLink.querySelector('[data-nav-highlight="true"]')).toBeInTheDocument()
    expect(blogsLink).toHaveAttribute('href', '/blogs')
  })
})

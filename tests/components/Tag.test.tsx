import { render, screen } from '@testing-library/react'

import Tag from '@/components/Tag'

describe('Tag', () => {
  it('links to the slugged tag route while preserving the visible label format', () => {
    render(<Tag text="AI/ML Systems" />)

    const link = screen.getByRole('link', { name: 'AI/ML-Systems' })
    expect(link).toHaveAttribute('href', '/tags/aiml-systems')
  })

  it('handles multi-word lowercase tags without dropping words', () => {
    render(<Tag text="generative ai" />)

    expect(screen.getByRole('link', { name: 'generative-ai' })).toHaveAttribute(
      'href',
      '/tags/generative-ai'
    )
  })
})

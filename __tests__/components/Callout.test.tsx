import { render, screen } from '@testing-library/react'

import Callout from '@/components/Callout'

describe('Callout', () => {
  it('renders a titled warning callout with realistic article content', () => {
    render(
      <Callout type="warning" title="Check the failure mode">
        Test the empty state before publishing the article.
      </Callout>
    )

    expect(screen.getByRole('heading', { name: 'Check the failure mode' })).toBeInTheDocument()
    expect(
      screen.getByText('Test the empty state before publishing the article.')
    ).toBeInTheDocument()
  })

  it('renders body-only callouts without requiring a title', () => {
    render(<Callout type="note">This note has no title.</Callout>)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('This note has no title.')).toBeInTheDocument()
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import ErrorPage from '@/app/error'

describe('route error boundary', () => {
  it('offers recovery without exposing the exception message', () => {
    const reset = jest.fn()
    jest.spyOn(console, 'error').mockImplementation(() => undefined)

    render(<ErrorPage error={new Error('private database detail')} reset={reset} />)

    expect(screen.queryByText('private database detail')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(reset).toHaveBeenCalledTimes(1)
  })
})

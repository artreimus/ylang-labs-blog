import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ContactFormView } from '@/app/contact-us/ContactForm'
import type { ContactActionState } from '@/app/contact-us/contact-state'

const mockSubmitContactForm = jest.fn()

jest.mock('@/app/contact-us/actions', () => ({
  submitContactForm: (...args: unknown[]) => mockSubmitContactForm(...args),
}))

jest.mock('@/components/PhoneInput', () => {
  const React = jest.requireActual<typeof import('react')>('react')
  const PhoneInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'> & { defaultCountry?: string }
  >(({ value = '', defaultCountry: _defaultCountry, ...props }, ref) => (
    <input ref={ref} value={value} {...props} />
  ))
  PhoneInput.displayName = 'MockPhoneInput'

  return {
    PhoneInput,
  }
})

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Ada' } })
  fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Lovelace' } })
  fireEvent.change(screen.getByLabelText('Email Address'), {
    target: { value: 'ada@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'I want to discuss an AI engineering project.' },
  })
}

function view(state: ContactActionState, isPending = false) {
  return <ContactFormView state={state} formAction={jest.fn()} isPending={isPending} />
}

describe('ContactForm', () => {
  beforeEach(() => {
    mockSubmitContactForm.mockReset()
  })

  it('preserves values and focuses the summary after an upstream failure', async () => {
    const errorState: ContactActionState = {
      status: 'error',
      message: 'We could not send your message. Please try again shortly.',
    }
    const { rerender } = render(view({ status: 'idle' }))
    fillRequiredFields()

    rerender(view(errorState))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('We could not send your message')
    expect(alert).toHaveFocus()
    expect(screen.getByLabelText('Email Address')).toHaveValue('ada@example.com')
    expect(screen.getByLabelText('Message')).toHaveValue(
      'I want to discuss an AI engineering project.'
    )
  })

  it('associates server field errors and focuses the first invalid field', async () => {
    const errorState: ContactActionState = {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors: { email: ['Please use a different email address'] },
    }
    const { rerender } = render(view({ status: 'idle' }))
    fillRequiredFields()

    rerender(view(errorState))

    const email = screen.getByLabelText('Email Address')
    await waitFor(() => expect(email).toHaveFocus())
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email.getAttribute('aria-describedby')).toContain('form-item-message')
    expect(screen.getByText('Please use a different email address')).toBeInTheDocument()
    expect(email).toHaveValue('ada@example.com')
  })

  it('clears values only after confirmed success', async () => {
    const successState: ContactActionState = {
      status: 'success',
      message: 'Thanks—your message has been sent.',
    }
    const { rerender } = render(view({ status: 'idle' }))
    fillRequiredFields()

    rerender(view(successState))

    const status = await screen.findByText('Thanks—your message has been sent.')
    expect(status).toHaveTextContent('Thanks—your message has been sent.')
    await waitFor(() => expect(screen.getByLabelText('Email Address')).toHaveValue(''))
    expect(status).toHaveFocus()
  })

  it('disables only the submit button while a valid submission is pending', () => {
    render(view({ status: 'idle' }, true))

    const button = screen.getByRole('button', { name: 'Sending your message…' })
    const form = button.closest('form')

    expect(button).toBeDisabled()
    expect(form).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByLabelText('First Name')).not.toBeDisabled()
    expect(screen.getByLabelText('Message')).not.toBeDisabled()
  })
})

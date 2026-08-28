jest.mock('@/app/env.mjs', () => ({
  env: {
    WEB3FORMS_ACCESS_KEY: 'ci-placeholder',
    WEB3FORMS_ENDPOINT: 'https://api.web3forms.com/submit',
  },
}))

import { submitContactFormWithDependencies } from '@/app/contact-us/actions'
import type { ContactTransport } from '@/lib/contact/web3forms'

function validFormData() {
  const formData = new FormData()
  formData.set('firstName', 'Ada')
  formData.set('lastName', 'Lovelace')
  formData.set('email', 'ada@example.com')
  formData.set('phone', '+14155552671')
  formData.set('inquiries', 'technical')
  formData.set('message', 'I want to discuss an AI engineering project.')
  return formData
}

function transportReturning(success: boolean): ContactTransport {
  return { submit: jest.fn().mockResolvedValue({ success }) }
}

describe('submitContactFormWithDependencies', () => {
  it('validates on the server and does not call the transport for invalid input', async () => {
    const transport = transportReturning(true)
    const formData = validFormData()
    formData.set('email', 'not-an-email')

    const state = await submitContactFormWithDependencies(
      { transport },
      { status: 'idle' },
      formData
    )

    expect(state).toMatchObject({ status: 'error', fieldErrors: { email: expect.any(Array) } })
    expect(transport.submit).not.toHaveBeenCalled()
  })

  it('rejects honeypot submissions before transport', async () => {
    const transport = transportReturning(true)
    const formData = validFormData()
    formData.set('company', 'Spam Incorporated')

    const state = await submitContactFormWithDependencies(
      { transport },
      { status: 'idle' },
      formData
    )

    expect(state.status).toBe('error')
    expect(transport.submit).not.toHaveBeenCalled()
  })

  it('returns success only after the transport confirms delivery', async () => {
    const transport = transportReturning(true)

    const state = await submitContactFormWithDependencies(
      { transport },
      { status: 'idle' },
      validFormData()
    )

    expect(state).toEqual({ status: 'success', message: 'Thanks—your message has been sent.' })
    expect(transport.submit).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'ada@example.com', inquiries: 'technical' })
    )
  })

  it('returns a generic recoverable error when the upstream transport fails', async () => {
    const transport: ContactTransport = {
      submit: jest.fn().mockRejectedValue(new Error('private upstream detail')),
    }
    jest.spyOn(console, 'error').mockImplementation(() => undefined)

    const state = await submitContactFormWithDependencies(
      { transport },
      { status: 'idle' },
      validFormData()
    )

    expect(state).toEqual({
      status: 'error',
      message: 'We could not send your message. Please try again shortly.',
    })
    expect(console.error).toHaveBeenCalledWith('Contact transport failed', { kind: 'upstream' })
  })

  it('classifies timeouts without logging contact details', async () => {
    const transport: ContactTransport = {
      submit: jest.fn().mockRejectedValue(new DOMException('provider detail', 'AbortError')),
    }
    jest.spyOn(console, 'error').mockImplementation(() => undefined)

    const state = await submitContactFormWithDependencies(
      { transport },
      { status: 'idle' },
      validFormData()
    )

    expect(state).toEqual({
      status: 'error',
      message: 'We could not send your message. Please try again shortly.',
    })
    expect(console.error).toHaveBeenCalledWith('Contact transport failed', { kind: 'timeout' })
  })
})

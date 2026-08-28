/** @jest-environment node */

import { createWeb3FormsTransport } from '@/lib/contact/web3forms'

const submission = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '+14155552671',
  inquiries: 'technical' as const,
  message: 'I want to discuss an AI engineering project.',
}

describe('Web3Forms transport', () => {
  const originalE2ETest = process.env.E2E_TEST
  const originalVercel = process.env.VERCEL

  afterEach(() => {
    if (originalE2ETest === undefined) delete process.env.E2E_TEST
    else process.env.E2E_TEST = originalE2ETest

    if (originalVercel === undefined) delete process.env.VERCEL
    else process.env.VERCEL = originalVercel
  })

  it('keeps the access key inside the server-side request body', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )
    const transport = createWeb3FormsTransport({
      accessKey: 'server-secret',
      endpoint: 'https://api.web3forms.com/submit',
      fetchImpl,
    })

    await expect(transport.submit(submission)).resolves.toEqual({ success: true })
    const [, request] = fetchImpl.mock.calls[0]
    expect(JSON.parse(request.body)).toMatchObject({
      access_key: 'server-secret',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    })
    expect(request.redirect).toBe('error')
  })

  it('rejects loopback endpoints outside explicit E2E mode', () => {
    expect(() =>
      createWeb3FormsTransport({
        accessKey: 'server-secret',
        endpoint: 'http://127.0.0.1:4100/contact',
      })
    ).toThrow('Loopback contact endpoints require local E2E_TEST=true')
  })

  it('permits loopback only for explicitly local E2E tests', () => {
    process.env.E2E_TEST = 'true'
    delete process.env.VERCEL

    expect(() =>
      createWeb3FormsTransport({
        accessKey: 'server-secret',
        endpoint: 'http://127.0.0.1:4100/contact',
      })
    ).not.toThrow()

    process.env.VERCEL = '1'
    expect(() =>
      createWeb3FormsTransport({
        accessKey: 'server-secret',
        endpoint: 'http://127.0.0.1:4100/contact',
      })
    ).toThrow('E2E_TEST must not be enabled on Vercel')
  })

  it('rejects arbitrary external endpoints in every environment', () => {
    expect(() =>
      createWeb3FormsTransport({
        accessKey: 'server-secret',
        endpoint: 'https://example.com/collect',
      })
    ).toThrow('Contact submissions must use the official Web3Forms endpoint')
  })

  it('turns upstream HTTP failures into a narrow failure result', async () => {
    const transport = createWeb3FormsTransport({
      accessKey: 'server-secret',
      endpoint: 'https://api.web3forms.com/submit',
      fetchImpl: jest.fn().mockResolvedValue(new Response(null, { status: 503 })),
    })

    await expect(transport.submit(submission)).resolves.toEqual({ success: false })
  })

  it('aborts a stalled upstream request at the configured timeout', async () => {
    const fetchImpl = jest.fn((_endpoint, request: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        request.signal?.addEventListener('abort', () => {
          reject(new DOMException('The request timed out', 'AbortError'))
        })
      })
    })
    const transport = createWeb3FormsTransport({
      accessKey: 'server-secret',
      endpoint: 'https://api.web3forms.com/submit',
      fetchImpl,
      timeoutMs: 5,
    })

    await expect(transport.submit(submission)).rejects.toMatchObject({ name: 'AbortError' })
  })
})

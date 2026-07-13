import type { z } from 'zod'
import type { ContactUsFormSchema } from '@/app/validators/formschema'

export type ContactSubmission = z.infer<typeof ContactUsFormSchema>

export type ContactTransportResult = {
  success: boolean
  message?: string
}

export interface ContactTransport {
  submit(submission: ContactSubmission): Promise<ContactTransportResult>
}

type Web3FormsTransportOptions = {
  accessKey: string
  endpoint: string
  fetchImpl?: typeof fetch
  timeoutMs?: number
}

function assertEndpointIsAllowed(endpoint: string) {
  const url = new URL(endpoint)
  const isLoopback = ['127.0.0.1', 'localhost', '[::1]', '::1'].includes(url.hostname)
  const isOfficial = url.href === 'https://api.web3forms.com/submit'
  const isLocalE2E = isLoopback && process.env.E2E_TEST === 'true' && !process.env.VERCEL

  if (process.env.VERCEL && process.env.E2E_TEST === 'true') {
    throw new Error('E2E_TEST must not be enabled on Vercel')
  }

  if (!isOfficial && !isLocalE2E) {
    throw new Error(
      isLoopback
        ? 'Loopback contact endpoints require local E2E_TEST=true'
        : 'Contact submissions must use the official Web3Forms endpoint'
    )
  }
}

export function createWeb3FormsTransport({
  accessKey,
  endpoint,
  fetchImpl,
  timeoutMs = 8_000,
}: Web3FormsTransportOptions): ContactTransport {
  assertEndpointIsAllowed(endpoint)
  const request = fetchImpl ?? fetch

  return {
    async submit(submission) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), timeoutMs)

      try {
        const response = await request(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...submission,
            name: `${submission.firstName} ${submission.lastName}`,
            access_key: accessKey,
          }),
          cache: 'no-store',
          redirect: 'error',
          signal: controller.signal,
        })

        if (!response.ok) return { success: false }

        const body = (await response.json()) as ContactTransportResult
        return body.success ? { success: true } : { success: false, message: body.message }
      } finally {
        clearTimeout(timeout)
      }
    },
  }
}

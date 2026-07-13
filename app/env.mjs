import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const officialWeb3FormsEndpoint = 'https://api.web3forms.com/submit'

function isAllowedWeb3FormsEndpoint(value) {
  const url = new URL(value)
  const isOfficial = url.href === officialWeb3FormsEndpoint
  const isLoopback = ['127.0.0.1', 'localhost', '[::1]', '::1'].includes(url.hostname)
  const isLocalE2E = process.env.E2E_TEST === 'true' && !process.env.VERCEL

  return isOfficial || (isLoopback && isLocalE2E)
}

export const env = createEnv({
  client: {},
  server: {
    WEB3FORMS_ACCESS_KEY: z.string().min(1),
    WEB3FORMS_ENDPOINT: z
      .string()
      .url()
      .default(officialWeb3FormsEndpoint)
      .refine(isAllowedWeb3FormsEndpoint, 'Contact endpoint is not allowed in this environment'),
    E2E_TEST: z
      .enum(['true', 'false'])
      .optional()
      .refine(
        (value) => !(value === 'true' && process.env.VERCEL),
        'E2E_TEST must not be enabled on Vercel'
      ),
  },
  runtimeEnv: {
    WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY,
    WEB3FORMS_ENDPOINT: process.env.WEB3FORMS_ENDPOINT,
    E2E_TEST: process.env.E2E_TEST,
  },
})

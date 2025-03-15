import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_YLANG_API_URL: z.string().min(1),
    NEXT_PUBLIC_YLANG_API_KEY: z.string().optional(),
    NEXT_PUBLIC_YLANG_API_AUTH: z.string().optional(),
  },
  server: {},
  runtimeEnv: {
    NEXT_PUBLIC_YLANG_API_URL: process.env.NEXT_PUBLIC_YLANG_API_URL,
    NEXT_PUBLIC_YLANG_API_KEY: process.env.NEXT_PUBLIC_YLANG_API_KEY,
    NEXT_PUBLIC_YLANG_API_AUTH: process.env.NEXT_PUBLIC_YLANG_API_AUTH,
  },
})

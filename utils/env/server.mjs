import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_ENV: z.enum(['local', 'dev', 'production']).optional(),
    APP_URL: z.string().min(1),
    YLANG_API_URL: z.string().min(1),
    YLANG_API_KEY: z.string().optional(),
    YLANG_API_AUTH: z.string().optional(),
  },
  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    YLANG_API_URL: process.env.YLANG_API_URL,
    YLANG_API_KEY: process.env.YLANG_API_KEY,
    YLANG_API_AUTH: process.env.YLANG_API_AUTH,
  },
})

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY: z.string(),
  },
  server: {},
  runtimeEnv: {
    NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY,
  },
})

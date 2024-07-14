import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  debug: z.boolean(),
  port: z.coerce.number(),
  resend: z.object({
    apiKey: z.string(),
  }),
  redisUrl: z.string(),
  provider: z.object({
    email: z.string().email(),
  }),
})

export const env = envSchema.parse({
  debug: process.env.DEBUG === 'true',
  port: process.env.PORT ?? 3000,
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
  redisUrl: process.env.REDIS_URL,
  provider: {
    email: process.env.PROVIDER_EMAIL,
  },
})

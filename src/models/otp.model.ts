import { t } from 'elysia'

export const OtpDto = t.Object({
  otp: t.String(),
  reference: t.String(),
})

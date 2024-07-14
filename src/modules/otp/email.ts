import { Resend } from 'resend'

import { env } from '@/configs/env'
import { setRedisCacheValue } from '@/libs/redis'

import { randomOtpWithRef } from './utils'

const resend = new Resend(env.resend.apiKey)

export const emailHandler = async (email: string) => {
  const { otp, reference } = randomOtpWithRef()

  await setRedisCacheValue(reference, otp)

  await resend.emails.send({
    from: 'OTP Info <info@rotbean.com>',
    to: email,
    subject: 'OTP Info',
    html: `
      <div>
        <strong>OTP:</strong> ${otp} <br>
        <strong>Ref:</strong> ${reference}
      </div>
    `,
  })

  return {
    otp,
    reference,
  }
}

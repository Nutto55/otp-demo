import { Elysia, t } from 'elysia'

import { OtpDto } from '@/models/otp.model'
import { emailHandler } from '@/modules/otp/email'
import { validationHandler } from '@/modules/otp/validation'
import { BadRequestError } from '@/utils/error'

const app = new Elysia()
  .error({
    BadRequestError,
  })
  .get('/', () => 'OTP Demo')
  .post('/otp/email', ({ body }) => emailHandler(body.email), {
    body: t.Object({
      email: t.String(),
    }),
    response: OtpDto,
  })
  .onError(({ set, code, error }) => {
    switch (code) {
      case 'BadRequestError':
        set.status = 400
        return error
    }
  })
  .post(
    '/otp/validate',
    ({ body }) => validationHandler(body.reference, body.otp),
    {
      body: t.Object({
        reference: t.String(),
        otp: t.String(),
      }),
    },
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)

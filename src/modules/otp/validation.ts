import { deleteCacheValue, getRedisCacheValue } from '@/libs/redis'
import { BadRequestError } from '@/utils/error'

export const validationHandler = async (reference: string, otp: string) => {
  const matchedOtp = await getRedisCacheValue(reference)

  if (!matchedOtp) {
    throw new BadRequestError('Invalid OTP!')
  }

  if (otp !== matchedOtp) {
    throw new BadRequestError('Invalid OTP!')
  }

  await deleteCacheValue(reference)
  return { message: 'Matched!' }
}

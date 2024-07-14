export const randomOtpWithRef = () => {
  return {
    otp: Math.random().toString(6).substring(2, 6),
    reference: Math.random().toString(36).substring(2, 8),
  }
}

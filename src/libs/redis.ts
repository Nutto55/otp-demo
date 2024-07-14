import { createClient } from 'redis'

import { env } from '@/configs/env'

const client = createClient({
  url: env.redisUrl,
})

client.on('error', (err) => console.log('Redis Client Error', err))

export const connectRedis = async () => {
  await client.connect()
  console.info('Redis connected!')
}

await connectRedis()

export const setRedisCacheValue = async (
  key: string,
  value: string,
  expiredAt: number = 60 * 5,
) => {
  await client.set(key, value, { EX: expiredAt })
}

export const getRedisCacheValue = async (key: string) => {
  return await client.get(key)
}

export const deleteCacheValue = async (key: string) => {
  await client.del(key)
}

export default client

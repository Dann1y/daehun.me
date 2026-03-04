import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin-token'
const encoder = new TextEncoder()

async function getKey() {
  const secret = process.env.ADMIN_PASSWORD ?? ''
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export async function createToken(password: string): Promise<string> {
  const key = await getKey()
  const data = encoder.encode(password)
  const sig = await crypto.subtle.sign('HMAC', key, data)
  return Buffer.from(sig).toString('hex')
}

export async function verifyAuth(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false

  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false

  const expected = await createToken(adminPassword)
  return token === expected
}

export { COOKIE_NAME }

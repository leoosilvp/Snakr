import jwt from 'jsonwebtoken'

export function getUserId(req) {
  const cookie = req.headers.cookie
  if (!cookie) return null

  const token = cookie
    .split('; ')
    .find(c => c.startsWith('session='))
    ?.split('=')[1]

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.sub
  } catch {
    return null
  }
}

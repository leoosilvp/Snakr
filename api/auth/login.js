import jwt from 'jsonwebtoken'
import { supabase } from '../_lib/supabase.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { sub: data.user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.setHeader('Set-Cookie', `
    session=${token};
    HttpOnly;
    Secure;
    SameSite=Lax;
    Path=/;
    Max-Age=604800
  `)

  return res.status(200).json({
    success: true
  })
}

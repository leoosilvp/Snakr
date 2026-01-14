import jwt from 'jsonwebtoken'
import { supabase } from '../_lib/supabase.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('email, id')
    .eq('username', username)
    .single()

  if (userError || !user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
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

  res.setHeader(
    'Set-Cookie',
    `session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
  )

  return res.status(200).json({ success: true })
}

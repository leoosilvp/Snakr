import bcrypt from 'bcrypt'
import { supabase } from '../lib/supabaseClient.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' })
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const validPassword = await bcrypt.compare(password, user.password_hash)

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    bio: user.bio,
    games: user.games,
    created_at: user.created_at
  })
}

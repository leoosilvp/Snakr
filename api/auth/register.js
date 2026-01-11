import bcrypt from 'bcrypt'
import { supabase } from '../lib/supabaseClient.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const password_hash = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password_hash }])
    .select()
    .single()

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.status(201).json({
    id: data.id,
    name: data.name,
    email: data.email,
    created_at: data.created_at
  })
}

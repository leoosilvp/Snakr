import { supabase } from '../_lib/supabase.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, email, password } = req.body

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username
      }
    }
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  await supabase.from('users').insert({
    id: data.user.id,
    username,
    email
  })

  return res.status(201).json({ success: true })
}

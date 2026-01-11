import { supabase } from '../_lib/supabase.js'
import { getUserId } from '../_lib/auth.js'

export default async function handler(req, res) {
  const userId = getUserId(req)
  if (!userId) return res.status(401).end()

  const { data } = await supabase
    .from('users')
    .select('id, name, photo, bio, created_at')
    .eq('id', userId)
    .single()

  res.json(data)
}
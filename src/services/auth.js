export async function login(username, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Login failed')
  }

  return true
}


export async function getMe() {
  const res = await fetch('/api/auth/me', {
    credentials: 'include'
  })

  if (!res.ok) return null
  return res.json()
}

export async function logout() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  })
}

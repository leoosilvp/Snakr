export async function login(email, password) {
  await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
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
    credentials: 'include'
  })
}

export async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'API Error')
  }

  return data
}
const API_URL = 'https://backend-snakr.vercel.app'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.error || 'Request failed')
  }

  return res.json()
}

export const statusService = {
  updateStatus({ status, playing }) {
    return request('/api/user/status', {
      method: 'PATCH',
      body: JSON.stringify({ status, playing }),
    })
  },
}
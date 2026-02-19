const BASE_URL = 'https://backend-snakr.vercel.app/api'

async function request(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.error || 'Request failed')
  }

  return data
}

export const gamesService = {

  async sync(rawg_id) {
    return request(`${BASE_URL}/games?action=sync`, {
      method: 'POST',
      body: JSON.stringify({ rawg_id })
    })
  },

  async details(params) {
    const query = new URLSearchParams({
      action: 'details',
      ...params
    }).toString()

    return request(`${BASE_URL}/games?${query}`)
  },

  async list({ search = '', limit = 20 } = {}) {
    const query = new URLSearchParams({
      action: 'list',
      search,
      limit
    }).toString()

    return request(`${BASE_URL}/games?${query}`)
  },

  async userList() {
    return request(`${BASE_URL}/games?action=user`)
  },

  async updateUser(data) {
    return request(`${BASE_URL}/games?action=user`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

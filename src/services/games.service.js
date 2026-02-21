const BASE_URL = 'https://backend-snakr.vercel.app/api'

async function request(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })

  let data = null

  try {
    data = await res.json()
  } catch {
    throw new Error('Invalid server response')
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Request failed')
  }

  return data
}

function normalizeListParam(param) {
  if (!param) return null
  if (Array.isArray(param)) return param.join(',')
  if (typeof param === 'string') return param
  return null
}

export const gamesService = {

  async sync(rawg_id) {
    if (!rawg_id) throw new Error('rawg_id is required')

    return request(`${BASE_URL}/games?action=sync`, {
      method: 'POST',
      body: JSON.stringify({ rawg_id })
    })
  },

  async details(params = {}) {
    if (!params.id && !params.rawg_id)
      throw new Error('id or rawg_id required')

    const query = new URLSearchParams({
      action: 'details',
      ...params
    }).toString()

    return request(`${BASE_URL}/games?${query}`)
  },

  async list({
    search = '',
    genres,
    platforms,
    developers,
    publishers,
    year,
    minScore,
    page = 1
  } = {}) {

    const queryParams = {
      action: 'list',
      page
    }

    if (search) queryParams.search = search.trim()

    const normalizedGenres = normalizeListParam(genres)
    const normalizedPlatforms = normalizeListParam(platforms)
    const normalizedDevelopers = normalizeListParam(developers)
    const normalizedPublishers = normalizeListParam(publishers)

    if (normalizedGenres) queryParams.genres = normalizedGenres
    if (normalizedPlatforms) queryParams.platforms = normalizedPlatforms
    if (normalizedDevelopers) queryParams.developers = normalizedDevelopers
    if (normalizedPublishers) queryParams.publishers = normalizedPublishers

    if (year) queryParams.year = year
    if (minScore) queryParams.minScore = minScore

    const query = new URLSearchParams(queryParams).toString()

    return request(`${BASE_URL}/games?${query}`)
  },

  async userList() {
    return request(`${BASE_URL}/games?action=user`)
  },

  async updateUser({ game_id, status, rating }) {
    if (!game_id) throw new Error('game_id required')

    return request(`${BASE_URL}/games?action=user`, {
      method: 'POST',
      body: JSON.stringify({ game_id, status, rating })
    })
  }
}
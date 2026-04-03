const BASE_URL = 'https://backend-snakr.vercel.app/api'

const cache = new Map()
const CACHE_TTL = 1000 * 60 * 2 // 2 minutos

function getCacheKey(url) {
  return url
}

function getCached(key) {
  const entry = cache.get(key)

  if (!entry) return null

  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }

  return entry.data
}

function setCache(key, data) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL
  })
}

async function request(url, options = {}) {
  const method = options.method || 'GET'
  const useCache = method === 'GET' && !options.signal

  const key = getCacheKey(url)

  if (useCache) {
    const cached = getCached(key)
    if (cached) return cached
  }

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

  if (useCache) {
    setCache(key, data)
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

  async sync(igdb_id) {
    if (!igdb_id) throw new Error('igdb_id is required')

    return request(`${BASE_URL}/games?action=sync`, {
      method: 'POST',
      body: JSON.stringify({ igdb_id })
    })
  },

  async details(params = {}) {
    if (!params.id && !params.igdb_id)
      throw new Error('id or igdb_id required')

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

    const queryParams = { action: 'list', page }

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

  async userList({ userId, signal } = {}) {
    const queryParams = { action: 'user' }

    if (userId) queryParams.userId = userId

    const query = new URLSearchParams(queryParams).toString()

    return request(`${BASE_URL}/games?${query}`, { signal })
  },

  async updateUser({ game_id, status, rating, favorite }) {
    if (!game_id) throw new Error('game_id required')

    cache.clear()

    return request(`${BASE_URL}/games?action=user`, {
      method: 'POST',
      body: JSON.stringify({ game_id, status, rating, favorite })
    })
  },

  async removeUser(game_id) {
    if (!game_id) throw new Error('game_id required')

    cache.clear()

    return request(`${BASE_URL}/games?action=user`, {
      method: 'DELETE',
      body: JSON.stringify({ game_id })
    })
  },

  clearCache() {
    cache.clear()
  }
}
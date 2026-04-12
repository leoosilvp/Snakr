const BASE_URL = 'https://backend-snakr.vercel.app/api'

/* ─────────────────────────────────────────────
   CONFIG INTERNA (engine nova)
───────────────────────────────────────────── */

const DEFAULT_TIMEOUT = 12000
const CACHE_TTL = 1000 * 60 * 2
const MAX_RETRIES = 3

const _cache = new Map()
const _inflight = new Map()

/* ─────────────────────────────────────────────
   CACHE (comportamento igual ao antigo)
───────────────────────────────────────────── */

function getCacheKey(url) {
  return url
}

function getCached(key) {
  const entry = _cache.get(key)
  if (!entry) return null

  if (Date.now() > entry.expiresAt) {
    _cache.delete(key)
    return null
  }

  return entry.data
}

function setCache(key, data) {
  _cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL
  })
}

/* ─────────────────────────────────────────────
   HTTP CORE (robusto, mas invisível pro front)
───────────────────────────────────────────── */

async function http(url, options = {}) {
  const method = options.method || 'GET'
  const useCache = method === 'GET' && !options.signal

  const key = getCacheKey(url)

  if (useCache) {
    const cached = getCached(key)
    if (cached) return cached
  }

  if (useCache && _inflight.has(key)) {
    return _inflight.get(key)
  }

  const promise = _fetchWithRetry(url, options)

  if (useCache) {
    _inflight.set(key, promise)
    promise.finally(() => _inflight.delete(key))
  }

  const data = await promise

  if (useCache) {
    setCache(key, data)
  }

  return data
}

async function _fetchWithRetry(url, options) {
  let lastError

  for (let i = 0; i < MAX_RETRIES; i++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

    try {
      const res = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        ...options,
        signal: options.signal || controller.signal
      })

      clearTimeout(timeout)

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

    } catch (err) {
      clearTimeout(timeout)
      lastError = err

      const isLast = i === MAX_RETRIES - 1
      if (isLast) break

      await new Promise(r => setTimeout(r, 300 * (i + 1)))
    }
  }

  throw lastError
}

/* ─────────────────────────────────────────────
   HELPERS (iguais ao antigo)
───────────────────────────────────────────── */

function normalizeListParam(param) {
  if (!param) return null
  if (Array.isArray(param)) return param.join(',')
  if (typeof param === 'string') return param
  return null
}

/* ─────────────────────────────────────────────
   API (100% COMPATÍVEL)
───────────────────────────────────────────── */

export const gamesService = {

  async sync(igdb_id) {
    if (!igdb_id) throw new Error('igdb_id is required')

    return http(`${BASE_URL}/games?action=sync`, {
      method: 'POST',
      body: JSON.stringify({ igdb_id })
    })
  },

  async details(params = {}) {
    if (!params.id && !params.igdb_id) {
      throw new Error('id or igdb_id required')
    }

    const query = new URLSearchParams({
      action: 'details',
      ...params
    }).toString()

    return http(`${BASE_URL}/games?${query}`)
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

    const g = normalizeListParam(genres)
    const p = normalizeListParam(platforms)
    const d = normalizeListParam(developers)
    const pub = normalizeListParam(publishers)

    if (g) queryParams.genres = g
    if (p) queryParams.platforms = p
    if (d) queryParams.developers = d
    if (pub) queryParams.publishers = pub

    if (year) queryParams.year = year
    if (minScore) queryParams.minScore = minScore

    const query = new URLSearchParams(queryParams).toString()

    return http(`${BASE_URL}/games?${query}`)
  },

  async userList({ userId, signal } = {}) {
    const queryParams = { action: 'user' }

    if (userId) queryParams.userId = userId

    const query = new URLSearchParams(queryParams).toString()

    return http(`${BASE_URL}/games?${query}`, { signal })
  },

  async updateUser({ game_id, status, rating, favorite }) {
    if (!game_id) throw new Error('game_id required')

    _cache.clear() // comportamento antigo

    return http(`${BASE_URL}/games?action=user`, {
      method: 'POST',
      body: JSON.stringify({ game_id, status, rating, favorite })
    })
  },

  async removeUser(game_id) {
    if (!game_id) throw new Error('game_id required')

    _cache.clear()

    return http(`${BASE_URL}/games?action=user`, {
      method: 'DELETE',
      body: JSON.stringify({ game_id })
    })
  },

  async enrich(force = false) {
    _cache.clear()

    return http(`${BASE_URL}/games?action=enrich`, {
      method: 'POST',
      body: JSON.stringify({ force })
    })
  },

  clearCache() {
    _cache.clear()
  }
}
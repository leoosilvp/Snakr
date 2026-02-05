const API_URL = 'https://backend-snakr.vercel.app'

const FRIENDS_CACHE_TTL = 2 * 60 * 1000 // 1 min

let cachedFriends = null
let lastFetch = 0
let pendingFriendsPromise = null

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

export const socialService = {
  /* ================= USERS ================= */

  listUsers() {
    return request('/api/user/list', { method: 'GET' })
  },

  /* ================= FRIENDS ================= */

  async listFriends({ force = false } = {}) {
    const now = Date.now()

    if (
      !force &&
      cachedFriends &&
      now - lastFetch < FRIENDS_CACHE_TTL
    ) {
      return cachedFriends
    }

    if (pendingFriendsPromise) {
      return pendingFriendsPromise
    }

    pendingFriendsPromise = request('/api/friends', {
      method: 'GET',
    })
      .then((data) => {
        cachedFriends = data
        lastFetch = Date.now()
        pendingFriendsPromise = null
        return data
      })
      .catch((err) => {
        pendingFriendsPromise = null
        throw err
      })

    return pendingFriendsPromise
  },

  async sendFriendRequest(targetUserId) {
    const res = await request('/api/friends', {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
    })

    // invalida cache
    cachedFriends = null
    lastFetch = 0

    return res
  },

  async acceptFriendRequest(requestId) {
    const res = await request('/api/friends', {
      method: 'PATCH',
      body: JSON.stringify({ requestId }),
    })

    // invalida cache
    cachedFriends = null
    lastFetch = 0

    return res
  },

  invalidateFriendsCache() {
    cachedFriends = null
    lastFetch = 0
  },
}
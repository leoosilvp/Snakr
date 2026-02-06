const API_URL = 'https://backend-snakr.vercel.app'

const FRIENDS_CACHE_TTL = 2 * 60 * 1000 // 2 min

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

  listUsers() {
    return request('/api/user/list', { method: 'GET' })
  },

  async listFriends({ force = false, myUserId }) {
    const now = Date.now()

    if (!force && cachedFriends && now - lastFetch < FRIENDS_CACHE_TTL) {
      return cachedFriends
    }

    if (pendingFriendsPromise) return pendingFriendsPromise

    pendingFriendsPromise = request('/api/friends', { method: 'GET' })
      .then(data => {
        // Normaliza: sempre o outro usuário como "users"
        const normalized = data
          .map(f => {
            let user = null
            if (f.requester_id === myUserId) user = f.addressee
            else if (f.addressee_id === myUserId) user = f.requester
            else return null // ignora se não é nem requester nem addressee

            return { ...f, users: user } // adiciona "users" para o componente
          })
          .filter(Boolean)

        cachedFriends = normalized
        lastFetch = Date.now()
        pendingFriendsPromise = null
        return normalized
      })
      .catch(err => {
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

    this.invalidateFriendsCache()
    return res
  },

  async acceptFriendRequest(requestId) {
    const res = await request('/api/friends', {
      method: 'PATCH',
      body: JSON.stringify({ requestId }),
    })

    this.invalidateFriendsCache()
    return res
  },

  async removeFriend(friendId) {
    const res = await request('/api/friends', {
      method: 'DELETE',
      body: JSON.stringify({ friendId }),
    })

    this.invalidateFriendsCache()
    return res
  },

  invalidateFriendsCache() {
    cachedFriends = null
    lastFetch = 0
    pendingFriendsPromise = null
  },
}
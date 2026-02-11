import { resolveUserStatus } from '../utils/resolveUserStatus'

const API_URL = 'https://backend-snakr.vercel.app'

const FRIENDS_CACHE_TTL = 2 * 60 * 1000 // 2 minutos

let cachedFriends = null
let lastFetch = 0
let pendingFriendsPromise = null
let cachedUserId = null // evita servir cache de outro usuário

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

  if (res.status === 204) return null

  return res.json()
}

export const socialService = {
  listUsers() {
    return request('/api/user/list', { method: 'GET' })
  },

  getCachedFriends() {
    return cachedFriends
  },

  async listFriends({ force = false, myUserId }) {
    if (!myUserId) {
      throw new Error('myUserId is required')
    }

    const now = Date.now()

    if (
      !force &&
      cachedFriends &&
      cachedUserId === myUserId &&
      now - lastFetch < FRIENDS_CACHE_TTL
    ) {
      return cachedFriends
    }

    if (pendingFriendsPromise) {
      return pendingFriendsPromise
    }

    pendingFriendsPromise = request('/api/friends', { method: 'GET' })
      .then(data => {
        const normalized = data
          .map(f => {
            let user = null
            let direction = null

            if (f.requester_id === myUserId) {
              user = f.addressee
              direction = 'sent'
            } else if (f.addressee_id === myUserId) {
              user = f.requester
              direction = 'received'
            } else {
              return null
            }

            return {
              ...f,
              direction,
              status: f.status,
              user: {
                ...user,
                presence: resolveUserStatus(user),
              },
            }
          })
          .filter(Boolean)

        cachedFriends = normalized
        cachedUserId = myUserId
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

  async sendFriendRequest(friendCode = null, username = null) {
    if (!friendCode && !username) {
      throw new Error('Friend code or username is required')
    }

    const body = friendCode
      ? { friendCode: friendCode.replace(/^['"]|['"]$/g, '').trim() }
      : { username }

    const res = await request('/api/friends', {
      method: 'POST',
      body: JSON.stringify(body),
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
    cachedUserId = null
  },
}
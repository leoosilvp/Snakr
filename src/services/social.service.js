const API_URL = 'https://backend-snakr.vercel.app'

const FRIENDS_CACHE_TTL = 2 * 60 * 1000 // 2 minutos

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
  // Lista todos os usuários da plataforma
  listUsers() {
    return request('/api/user/list', { method: 'GET' })
  },

  // Lista amigos e convites
  async listFriends({ force = false, myUserId }) {
    const now = Date.now()
    if (!force && cachedFriends && now - lastFetch < FRIENDS_CACHE_TTL) return cachedFriends
    if (pendingFriendsPromise) return pendingFriendsPromise

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
            } else return null
            return {
              ...f,
              users: user,
              direction,
              status: f.status,
            }
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

  // ==================== ENVIAR PEDIDO DE AMIZADE PELO FRIEND_CODE ====================
  async sendFriendRequest(friendCode = null, username = null) {
    if (!friendCode && !username) throw new Error('Friend code or username is required')

    const body = friendCode
      ? { friendCode: friendCode.replace(/^["']|["']$/g, "").trim() }
      : { username }

    const res = await request('/api/friends', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    this.invalidateFriendsCache()
    return res
  },

  // Aceita um pedido de amizade
  async acceptFriendRequest(requestId) {
    const res = await request('/api/friends', {
      method: 'PATCH',
      body: JSON.stringify({ requestId }),
    })
    this.invalidateFriendsCache()
    return res
  },

  // Remove um amigo ou cancela um pedido de amizade
  async removeFriend(friendId) {
    const res = await request('/api/friends', {
      method: 'DELETE',
      body: JSON.stringify({ friendId }),
    })
    this.invalidateFriendsCache()
    return res
  },

  // Limpa cache de amigos
  invalidateFriendsCache() {
    cachedFriends = null
    lastFetch = 0
    pendingFriendsPromise = null
  },
}

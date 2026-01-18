import { useEffect, useState, useCallback } from 'react'

let cachedUser = null
let lastFetch = 0
let pendingPromise = null
const CACHE_TTL = 1000 * 60 * 5

export function useUser() {
  const [user, setUserState] = useState(cachedUser)
  const [loading, setLoading] = useState(!cachedUser)
  const [error, setError] = useState(null)

  const setUser = (newUser) => {
    cachedUser = newUser
    lastFetch = Date.now()
    setUserState(newUser)
  }

  const fetchUser = useCallback(async () => {
    if (cachedUser && Date.now() - lastFetch < CACHE_TTL) {
      setUserState(cachedUser)
      setLoading(false)
      return
    }

    if (pendingPromise) {
      setLoading(true)
      const data = await pendingPromise
      setUserState(data)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    pendingPromise = fetch('https://backend-snakr.vercel.app/api/auth/me', {
      method: 'GET',
      credentials: 'include'
    })
      .then(async res => {
        if (!res.ok) {
          if (res.status === 401) {
            cachedUser = null
            lastFetch = 0
            return null
          }
          throw new Error('Failed to fetch user')
        }

        const data = await res.json()

        cachedUser = {
          id: data.id,
          steam_id: data.steam_id,
          username: data.username,
          email: data.email,
          profile: data.profile,
          settings: data.settings,
        }

        lastFetch = Date.now()
        return cachedUser
      })
      .finally(() => {
        pendingPromise = null
      })

    try {
      const data = await pendingPromise
      setUserState(data)
    } catch (err) {
      setError(err.message)
      setUserState(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const clearUserCache = () => {
    cachedUser = null
    lastFetch = 0
    setUserState(null)
  }

  return {
    user,
    setUser,
    loading,
    error,
    refreshUser: fetchUser,
    clearUserCache
  }
}

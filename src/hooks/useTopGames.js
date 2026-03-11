import { useEffect, useState, useRef, useCallback } from 'react'
import { gamesService } from '../services/games.service'

const cache = new Map()
const CACHE_TTL = 1000 * 60 * 25 // 25 min

function getCached(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null }
  return entry.data
}

function setCache(key, data) {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL })
}

const CACHE_KEY = 'top_games'

export function useTopGames(limit = 8) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const load = useCallback(async () => {
    const cached = getCached(CACHE_KEY)
    if (cached) {
      setGames(cached)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    let cancelled = false

    try {
      setLoading(true)
      setError(null)

      const data = await gamesService.list({ page: 1 })

      if (cancelled) return

      const sorted = (data?.results ?? [])
        .sort((a, b) => (parseFloat(a.rating) ?? 0) - (parseFloat(b.rating) ?? 0))
        .slice(0, limit)

      setCache(CACHE_KEY, sorted)
      setGames(sorted)

    } catch (err) {
      if (cancelled || err.name === 'AbortError') return
      setError(err?.message || 'Failed to load top games.')
      setGames([])
    } finally {
      if (!cancelled) setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    load()
    return () => {
      abortRef.current?.abort()
    }
  }, [load])

  return { games, loading, error }
}
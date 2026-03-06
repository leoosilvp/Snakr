import { useEffect, useState, useRef, useCallback } from 'react'
import { gamesService } from '../services/games.service'

const cache = new Map()
const CACHE_TTL = 1000 * 60 * 3 // 3 min

function getCacheKey(params) {
  return JSON.stringify(params)
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

export function useGames({
  page = 1,
  search = null,
  genres = null,
  developers = null,
  publishers = null
} = {}) {
  const [games, setGames] = useState([])
  const [pagination, setPagination] = useState(null)
  const [meta, setMeta] = useState({
    genres: [],
    developers: [],
    publishers: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const abortRef = useRef(null)

  const applyData = useCallback((data) => {
    setGames(Array.isArray(data?.results) ? data.results : [])
    setPagination(data?.pagination ?? null)
    setMeta({
      genres: data?.meta?.genres ?? [],
      developers: data?.meta?.developers ?? [],
      publishers: data?.meta?.publishers ?? []
    })
  }, [])

  useEffect(() => {
    const params = { page, search, genres, developers, publishers }
    const cacheKey = getCacheKey(params)

    const cached = getCached(cacheKey)
    if (cached) {
      applyData(cached)
      setLoading(false)
      setError(null)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const data = await gamesService.list(params, {
          signal: controller.signal
        })

        if (cancelled) return

        setCache(cacheKey, data)
        applyData(data)

      } catch (err) {
        if (cancelled || err.name === 'AbortError') return
        setError(err?.message || 'Failed to load games.')
        setGames([])
        setPagination(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [page, search, genres, developers, publishers, applyData])

  const invalidateCache = useCallback((params) => {
    if (params) {
      cache.delete(getCacheKey(params))
    } else {
      cache.clear()
    }
  }, [])

  return {
    games,
    pagination,
    meta,
    loading,
    error,
    invalidateCache
  }
}
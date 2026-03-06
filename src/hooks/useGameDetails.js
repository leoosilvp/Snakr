import { useEffect, useRef, useState } from 'react'
import { gamesService } from '../services/games.service'

const cache = new Map()
const inFlight = new Map()
const CACHE_TTL = 1000 * 60 * 5 // 5 min

function getCached(igdb_id) {
  const entry = cache.get(igdb_id)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    cache.delete(igdb_id)
    return null
  }
  return entry.data
}

function setCache(igdb_id, data) {
  cache.set(igdb_id, {
    data,
    expiresAt: Date.now() + CACHE_TTL
  })
}

export function useGameDetails(igdb_id) {
  const [game, setGame] = useState(() => getCached(igdb_id))
  const [loading, setLoading] = useState(() => !getCached(igdb_id))
  const [error, setError] = useState(null)

  const abortRef = useRef(null)

  useEffect(() => {
    if (!igdb_id) return

    if (getCached(igdb_id)) return

    if (inFlight.has(igdb_id)) {
      let mounted = true

      inFlight.get(igdb_id)
        .then((data) => {
          if (!mounted) return
          setGame(data)
          setLoading(false)
        })
        .catch((err) => {
          if (!mounted) return
          setError(err?.message || 'Failed to load game.')
          setLoading(false)
        })

      return () => { mounted = false }
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    let mounted = true

    const promise = gamesService
      .details({ igdb_id }, { signal: controller.signal })
      .then((data) => {
        setCache(igdb_id, data)
        return data
      })

    inFlight.set(igdb_id, promise)

    promise
      .then((data) => {
        if (!mounted) return
        setGame(data)
      })
      .catch((err) => {
        if (!mounted || err?.name === 'AbortError') return
        setError(err?.message || 'Failed to load game.')
        setGame(null)
      })
      .finally(() => {
        inFlight.delete(igdb_id)
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
      controller.abort()
    }
  }, [igdb_id])

  return { game, loading, error }
}
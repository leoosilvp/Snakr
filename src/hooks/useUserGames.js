import { useEffect, useState, useCallback } from 'react'
import { gamesService } from '../services/games.service'

export function useUserGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async (signal) => {
    try {
      setLoading(true)
      setError(null)

      const data = await gamesService.userList({ signal })
      setGames(Array.isArray(data) ? data : [])

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err?.message || 'Failed to load user games.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const updateGame = useCallback(async (payload) => {
    try {
      await gamesService.updateUser(payload)
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to update game.')
    }
  }, [refresh])

  useEffect(() => {
    const controller = new AbortController()
    refresh(controller.signal)

    return () => controller.abort()
  }, [refresh])

  return {
    games,
    loading,
    error,
    refresh,
    updateGame
  }
}
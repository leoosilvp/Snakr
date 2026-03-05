import { useEffect, useState, useCallback } from 'react'
import { gamesService } from '../services/games.service'

const STORAGE_KEY = 'snakr_user_games'

export function useUserGames() {

  const [games, setGames] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY)
      return cached ? JSON.parse(cached) : []
    } catch {
      return []
    }
  })

  const [loading, setLoading] = useState(games.length === 0)
  const [error, setError] = useState(null)

  function persist(data) {
    setGames(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await gamesService.userList()

      const safe = Array.isArray(data) ? data : []

      persist(safe)

    } catch (err) {
      setError(err?.message || 'Failed to load user games.')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateGame = useCallback(async ({ game_id, status, rating }) => {

    if (!game_id) return

    const optimistic = [...games]

    const existingIndex = optimistic.findIndex(g => g.game_id === game_id)

    if (existingIndex >= 0) {
      optimistic[existingIndex] = {
        ...optimistic[existingIndex],
        status,
        rating
      }
    } else {
      optimistic.push({
        game_id,
        status,
        rating
      })
    }

    persist(optimistic)

    try {

      await gamesService.updateUser({
        game_id,
        status,
        rating
      })

    } catch (err) {

      persist(games)

      setError(err?.message || 'Failed to update game.')

    }

  }, [games])

  useEffect(() => {

    if (games.length === 0) {
      refresh()
    }

  })

  return {
    games,
    loading,
    error,
    refresh,
    updateGame
  }
}
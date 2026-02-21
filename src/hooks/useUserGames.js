import { useEffect, useState } from 'react'
import { gamesService } from '../services/games.service'

export function useUserGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refresh() {
    try {
      setLoading(true)
      setError(null)

      const data = await gamesService.userList()
      setGames(data || [])

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateGame(payload) {
    await gamesService.updateUser(payload)
    await refresh()
  }

  useEffect(() => {
    refresh()
  }, [])

  return {
    games,
    loading,
    error,
    refresh,
    updateGame
  }
}
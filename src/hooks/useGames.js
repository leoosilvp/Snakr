import { useEffect, useState } from 'react'
import { gamesService } from '../services/games.service'

export function useGames({ search = '', limit = 20 } = {}) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function fetchGames() {
      try {
        setLoading(true)
        const data = await gamesService.list({ search, limit })
        if (mounted) setGames(data)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchGames()

    return () => {
      mounted = false
    }
  }, [search, limit])

  return { games, loading, error }
}

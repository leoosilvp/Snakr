import { useEffect, useState } from 'react'
import { gamesService } from '../services/games.service'

export function useGameDetails(igdb_id) {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!igdb_id) return

    let mounted = true

    async function load() {
      try {
        setLoading(true)
        setError(null)

        await gamesService.sync(igdb_id)

        const data = await gamesService.details({ igdb_id })

        if (mounted) setGame(data)

      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => { mounted = false }
  }, [igdb_id])

  return { game, loading, error }
}
import { useEffect, useState } from 'react'
import { gamesService } from '../services/games.service'

export function useGameDetails(rawg_id) {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!rawg_id) return

    let mounted = true

    async function load() {
      try {
        setLoading(true)
        setError(null)

        // garante que o jogo exista (admin only)
        await gamesService.sync(rawg_id)

        const data = await gamesService.details({ rawg_id })

        if (mounted) setGame(data)

      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => { mounted = false }
  }, [rawg_id])

  return { game, loading, error }
}
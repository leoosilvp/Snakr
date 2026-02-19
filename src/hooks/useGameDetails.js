import { useEffect, useState } from 'react'
import { gamesService } from '../services/games.service'

export function useGameDetails(rawg_id) {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!rawg_id) return

    let mounted = true

    async function fetchDetails() {
      try {
        setLoading(true)

        // 1️⃣ garante que existe no banco
        await gamesService.sync(rawg_id)

        // 2️⃣ busca detalhes completos
        const data = await gamesService.details({ rawg_id })

        if (mounted) setGame(data)

      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchDetails()

    return () => {
      mounted = false
    }
  }, [rawg_id])

  return { game, loading, error }
}

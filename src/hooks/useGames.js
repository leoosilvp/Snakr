import { useEffect, useState } from 'react'
import { gamesService } from '../services/games.service'

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

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const data = await gamesService.list(
          {
            page,
            search,
            genres,
            developers,
            publishers
          },
          { signal: controller.signal }
        )

        setGames(Array.isArray(data?.results) ? data.results : [])
        setPagination(data?.pagination ?? null)

        setMeta({
          genres: data?.meta?.genres ?? [],
          developers: data?.meta?.developers ?? [],
          publishers: data?.meta?.publishers ?? []
        })

      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err?.message || 'Failed to load games.')
        }
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => {
      controller.abort()
    }
  }, [page, search, genres, developers, publishers])

  return {
    games,
    pagination,
    meta,
    loading,
    error
  }
}
import { useCallback, useEffect, useState } from 'react'

const API_URL = '/api/gifts'

export const useGifts = (options = {}) => {
  const {
    platform = null,
    sortBy = 'date'
  } = options

  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchGifts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (platform) params.append('platform', platform)
      if (sortBy) params.append('sortBy', sortBy)

      const res = await fetch(`${API_URL}?${params}`)
      if (!res.ok) throw new Error('Failed to load gifts')

      const data = await res.json()
      setGifts(data.gifts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [platform, sortBy])

  useEffect(() => {
    fetchGifts()
  }, [fetchGifts])

  return {
    gifts,
    loading,
    error
  }
}
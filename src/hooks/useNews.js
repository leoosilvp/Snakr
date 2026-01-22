import { useCallback, useEffect, useRef, useState } from 'react'

export function useNews(options = {}) {
  const {
    autoFetch = true,
    endpoint = 'https://backend-snakr.vercel.app/api/news'
  } = options

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const abortRef = useRef(null)

  const fetchNews = useCallback(async () => {
    abortRef.current?.abort()

    const controller = new AbortController()
    abortRef.current = controller

    try {
      setLoading(true)
      setError(null)

      const res = await fetch(endpoint, {
        signal: controller.signal
      })

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }

      const data = await res.json()
      setNews(data)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    if (!autoFetch) return

    fetchNews()

    return () => {
      abortRef.current?.abort()
    }
  }, [autoFetch, fetchNews])

  return {
    news,
    loading,
    error,
    refetch: fetchNews
  }
}
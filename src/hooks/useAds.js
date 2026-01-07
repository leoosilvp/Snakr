import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export function useAds() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchAds = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Erro ao carregar anúncio')
        }

        const data = await response.json()
        const adsData = data?.[0]?.ads ?? []

        if (isMounted) {
          setAds(adsData)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchAds()

    return () => {
      isMounted = false
    }
  }, [])

  return { ads, loading, error }
}

import { useEffect, useState } from 'react'

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(
          'https://backend-snakr.vercel.app/api/auth/me',
          {
            credentials: 'include'
          }
        )

        setIsAuthenticated(res.ok)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    loading,
    isAuthenticated
  }
}

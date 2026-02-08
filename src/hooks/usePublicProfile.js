import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

export function usePublicProfile() {
  const { username } = useParams()
  const abortRef = useRef(null)

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `https://backend-snakr.vercel.app/api/user/list?username=${encodeURIComponent(username)}`,
          { signal: controller.signal }
        )

        if (!res.ok) {
          if (res.status === 404) throw new Error('USER_NOT_FOUND')
          throw new Error('FAILED_TO_FETCH_PROFILE')
        }

        const data = await res.json()
        setProfile(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setProfile(null)
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
    return () => controller.abort()
  }, [username])

  return { profile, loading, error }
}

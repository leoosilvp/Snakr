import { useState } from 'react'

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const updateUser = async (path, value) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const res = await fetch('https://backend-snakr.vercel.app/api/user/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          updates: {
            [path]: value
          }
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Update failed')
      }

      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    updateUser,
    loading,
    error,
    success
  }
}
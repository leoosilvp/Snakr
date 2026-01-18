import { useCallback } from 'react'
import { useUser } from './useUser'

export function useUpdateUser() {
  const { user, refreshUser } = useUser()

  const updateUser = useCallback(async (path, value) => {
    if (!user) return

    const res = await fetch('https://backend-snakr.vercel.app/api/user/update', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, value })
    })

    if (!res.ok) {
      console.error('Failed to update user')
      return
    }

    await refreshUser()
  }, [user, refreshUser])

  return { updateUser }
}
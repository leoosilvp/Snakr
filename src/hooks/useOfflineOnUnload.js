import { useEffect } from 'react'

export function useOfflineOnUnload() {
  useEffect(() => {
    const handleUnload = () => {
      navigator.sendBeacon(
        'https://backend-snakr.vercel.app/api/user/status',
        JSON.stringify({
          status: { status: 'offline', playing: null },
        })
      )
    }

    window.addEventListener('beforeunload', handleUnload)
    return () =>
      window.removeEventListener('beforeunload', handleUnload)
  }, [])
}

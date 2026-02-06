import { useEffect } from 'react'

export function useOfflineOnUnload() {
  useEffect(() => {
    const sendOffline = () => {
      navigator.sendBeacon(
        'https://backend-snakr.vercel.app/api/user/status'
      )
    }

    window.addEventListener('pagehide', sendOffline)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendOffline()
      }
    })

    return () => {
      window.removeEventListener('pagehide', sendOffline)
    }
  }, [])
}
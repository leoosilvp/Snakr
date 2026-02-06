import { useEffect, useRef } from 'react'
import { statusService } from '../services/status.service'

export function useUserStatus({ isPlaying, gameName }) {
  const lastStatusRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function syncStatus() {
      const nextStatus = {
        status: isPlaying ? 'playing' : 'online',
        playing: isPlaying ? gameName : null,
      }

      if (
        JSON.stringify(lastStatusRef.current) ===
        JSON.stringify(nextStatus)
      ) {
        return
      }

      try {
        if (cancelled) return

        await statusService.updateStatus(nextStatus)
        lastStatusRef.current = nextStatus

      } catch (err) {
        console.error('[useUserStatus] failed to sync status', err)
      }
    }

    syncStatus()

    const interval = setInterval(syncStatus, 60_000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [isPlaying, gameName])
}

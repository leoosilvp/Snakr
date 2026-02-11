import { useEffect, useRef } from 'react'
import { statusService } from '../services/status.service'
import { useUser } from '../hooks/useUser'

export function useUserStatus({ isPlaying, gameName }) {
  const { user } = useUser()

  const lastIntentRef = useRef({
    status: null,
    playing: null,
  })

  useEffect(() => {
    if (!user) return

    let cancelled = false

    const buildIntent = () => ({
      status: isPlaying ? 'playing' : 'online',
      playing: isPlaying ? gameName : null,
    })

    const syncIntentIfChanged = async () => {
      const next = buildIntent()

      if (
        lastIntentRef.current.status === next.status &&
        lastIntentRef.current.playing === next.playing
      ) {
        return
      }

      try {
        if (cancelled) return
        await statusService.updateStatus(next)
        lastIntentRef.current = next
      } catch (err) {
        console.error('[STATUS UPDATE ERROR]', err)
      }
    }

    const heartbeat = async () => {
      try {
        if (cancelled) return

        const currentIntent = lastIntentRef.current

        if (!currentIntent.status) return

        // envia o mesmo estado apenas para atualizar last_seen
        await statusService.updateStatus(currentIntent)
      } catch (err) {
        console.error('[STATUS HEARTBEAT ERROR]', err)
      }
    }

    // sincroniza imediatamente se mudou intenção
    syncIntentIfChanged()

    // heartbeat a cada 25s
    const interval = setInterval(heartbeat, 25_000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [user, isPlaying, gameName])
}

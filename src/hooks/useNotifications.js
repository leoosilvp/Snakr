import { useEffect, useRef } from 'react'
import { notificationsService } from '../services/notifications.service'
import { useNotificationsStore } from '../stores/notifications.store'

export function useNotifications() {
  const store = useNotificationsStore()
  const bootstrapped = useRef(false)

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true

    notificationsService.bootstrap()
  }, [])

  return {
    notifications: store.notifications,
    unread: store.unread,
    activeNotification: store.activeNotification,
    markAsRead: (id) => notificationsService.markAsRead(id),
    markAllAsRead: () => notificationsService.markAllAsRead()
  }
}
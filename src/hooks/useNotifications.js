import { useEffect } from 'react'
import { notificationsService } from '../services/notifications.service'
import { useNotificationsStore } from '../stores/notifications.store'

export function useNotifications() {
  const store = useNotificationsStore()

  useEffect(() => {
    notificationsService.bootstrap()
  }, [])

  return {
    notifications: store.notifications,
    unread: store.unread,
    markAsRead: (id) => notificationsService.markAsRead(id),
    markAllAsRead: () => notificationsService.markAllAsRead()
  }
}
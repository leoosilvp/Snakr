import { api } from '../lib/api'
import { useNotificationsStore } from '../stores/notifications.store'

class NotificationsService {
  async bootstrap() {
    const store = useNotificationsStore.getState()

    const [listRes, unreadRes] = await Promise.all([
      api('https://backend-snakr.vercel.app/api/notifications'),
      api('https://backend-snakr.vercel.app/api/notifications?unread=true')
    ])

    store.setNotifications(listRes.data)
    store.setUnread(unreadRes.unread)

    const newestUnread = listRes.data.find((n) => !n.is_read)

    if (newestUnread) {
      store.setActiveNotification(newestUnread)
    }
  }

  async markAsRead(id) {
    await api(`https://backend-snakr.vercel.app/api/notifications?id=${id}`, {
      method: 'PATCH'
    })

    const store = useNotificationsStore.getState()

    store.setNotifications(
      store.notifications.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    )

    store.setUnread(Math.max(store.unread - 1, 0))
  }

  async markAllAsRead() {
    await api('https://backend-snakr.vercel.app/api/notifications?action=read-all', {
      method: 'PATCH'
    })

    const store = useNotificationsStore.getState()

    store.setNotifications(
      store.notifications.map((n) => ({
        ...n,
        is_read: true
      }))
    )

    store.setUnread(0)
  }

  async delete(id) {
    await api(`https://backend-snakr.vercel.app/api/notifications?id=${id}`, {
      method: 'DELETE'
    })

    const store = useNotificationsStore.getState()

    store.setNotifications(
      store.notifications.filter((n) => n.id !== id)
    )

    store.setUnread(
      Math.max(
        store.notifications.filter((n) => !n.is_read).length - 1,
        0
      )
    )
  }

  async clearAll() {
    await api('https://backend-snakr.vercel.app/api/notifications', {
      method: 'DELETE'
    })

    const store = useNotificationsStore.getState()

    store.setNotifications([])
    store.setUnread(0)
  }

  system(title, message, link) {
    this._emitLocal({
      type: 'system',
      title,
      message,
      link
    })
  }

  comment(author, postId) {
    this._emitLocal({
      type: 'comment',
      title: 'Novo comentário',
      message: `${author} comentou no seu post`,
      link: `/post/${postId}`
    })
  }

  follow(username) {
    this._emitLocal({
      type: 'follow',
      title: 'Novo seguidor',
      message: `${username} começou a te seguir`
    })
  }

  _emitLocal(payload) {
    const store = useNotificationsStore.getState()

    store.addNotification({
      id: crypto.randomUUID(),
      is_read: false,
      created_at: new Date().toISOString(),
      ...payload
    })
  }
}

export const notificationsService = new NotificationsService()
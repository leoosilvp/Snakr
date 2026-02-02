import { useEffect, useRef, useState, useCallback } from 'react'
import { useNotificationsStore } from '../stores/notifications.store'
import { notificationsService } from '../services/notifications.service'

let cachedNotifications = null
let cachedUnread = 0
let lastFetch = 0
let pendingPromise = null
const CACHE_TTL = 1000 * 60 * 5 // 5 min

export function useNotifications() {
  const store = useNotificationsStore()
  const bootstrapped = useRef(false)
  const [loading, setLoading] = useState(!cachedNotifications)
  const [error, setError] = useState(null)

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Retorna cache se ainda válido
      if (cachedNotifications && Date.now() - lastFetch < CACHE_TTL) {
        store.setNotifications(cachedNotifications)
        store.setUnread(cachedUnread)
        setLoading(false)
        return
      }

      // Aguarda promessa pendente se houver
      if (pendingPromise) {
        const data = await pendingPromise
        store.setNotifications(data)
        store.setUnread(data.filter(n => !n.is_read).length)
        setLoading(false)
        return
      }

      // Nova chamada ao backend
      pendingPromise = notificationsService.bootstrap().then(() => {
        const state = useNotificationsStore.getState()
        cachedNotifications = state.notifications
        cachedUnread = state.unread
        lastFetch = Date.now()
        return cachedNotifications
      }).finally(() => {
        pendingPromise = null
      })

      const data = await pendingPromise
      store.setNotifications(data)
      store.setUnread(data.filter(n => !n.is_read).length)
    } catch (err) {
      setError(err.message || 'Erro ao buscar notificações')
    } finally {
      setLoading(false)
    }
  }, [store])

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true

    // Evita setState síncrono dentro do useEffect
    const load = async () => {
      await fetchNotifications()
    }
    load()
  }, [fetchNotifications])

  const markAsRead = useCallback(
    (id) => notificationsService.markAsRead(id),
    []
  )

  const markAllAsRead = useCallback(
    () => notificationsService.markAllAsRead(),
    []
  )

  const refreshNotifications = useCallback(() => {
    lastFetch = 0
    return fetchNotifications()
  }, [fetchNotifications])

  return {
    notifications: store.notifications,
    unread: store.unread,
    activeNotification: store.activeNotification,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
    refreshNotifications
  }
}
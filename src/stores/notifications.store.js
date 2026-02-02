import { create } from 'zustand'

const COOLDOWN_MS = 20 * 60 * 1000
const STORAGE_KEY = 'snakr:last-notification-at'

const getLastAt = () => Number(localStorage.getItem(STORAGE_KEY) || 0)
const setLastAt = (v) => localStorage.setItem(STORAGE_KEY, String(v))

export const useNotificationsStore = create((set) => ({
  notifications: [],
  unread: 0,
  activeNotification: null,
  lastNotificationAt: getLastAt(),

  setNotifications: (notifications) =>
    set({ notifications }),

  setUnread: (unread) =>
    set({ unread }),

  addNotification: (notification) =>
    set((state) => {
      const now = Date.now()
      const canShow = now - state.lastNotificationAt >= COOLDOWN_MS

      if (canShow) setLastAt(now)

      return {
        notifications: [notification, ...state.notifications],
        unread: state.unread + 1,
        activeNotification: canShow
          ? notification
          : state.activeNotification,
        lastNotificationAt: canShow
          ? now
          : state.lastNotificationAt
      }
    }),

  setActiveNotification: (notification) => {
    const now = Date.now()
    const lastAt = getLastAt()

    if (now - lastAt < COOLDOWN_MS) return

    setLastAt(now)

    set({
      activeNotification: notification,
      lastNotificationAt: now
    })
  },

  clearActiveNotification: () =>
    set({ activeNotification: null })
}))
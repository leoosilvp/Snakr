import { create } from 'zustand'

export const useNotificationsStore = create((set) => ({
  notifications: [],
  unread: 0,
  activeNotification: null,

  setNotifications: (notifications) =>
    set({ notifications }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unread: state.unread + 1,
      activeNotification: notification
    })),

  setActiveNotification: (notification) =>
    set({ activeNotification: notification }),

  clearActiveNotification: () =>
    set({ activeNotification: null }),

  setUnread: (unread) =>
    set({ unread })
}))
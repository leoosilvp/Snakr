import { create } from 'zustand'

export const useNotificationsStore = create((set) => ({
  notifications: [],
  unread: 0,

  setNotifications: (notifications) =>
    set({ notifications }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unread: state.unread + 1
    })),

  setUnread: (unread) =>
    set({ unread })
}))
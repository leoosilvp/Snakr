import '../css/notifications-page.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useMemo, useCallback } from 'react'
import { useNotifications } from '../hooks/useNotifications'
import { notificationsService } from '../services/notifications.service'
import { useNavigate } from 'react-router-dom'

const COOLDOWN_TIME = 20 * 60 * 1000 // 20 min
const STORAGE_KEY = 'snakr:last-notification-action'

const Notifications = () => {
  const { notifications, unread, markAsRead, markAllAsRead } = useNotifications()
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  const formatNotificationDate = (dateString) => {
    const createdAt = new Date(dateString)
    const now = new Date()
    const diffMs = now - createdAt

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 24) {
      return `${diffHours <= 1 ? 1 : diffHours} hora${diffHours === 1 ? '' : 's'}`
    }

    if (diffDays === 1) {
      return '1 dia'
    }

    if (diffDays < 7) {
      return `${diffDays} dias`
    }

    return createdAt.toLocaleDateString('pt-BR')
  }

  const filteredNotifications = useMemo(() => {
    let list = [...notifications]

    if (filter === 'unread') {
      list = list.filter((n) => !n.is_read)
    }

    return list.sort((a, b) => {
      if (a.is_read !== b.is_read) {
        return a.is_read ? 1 : -1
      }
      return new Date(b.created_at) - new Date(a.created_at)
    })
  }, [notifications, filter])

  const canProcessNotification = useCallback((notificationId) => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return true

    const { lastId, timestamp } = JSON.parse(stored)
    const now = Date.now()

    if (lastId === notificationId && now - timestamp < COOLDOWN_TIME) {
      return false
    }

    return true
  }, [])

  const registerNotificationAction = useCallback((notificationId) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastId: notificationId, timestamp: Date.now() }))
  }, [])

  const handleNotificationClick = async (notification) => {
    if (!canProcessNotification(notification?.id)) return

    registerNotificationAction(notification?.id)

    if (!notification?.is_read) {
      await markAsRead(notification?.id)
    }

    if (notification.link) {
      navigate(notification?.link)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    await notificationsService.delete(id)
  }

  const handleClearAll = async () => {
    await notificationsService.clearAll()
  }

  return (
    <main className="notifications-main">
      <Header />
      <section className="notifications-content">
        <header className="notifications-content-header">
          <section className="notifications-content-header-left">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>Unread <span>{unread}</span></button>
          </section>
          <section className="notifications-content-header-right">
            <button onClick={markAllAsRead}>Mark all as read</button>
            <button onClick={handleClearAll}>Clear all</button>
          </section>
        </header>

        <section className="notifications-grid">
          {filteredNotifications.length === 0 && (
            <div className='no-notifications'>
            <i className='fa-regular fa-bell-slash'/>
            <p className="notifications-empty">
              {filter === 'unread' ? 'Nenhuma notificação não lida.' : 'Nenhuma notificação disponível.'}
            </p>
            </div>
          )}

          {filteredNotifications.map((notification) => (
            <article key={notification?.id} className={`notification ${notification?.is_read ? 'read' : ''}`} onClick={() => handleNotificationClick(notification)}>
              <section className="notification-left">
                <div className="notification-indicator" />
                <section className="notification-left-content">
                  <section className="notification-left-icon">
                    <i className={`${notification?.is_read ? 'fa-regular fa-bell-slash' : notification?.badge}`} />
                  </section>
                  <section className="notification-text">
                    <h1>{notification?.title}</h1>
                    <h2>{notification?.message}</h2>
                    <p><i className="fa-regular fa-clock" />{formatNotificationDate(notification?.created_at)}</p>
                  </section>
                </section>
              </section>
              <section className="notification-right">
                <button onClick={(e) => handleDelete(notification.id, e)}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </section>
            </article>
          ))}
        </section>
      </section>
      <Footer />
    </main>
  )
}

export default Notifications
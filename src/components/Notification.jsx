import { Link } from 'react-router-dom'
import '../css/notification.css'
import logo from '../assets/svg/logo.svg'
import { useEffect, useState } from 'react'
import { useNotificationsStore } from '../stores/notifications.store'

const Notification = () => {
  const notification = useNotificationsStore((s) => s.activeNotification)
  const clear = useNotificationsStore((s) => s.clearActiveNotification)

  const [uiState, setUiState] = useState('idle')

  useEffect(() => {
    if (!notification) {
      return
    }

    const openTimer = setTimeout(() => {
      setUiState('active')
    }, 650)

    const closeTimer = setTimeout(() => {
      setUiState('closed')
    }, 5000)

    const clearTimer = setTimeout(() => {
      clear()
      setUiState('')
    }, 5000)

    return () => {
      clearTimeout(openTimer)
      clearTimeout(closeTimer)
      clearTimeout(clearTimer)
    }
  }, [notification, clear])

  if (!notification || uiState === '') return null

  return (
    <Link
      to={notification.link || '/notifications'}
      className={`card-notification-ctn ${uiState}`}
    >
      <section className={`card-notification ${uiState}`}>
        <div className={uiState} />

        <section className="card-notification-logo">
          <img src={logo} />
        </section>

        <section className={`card-notification-content ${uiState}`}>
          <h1>{notification.title}</h1>
          <p>{notification.message}</p>
        </section>
      </section>

      <article className={`card-notification-info ${uiState}`}>
        <img src={logo} />
        <p>Now</p>
      </article>
    </Link>
  )
}

export default Notification
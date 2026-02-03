import { useEffect } from 'react'
import { useNotifications } from '../hooks/useNotifications'
import { useUser } from './useUser'
import { useLocation } from 'react-router-dom'


const ChangeTitle = () => {

  const { unread } = useNotifications()
  const { user } = useUser()

  const location = useLocation()

  useEffect(() => {

    const path = location.pathname

    if (unread >= 10) {
      document.title = `(${unread}) Snakr`
      return
    }

    else if (path === '/profile' && user) {
      document.title = `Snakr - ${user?.profile?.username}`
      return
    }

    document.title = 'Snakr'
  }, [unread, user, location.pathname])

  return null
}

export default ChangeTitle
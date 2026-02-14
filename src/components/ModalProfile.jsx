import { forwardRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'
import { useUser } from '../hooks/useUser'
import { User, Home, Grid, Archive, Bookmark, Settings, LifeBuoy, BookOpen, LogOut, Layout, Users } from '@geist-ui/icons'

const ModalProfile = forwardRef(({ isOpen, onMouseEnter, onMouseLeave }, ref) => {

  const navigate = useNavigate()
  const { user } = useUser()

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      await logout()
      navigate('/login', { replace: true })
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  if (!isOpen) return null

  return (
    <article
      ref={ref}
      className="modal-profile"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to='/profile' className="modal-profile-info">
        <img src={user?.profile?.photo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
        <div>
          <h1>{user?.profile?.username || ''}</h1>
          <h2>{user?.email || '@email.com'}</h2>
        </div>
        {user.steam_id ? (<i className='fa-brands fa-steam-symbol'/>) : ''}
      </Link>

      <section className="modal-profile-btns">
        {user.steam_id ? '' : (<a href="/api/auth/steam"><i className="fa-brands fa-steam-symbol" />Conect Steam</a>)}
        <Link to="/profile"><User size={16} color='var(--gray-color)'/> Profile</Link>
        <Link to="/home"><Home size={16} color='var(--gray-color)'/> Home</Link>
        <Link to="/friends"><Users size={16} color='var(--gray-color)'/> Friends</Link>
        <Link to="/catalog"><Grid size={16} color='var(--gray-color)'/> Catalog</Link>
        <Link to="/library"><Archive size={16} color='var(--gray-color)'/>Library</Link>
        <Link to="/wish-list"><Bookmark size={16} color='var(--gray-color)'/>Wish list</Link>
        <hr />
        <Link to="/settings"><Settings size={16} color='var(--gray-color)'/>Settings</Link>
        <Link to="/settings/support"><LifeBuoy size={16} color='var(--gray-color)'/>Support</Link>
        <Link to="/docs"><BookOpen size={16} color='var(--gray-color)'/>Docs</Link>
        <hr />
        <Link to="/settings/general#appearance"><Layout size={16} color='var(--gray-color)'/>Appearence</Link>
        <hr />

        <a className="active" onClick={handleLogout}>
          <LogOut size={16} color='#ca5555'/>
          Sign Out
        </a>
      </section>
    </article>
  )
}
)

export default ModalProfile

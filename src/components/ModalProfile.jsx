import { forwardRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'
import { useUser } from '../hooks/useUser'

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
        {user.steam_id ? '' : (<a href="https://backend-snakr.vercel.app/api/auth/steam"><i className="fa-brands fa-steam-symbol" />Conect Steam</a>)}
        <Link to="/profile"><i className="fa-regular fa-user" />Profile</Link>
        <Link to="/home"><i className="fa-regular fa-home" />Home</Link>
        <Link to="/catalog"><i className="fa-solid fa-list" />Catalog</Link>
        <Link to="/library"><i className="fa-solid fa-grip" />Library</Link>
        <Link to="/wish-list"><i className="fa-regular fa-bookmark" />Wish list</Link>
        <hr />
        <Link to="/settings"><i className="fa-solid fa-gear" />Settings</Link>
        <Link to="/settings/support"><i className="fa-regular fa-life-ring" />Support</Link>
        <Link to="/docs"><i className="fa-solid fa-book-open" />Docs</Link>
        <hr />
        <Link to="/settings/general#appearance"><i className="fa-solid fa-paintbrush" />Appearence</Link>
        <hr />

        <a className="active" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket" />
          Sign Out
        </a>
      </section>
    </article>
  )
}
)

export default ModalProfile

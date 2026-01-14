import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const ModalProfile = forwardRef(
  ({ isOpen, onMouseEnter, onMouseLeave }, ref) => {
    if (!isOpen) return null

    return (
      <article
        ref={ref}
        className="modal-profile"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <section className="modal-profile-info">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" />
          <div>
            <h1>user5679</h1>
            <h2>usuario@gmail.com</h2>
          </div>
        </section>

        <section className="modal-profile-btns">
          <Link to="/profile">Profile</Link>
          <Link to="/home">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/library">Library</Link>
          <Link to="/wish-list">Wish list</Link>
          <hr />
          <Link to="/settings">Settings</Link>
          <Link to="/settings/support">Support</Link>
          <Link to="/docs">Docs</Link>
          <hr />
          <Link to="/settings/apparence">Apparence</Link>
          <hr />
          <Link className="active">Sign Out</Link>
        </section>
      </article>
    )
  }
)

export default ModalProfile

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
                    <Link to='/profile'><i className="fa-regular fa-user" />Profile</Link>
                    <Link to='/home'><i className="fa-regular fa-home" />Home</Link>
                    <Link to='/catalog'><i className="fa-solid fa-list" />Catalog</Link>
                    <Link to='/library'><i className="fa-solid fa-grip" />Library</Link>
                    <Link to='/wish-list'><i className="fa-regular fa-bookmark" />Wish list</Link>
                    <hr />
                    <Link to='/settings'><i className="fa-solid fa-gear" />Settings</Link>
                    <Link to='/settings/support'><i className="fa-regular fa-life-ring" />Support</Link>
                    <Link to='/docs'><i className="fa-solid fa-book-open" />Docs</Link>
                    <hr />
                    <Link to='/settings/apparence'><i className="fa-solid fa-paintbrush" />Apparence</Link>
                    <hr />
                    <Link className="active"><i className="fa-solid fa-arrow-right-from-bracket" />Sign Out</Link>
                </section>
            </article>
        )
    }
)

export default ModalProfile

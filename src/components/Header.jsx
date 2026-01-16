import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import logo from '../assets/svg/logo.svg'
import ModalProfile from './ModalProfile'

const routeNames = {
    '/home': 'Home',
    '/notifications': 'Notifications',
    '/catalog': 'Catalog',
    '/library': 'Library',
    '/settings': 'Settings',
    '/support': 'Support',
    '/profile': 'Profile',
}

const subRouteNames = {
    '/general': 'General',
    '/account': 'Account',
    '/notifications': 'Notifications',
    '/apparence': 'Apparence',
    '/security': 'Security',
    '/support': 'Support',
    '/accessibility': 'Accessibility',
    '/terms and privacy': 'Terms and privacy',
}

const Header = ({ sub }) => {
    const { user } = useUser()

    const location = useLocation()
    const currentRoute = routeNames[location.pathname] || ''
    const currentSubRoute = subRouteNames[location.pathname] || ''
    const [isScrolled, setIsScrolled] = useState(false)

    const [showProfileModal, setShowProfileModal] = useState(false)
    const [modalInteracted, setModalInteracted] = useState(false)

    const hoverTimeoutRef = useRef(null)
    const modalRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 64)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!showProfileModal) return

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowProfileModal(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showProfileModal])

    const handleAvatarMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setShowProfileModal(true)
            setModalInteracted(false)
        }, 650)
    }

    const handleAvatarMouseLeave = () => {
        clearTimeout(hoverTimeoutRef.current)
    }

    const handleModalMouseEnter = () => {
        setModalInteracted(true)
    }

    const handleModalMouseLeave = () => {
        if (modalInteracted) {
            setShowProfileModal(false)
        }
    }

    return (
        <header className={`header-main ${isScrolled ? 'header-main-scrolled' : ''}`}>
            <section className="header-content">
                <article className="header-content-left">
                    <Link to="/home">
                        <img src={logo} alt="logo Snakr" />
                    </Link>
                    <p>/</p>
                    <h2>{currentRoute}</h2>
                    {sub ? (<p>/</p>) : '' }
                    <h2>{currentSubRoute}</h2>
                </article>

                <article className="header-content-right">
                    <Link to="/notifications"><i className="fa-regular fa-bell" /></Link>
                    <Link to="/wish-list"><i className="fa-regular fa-bookmark" /></Link>

                    <div onMouseEnter={handleAvatarMouseEnter} onMouseLeave={handleAvatarMouseLeave}>
                        <Link to="/profile">
                            <img src={user?.photo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
                        </Link>
                    </div>
                </article>
            </section>

            <nav>
                <ul>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/catalog">Catalog</NavLink>
                    <NavLink to="/library">Library</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                    <NavLink to="/support">Support</NavLink>
                </ul>
            </nav>

            <ModalProfile ref={modalRef} isOpen={showProfileModal} onMouseEnter={handleModalMouseEnter} onMouseLeave={handleModalMouseLeave} />
        </header>
    )
}

export default Header

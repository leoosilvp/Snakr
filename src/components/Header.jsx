import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import logo from '../assets/svg/logo.svg'
import ModalProfile from './ModalProfile'

const routeNames = {
    '/home': 'Home',
    '/catalog': 'Catalog',
    '/library': 'Library',
    '/friends': 'Friends',
    '/profile': 'Profile',
    '/wish-list': 'Wish list',
    '/gifts': 'Gifts',
    '/news': 'News',
    '/settings': 'Settings',
    '/notifications': 'Notifications',
}

const subRouteNames = {
    '/settings/general': 'General',
    '/settings/account': 'Account',
    '/settings/notifications': 'Notifications',
    '/settings/security': 'Security',
    '/settings/steam': 'Steam',
    '/settings/support': 'Support',
    '/settings/terms%20and%20privacy': 'Terms and privacy',
}

const Header = () => {
    const { user } = useUser()

    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)

    const [showProfileModal, setShowProfileModal] = useState(false)
    const [modalInteracted, setModalInteracted] = useState(false)

    const hoverTimeoutRef = useRef(null)
    const modalRef = useRef(null)

    const breadcrumbs = location.pathname
        .split('/')
        .filter(Boolean)
        .map((_, index, arr) => {
            const path = '/' + arr.slice(0, index + 1).join('/')
            return {
                path,
                label: subRouteNames[path] || routeNames[path],
            }
        })
        .filter(b => b.label)

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
        }, 500)
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

                    {breadcrumbs.map((item) => (
                        <span key={item.path} className="breadcrumb">
                            <p>/</p>
                            <h2>{item.label}</h2>
                        </span>
                    ))}
                </article>

                <article className="header-content-right">
                    <Link to="/notifications"><i className="fa-regular fa-bell" /></Link>
                    <Link to="/wish-list"><i className="fa-regular fa-bookmark" /></Link>

                    <div onMouseEnter={handleAvatarMouseEnter} onMouseLeave={handleAvatarMouseLeave}>
                        <Link to="/profile" title={user?.profile?.username}>
                            <img src={user?.profile?.photo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
                        </Link>
                    </div>
                </article>
            </section>

            <nav>
                <ul>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/catalog">Catalog</NavLink>
                    <NavLink to="/library">Library</NavLink>
                    <NavLink to="/friends">Friends</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/wish-list">Wish-list</NavLink>
                    <NavLink to="/gifts">Gifts</NavLink>
                    <NavLink to="/news">News</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </ul>
            </nav>

            <ModalProfile ref={modalRef} isOpen={showProfileModal} onMouseEnter={handleModalMouseEnter} onMouseLeave={handleModalMouseLeave} />
        </header>
    )
}

export default Header

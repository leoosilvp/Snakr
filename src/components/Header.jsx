import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/svg/logo.svg'

const routeNames = {
    '/home': 'Home',
    '/catalog': 'Catalog',
    '/library': 'Library',
    '/settings': 'Settings',
    '/support': 'Support',
    '/profile': 'Profile',

    '/Home': 'Home',
    '/Catalog': 'Catalog',
    '/Library': 'Library',
    '/Settings': 'Settings',
    '/Profile': 'Profile'
}

const Header = () => {

    const location = useLocation()
    const currentRoute = routeNames[location.pathname] || ''
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 64)
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`header-main ${isScrolled ? 'header-main-scrolled' : ''}`}>
            <section className='header-content'>
                <article className='header-content-left'>
                    <a href="">
                        <img src={logo} alt="logo Snakr" />
                    </a>
                    <p>/</p>
                    <h2>{currentRoute}</h2>
                </article>

                <article className='header-content-right'>
                    <Link to='/notifications' title='Notifications'><i className='fa-regular fa-bell' /></Link>
                    <Link to='/wish-list' title='Wish-list'><i className='fa-regular fa-bookmark' /></Link>
                    <Link to='/profile' title='Profile'><img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" /></Link>
                </article>
            </section>

            <nav>
                <ul>
                    <NavLink to='/home' className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to='/catalog' className={({ isActive }) => isActive ? 'active' : ''}>Catalog</NavLink>
                    <NavLink to='/library' className={({ isActive }) => isActive ? 'active' : ''}>Library</NavLink>
                    <NavLink to='/profile' className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
                    <NavLink to='/settings' className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
                    <NavLink to='/support' className={({ isActive }) => isActive ? 'active' : ''}>Support</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header

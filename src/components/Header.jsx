import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/svg/logo.svg'

const routeNames = {
    '/home': 'Home',
    '/catalog': 'Catalog',
    '/library': 'Library',
    '/settings': 'Settings',
    '/support': 'Support',

    '/Home': 'Home',
    '/Catalog': 'Catalog',
    '/Library': 'Library',
    '/Settings': 'Settings',
    '/Support': 'Support'
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
                    <Link to='/notifications'><i className='fa-regular fa-bell' /></Link>
                    <Link to='/wish-list'><i className='fa-regular fa-bookmark' /></Link>
                    <Link to='https://github.com/leoosilvp'><i className='fa-regular fa-building' /></Link>
                </article>
            </section>

            <nav>
                <ul>
                    <NavLink to='/home' className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to='/catalog' className={({ isActive }) => isActive ? 'active' : ''}>Catalog</NavLink>
                    <NavLink to='/library' className={({ isActive }) => isActive ? 'active' : ''}>Library</NavLink>
                    <NavLink to='/settings' className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
                    <NavLink to='/support' className={({ isActive }) => isActive ? 'active' : ''}>Support</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header

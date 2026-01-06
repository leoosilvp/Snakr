import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/svg/icon.svg'

const routeNames = {
    '/home': 'Home',
    '/catalog': 'Catalog',
    '/library': 'Library',
    '/settings': 'Settings'
}

const Header = () => {

    const location = useLocation()
    const currentRoute = routeNames[location.pathname] || ''

    return (
        <header className="header-main">
            <section className='header-content'>
                <article className='header-content-left'>
                    <a href="">
                        <img src={logo} alt="logo Snakr" />
                    </a>
                    <p>/</p>
                    <Link>{currentRoute}</Link>
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
                </ul>
            </nav>
        </header>
    )
}

export default Header

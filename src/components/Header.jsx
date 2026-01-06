import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/svg/icon.svg'

const Header = () => {
    return (
        <header className="header-main">
            <section className='header-content'>
                <article className='header-content-left'>
                    <a href="">
                        <img src={logo} alt="logo Snakr" />
                    </a>
                    <p>/</p>
                    <Link>Home</Link>
                </article>

                <article className='header-content-right'>
                    <Link><i className='fa-regular fa-bell' /></Link>
                    <Link><i className='fa-regular fa-bookmark' /></Link>
                    <Link><i className='fa-regular fa-building' /></Link>
                </article>
            </section>

            <nav>
                <ul>
                    <NavLink to='/home' className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to='/catalog' className={({isActive}) => isActive ? 'active' : ''}>Catalog</NavLink>
                    <NavLink to='/library' className={({isActive}) => isActive ? 'active' : ''}>Library</NavLink>
                    <NavLink to='/settings' className={({isActive}) => isActive ? 'active' : ''}>Settings</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header

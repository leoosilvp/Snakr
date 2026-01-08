import { Link } from 'react-router-dom'
import logo from '../assets/svg/logo.svg'

const Footer = () => {
    return (
        <footer className="footer-main">
            <section className="footer-nav">
                <a href="">
                    <img src={logo} alt="logo Snakr" />
                </a>
                <ul>
                    <Link to='/home'>Home</Link>
                    <Link to='/docs'>Docs</Link>
                    <Link to='/settings'>Settings</Link>
                    <Link to='/docs/help'>Help</Link>
                    <Link to='/docs'>policy and privacy</Link>
                    <Link to='/docs'>Contribute</Link>
                </ul>
            </section>

            <Link to='/status' className='btn-system-status'>
                <div />
                <h1>System Status</h1>
            </Link>
        </footer>
    )
}

export default Footer

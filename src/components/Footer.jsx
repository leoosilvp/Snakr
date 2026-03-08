import { Link } from 'react-router-dom'
import logo from '../assets/svg/logo.svg'

const Footer = ({bg, ln}) => {
    return (
        <footer className="footer-main"
            style={{background: `${bg}`, borderTop: `${ln}`}}
        >
            <section className="footer-nav">
                <a href="">
                    <img src={logo} alt="logo Snakr" />
                </a>
                <ul>
                    <Link to='/home'>Home</Link>
                    <Link to='/docs'>Docs</Link>
                    <Link to='/settings'>Settings</Link>
                    <Link to='/settings/support'>Help</Link>
                    <Link to='/settings/terms and privacy'>policy and privacy</Link>
                    <Link to='/contribute'>Contribute</Link>
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

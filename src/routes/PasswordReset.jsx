import '../css/password-reset.css'
import logo from '../assets/svg/logo3.svg'
import { Link } from 'react-router-dom'

const PasswordReset = () => {
    return (
        <main className="password-reset-main">
            <header className='password-reset-main-header'>
                <Link to='/login'>
                    <img src={logo} alt="logo Snakr" />
                </Link>
                <section className='password-reset-main-header-btns'>
                    <Link to='/login'>Login</Link>
                    <Link to='/login?view=register' className='active'>Join now</Link>
                </section>
            </header>
            <section className='password-reset-main-content'>

            </section>
            <footer className='password-reset-main-footer'>
                <div>
                    <img src={logo} />
                    <p>&copy;</p>
                    <p>2026</p>
                </div>
                <ul>
                    <Link to='/settings/terms and privacy#user'>User Agreement</Link>
                    <Link to='/settings/terms and privacy#policy'>Privacy Policy</Link>
                    <Link to='/settings/security'>Securiry</Link>
                    <Link to='/settings/terms and privacy#cookie'>Cookie Policy</Link>
                    <Link to='/settings/support'>Support</Link>
                    <Link to='/settings/account'>Account</Link>
                </ul>
            </footer>
        </main>
    )
}

export default PasswordReset

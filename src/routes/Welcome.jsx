import '../css/welcome.css'
import icon from "../assets/svg/logo.svg"
import { Link } from 'react-router-dom'
import { Github, GitPullRequest, StopCircle, Terminal } from '@geist-ui/icons'

const Welcome = () => {
    return (
        <main className="welcome-main">
            <header className='welcome-main-header'>
                <Link to='/home'>
                    <img src={icon} />
                </Link>
                <nav>
                    <ul>
                        <Link to='/docs/introduction'>About Us</Link>
                        <Link to='/docs'>Docs</Link>
                        <Link to='/home'>Snakr</Link>
                        <Link to='/contribute' target='blanck'>Contribute</Link>
                        <Link to='https://github.com/leoosilvp/Snakr' target='blanck'>GitHub <GitPullRequest size={16} /></Link>
                    </ul>
                </nav>
                <section className='welcome-main-header-btn'>
                    <Link title='Snakr crypto (SNK)'><span>(SNK)</span><StopCircle size={25} /></Link>
                </section>
            </header>

            <section className='welcome-main-content'>
                <section className='welcome-hero'>
                    <h1>The definitive game launcher for all your gaming needs</h1>
                    <p>Snakr is a game launcher that allows you to download, play, track your stats and manage your games all in one place.</p>
                    <div className='welcome-hero-btns'>
                        <Link to='/home' className='active'><Terminal />Access Snakr</Link>
                        <Link to='https://github.com/leoosilvp/Snakr' ><Github />GitHub</Link>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default Welcome

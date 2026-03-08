import '../css/careers.css'
import logo from '../assets/svg/logo2.svg'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const Careers = () => {

    const { user } = useUser();
    const [isScrolled, setIsScrolled] = useState(false)

    const isLogged = Boolean(user)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 64)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <main className='careers-main'>

            <div className='careers-bg'>
                <div className='careers-grid'></div>
                <div className='careers-glow'></div>
                <div className='careers-noise'></div>
            </div>

            <header className={`careers-main-header ${isScrolled && 'scrolled'}`}>
                <div className='careers-main-header-content'>
                    <section className='careers-header-left'>
                        <img src={logo} />
                        <nav>
                            <Link to='/home'>Home</Link>
                            <Link to='/docs'>Docs</Link>
                            <Link to='/one'>ONE</Link>
                            <Link to='/contribute'>Contribute</Link>
                        </nav>
                    </section>
                    <section className='careers-header-right'>
                        <Link to='/welcome'>Welcome</Link>
                        {isLogged && (
                            <button onClick={() => window.location.href = '/profile'}>
                                <img src={user?.profile?.photo} />
                            </button>
                        )}
                    </section>
                </div>
            </header>

            <section className='careers-content-main'>
                <section className='careers-content-introduction'>
                    <h1>Join the Team<br />Building What Comes Next.</h1>
                    <Link to='#positions'>Open Positions</Link>
                </section>
            </section>
            <Footer bg='linear-gradient(0deg, #000, #00000000)' ln='none' />
        </main>
    )
}

export default Careers

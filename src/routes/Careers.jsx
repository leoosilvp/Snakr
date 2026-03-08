import '../css/careers.css'
import logo from '../assets/svg/logo2.svg'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser';
import { useEffect, useState } from 'react';

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
            <header className={`careers-main-header ${isScrolled && 'scrolled'}`}>
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
            </header>

            <section className='careers-content-main'>

            </section>
        </main>
    )
}

export default Careers

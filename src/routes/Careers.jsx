import '../css/careers.css'
import logo from '../assets/svg/logo2.svg'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser';

const Careers = () => {

    const { user } = useUser();

    const isLogged = Boolean(user)

    return (
        <main className='careers-main'>
            <header className='careers-main-header'>
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
                        <button onClick={() => window.location.href='/profile'}>
                            <img src={user?.profile?.photo} />
                        </button>
                    )}
                </section>
            </header>
        </main>
    )
}

export default Careers

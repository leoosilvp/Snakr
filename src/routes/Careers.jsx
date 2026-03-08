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
                        <Link>Home</Link>
                        <Link>Docs</Link>
                        <Link>ONE</Link>
                        <Link>Contribute</Link>
                    </nav>
                </section>
                <section className='careers-header-right'>
                    <button>Welcome</button>
                    {isLogged && (
                        <Link>
                            <img src={user?.profile?.photo} />
                        </Link>
                    )}
                </section>
            </header>
        </main>
    )
}

export default Careers

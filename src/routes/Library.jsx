import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/library.css'
import { Filter } from '@geist-ui/icons'
import { NavLink } from 'react-router-dom'

const Library = () => {
    return (
        <main className='library-main'>
            <Header />
            <section className='library-main-content'>
                <header className='library-main-header'>
                    <section className='library-main-header-content'>
                        <NavLink>All games</NavLink>
                        <NavLink to='recently-played'>Recently played</NavLink>
                        <NavLink to='favorites'>Favorites</NavLink>
                    </section>
                    <button onClick={() => window.location.href = '/wish-list'}>Wish list</button>
                    <button><Filter size={16} /></button>
                </header>
            </section>
            <Footer />
        </main>
    )
}

export default Library

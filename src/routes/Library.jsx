import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/library.css'
import { Filter } from '@geist-ui/icons'

const Library = () => {
    return (
        <main className='library-main'>
            <Header />
            <section className='library-main-content'>
                <header className='library-main-header'>
                    <section className='library-main-header-content'>
                        <h1>Library</h1>
                    </section>
                    <div className='hr' />
                    <button onClick={() => window.location.href='/wish-list'}>Wish list</button>
                    <button><Filter size={16} /></button>
                </header>
            </section>
            <Footer />
        </main>
    )
}

export default Library

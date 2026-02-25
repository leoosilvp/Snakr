import '../css/game.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ChevronRight } from '@geist-ui/icons'
import { Link } from 'react-router-dom'

const Game = () => {
  return (
    <main className="game-main">
        <Header />
        <section className="game-main-content">
            <header className='game-header-main'>
                <section className='game-header-breadcrumbs'>
                    <Link to='/catalog'>Catalog</Link>
                    <ChevronRight size={16} />
                    <Link to='/catalog?filter=action'>Action</Link>
                    <ChevronRight size={16} />
                    <Link to=''>Grand Theft Auto V</Link>
                </section>
                <section className='game-header-content'>
                    <h1>Grand Theft Auto V</h1>
                    <Link>Community</Link>
                </section>
            </header>
        </section>
        <Footer />
    </main>
  )
}

export default Game

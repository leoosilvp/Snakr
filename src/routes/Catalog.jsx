import '../css/catalog.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Search, Plus } from '@geist-ui/icons'

const Catalog = () => {
    return (
        <main className='catalog-main'>
            <Header noSearch />
            <section className='catalog-main-content'>
                <header className='catalog-main-header'>
                    <section className='catalog-main-header-content'>
                        <h1>Games</h1>
                        <div className='hr' />
                    </section>
                    <section className='catalog-main-header-input'>
                        <button>
                            <Search size={16} />
                        </button>
                        <input type="text" placeholder='search for games...' />
                    </section>
                </header>
                <section className='catalog-content'>
                    <section className='catalog-main-cards'>
                        <article className='catalog-card-game'>
                            <section className='catalog-card-game-content'>
                                <img src="https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg" />
                                <div>
                                    <h1>Grand Theft Auto V</h1>
                                    <div className='catalog-card-game-category'>
                                        <p>Ação</p>
                                        <p>Aventura</p>
                                    </div>
                                </div>
                            </section>
                            <button>
                                <Plus size={16}/>
                            </button>
                        </article>
                    </section>
                    <aside className='catalog-main-filter'>
                        <header className='catalog-main-filter-header'>
                            <article>
                                <div />
                                <h1>Genres</h1>
                            </article>
                            <p>0 available</p>
                        </header>
                        <section className='catalog-filters'>
                            <div>
                                <input id='1' type="checkbox" />
                                <label htmlFor="1">example</label>
                            </div>
                        </section>

                        <header className='catalog-main-filter-header'>
                            <article>
                                <div className='purple' />
                                <h1>Developers</h1>
                            </article>
                            <p>0 available</p>
                        </header>
                        <section className='catalog-filters'>
                            
                        </section>

                        <header className='catalog-main-filter-header'>
                            <article>
                                <div className='red' />
                                <h1>Distributors</h1>
                            </article>
                            <p>0 available</p>
                        </header>
                        <section className='catalog-filters'>
                            
                        </section>
                    </aside>
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default Catalog

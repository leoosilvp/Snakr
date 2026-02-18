import '../css/catalog.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Search } from '@geist-ui/icons'

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

                    </section>
                    <aside className='catalog-main-filter'>
                        <header className='catalog-main-filter-header'>
                            <article>
                                <div />
                                <h1>Genres</h1>
                            </article>
                            <p>10 available</p>
                        </header>
                        <section className='catalog-filters'>
                            <div>
                                <input id='Action' type="checkbox" />
                                <label htmlFor="Action">Action</label>
                            </div>
                            <div>
                                <input id='Casual' type="checkbox" />
                                <label htmlFor="Casual">Casual</label>
                            </div>
                            <div>
                                <input id='Race' type="checkbox" />
                                <label htmlFor="Race">Race</label>
                            </div>
                            <div>
                                <input id='Indie' type="checkbox" />
                                <label htmlFor="Indie">Indie</label>
                            </div>
                            <div>
                                <input id='RPG' type="checkbox" />
                                <label htmlFor="RPG">RPG</label>
                            </div>
                            <div>
                                <input id='Simulation' type="checkbox" />
                                <label htmlFor="Simulation">Simulation</label>
                            </div>
                            <div>
                                <input id='Violent' type="checkbox" />
                                <label htmlFor="Violent">Violent</label>
                            </div>
                            <div>
                                <input id='Sports' type="checkbox" />
                                <label htmlFor="Sports">Sports</label>
                            </div>
                            <div>
                                <input id='Strategy' type="checkbox" />
                                <label htmlFor="Strategy">Strategy</label>
                            </div>
                        </section>

                        <header className='catalog-main-filter-header'>
                            <article>
                                <div className='purple' />
                                <h1>Developers</h1>
                            </article>
                            <p>70.160 available</p>
                        </header>
                        <section className='catalog-filters'>

                        </section>

                        <header className='catalog-main-filter-header'>
                            <article>
                                <div className='red' />
                                <h1>Distributors</h1>
                            </article>
                            <p>63.008 available</p>
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

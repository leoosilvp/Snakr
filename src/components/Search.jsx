import { Search as IconSearch } from '@geist-ui/icons'

const Search = () => {
    return (
        <main className='search-main'>
            <section className='search-input'>
                <button>
                    <IconSearch size={18} />
                </button>
                <input type='text' placeholder='search for games...' maxLength={30} />
            </section>

            <section className='search-games'>
                <article className='search-games-card'>
                    <img src="https://upload.wikimedia.org/wikipedia/pt/6/64/Spider-Man_2_2023_capa.jpg" />
                    <section className='search-games-card-content'>
                        <h1>Spider-Man 2023</h1>
                        <section className='search-games-card-categories'>
                            <p>action</p>
                            <p>adventure</p>
                            <p>hero</p>
                        </section>
                    </section>
                </article>

                <div className='hr'/>
            </section>
        </main>
    )
}

export default Search

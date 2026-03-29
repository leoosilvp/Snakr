import { Award, Search } from "@geist-ui/icons"

const SearchForCollection = () => {
    return (
        <main className="search-for-collection-main">
            <section className="search-for-collection-content">
                <header className="search-for-collection-header">
                    <Search size={16} />
                    <input type="text" placeholder="search.." maxLength={55} />
                </header>
                <section className="search-for-collection-grid">
                    <article className="search-for-collection-card">
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg" />
                        <div className="search-for-collection-card-content">
                            <h1>The Witcher 3: Wild Hunt - Game of the Year Edition</h1>
                            <article className="game-achievements">
                                <section>
                                    <div>
                                        <Award size={16} />
                                        <p>0</p>
                                    </div>
                                    <div>
                                        <p>0%</p>
                                    </div>
                                </section>
                                <div className="progress-bar" />
                            </article>
                        </div>
                    </article>
                    <hr />
                </section>
            </section>
        </main>
    )
}

export default SearchForCollection

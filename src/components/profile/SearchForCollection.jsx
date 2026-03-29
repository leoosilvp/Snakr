import { Search } from "@geist-ui/icons"

const SearchForCollection = () => {
    return (
        <main className="search-for-collection-main">
            <section className="search-for-collection-content">
                <header className="search-for-collection-header">
                    <Search size={16} />
                    <input type="text" placeholder="search.." />
                </header>
                <section className="search-for-collection-grid">
                    <article className="search-for-collection-card">

                    </article>
                </section>
            </section>
        </main>
    )
}

export default SearchForCollection

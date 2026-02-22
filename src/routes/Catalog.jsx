import '../css/catalog.css'
import { useState, useMemo, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GameCardSkeleton from '../components/skeletons/GameCardSkeleton'
import { Search, Plus, ChevronLeft, ChevronRight, Check } from '@geist-ui/icons'
import { useGames } from '../hooks/useGames'
import { useUserGames } from '../hooks/useUserGames'

const Catalog = () => {

    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')

    const [selectedGenres, setSelectedGenres] = useState([])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPage(1)
            setSearch(searchInput.trim())
        }, 400)

        return () => clearTimeout(timeout)
    }, [searchInput])

    const { games, pagination, meta, loading } = useGames({
        page,
        search,
        genres: selectedGenres.length ? selectedGenres.join(',') : null,
    })
    const { games: userGames, updateGame } = useUserGames()

    const userGameIds = useMemo(() => {
        return new Set(userGames.map(g => g.game_id))
    }, [userGames])

    function handleAdd(gameId) {
        updateGame({
            game_id: gameId,
            status: 'wishlist'
        })
    }

    function nextPage() {
        if (pagination?.hasNext) setPage(prev => prev + 1)
    }

    function prevPage() {
        if (pagination?.hasPrevious) setPage(prev => prev - 1)
    }

    function toggleFilter(value, list, setter) {
        setter(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
        setPage(1)
    }

    return (
        <main className='catalog-main'>
            <Header noSearch />

            <section className='catalog-main-content'>

                <header className='catalog-main-header'>
                    <section className='catalog-main-header-content'>
                        <h1>Games</h1>
                        <div className='hr' />
                        <section className='catalog-main-header-change-page'>
                            <button
                                onClick={prevPage}
                                disabled={!pagination?.hasPrevious}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={!pagination?.hasNext}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </section>
                    </section>

                    <section className='catalog-main-header-input'>
                        <button type="button">
                            <Search size={16} />
                        </button>
                        <input
                            type="text"
                            placeholder='search for games...'
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                        />
                    </section>
                </header>

                <section className='catalog-content'>

                    <section className='catalog-main-cards'>

                        {loading && <GameCardSkeleton />}

                        {!loading && games.length === 0 && (
                            <p>No games found.</p>
                        )}

                        {!loading && games.map(game => {
                            const inLibrary = userGameIds.has(game.id)

                            return (
                                <article
                                    key={game.id}
                                    className={`catalog-card-game ${inLibrary ? 'game-in-lib' : ''}`}
                                >
                                    <section className='catalog-card-game-content'>
                                        <img
                                            src={game.background_image}
                                            alt={game.name}
                                            loading="lazy"
                                        />
                                        <div>
                                            <h1>{game.name}</h1>
                                            <div className='catalog-card-game-category'>
                                                {game.genres?.map(g => (
                                                    <p key={g.id}>{g.name}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    <button
                                        title='Add the library'
                                        onClick={() => handleAdd(game.id)}
                                        disabled={inLibrary}
                                    >
                                        {inLibrary
                                            ? <Check size={16} />
                                            : <Plus size={16} />
                                        }
                                    </button>
                                </article>
                            )
                        })}
                    </section>

                    <aside className='catalog-main-filter'>

                        <header className='catalog-main-filter-header'>
                            <article>
                                <div />
                                <h1>Genres</h1>
                            </article>
                            <p>{meta?.genres?.length || 0} available</p>
                        </header>

                        <section className='catalog-filters'>
                            {meta?.genres?.map(g => (
                                <div key={g.id}>
                                    <input
                                        id={`genre-${g.id}`}
                                        type="checkbox"
                                        checked={selectedGenres.includes(String(g.id))}
                                        onChange={() =>
                                            toggleFilter(String(g.id), selectedGenres, setSelectedGenres)
                                        }
                                    />
                                    <label htmlFor={`genre-${g.id}`}>
                                        {g.name}
                                    </label>
                                </div>
                            ))}
                        </section>

                    </aside>
                </section>

                {pagination && (
                    <section className='catalog-change-page'>
                        <h2>
                            {pagination.page - 1 > 0
                                ? pagination.page - 1
                                : '-'}
                        </h2>

                        <button
                            onClick={prevPage}
                            disabled={!pagination.hasPrevious}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <h1>{pagination.page}</h1>

                        <button
                            onClick={nextPage}
                            disabled={!pagination.hasNext}
                        >
                            <ChevronRight size={20} />
                        </button>

                        <h2>
                            {pagination.page + 1 <= pagination.totalPages
                                ? pagination.page + 1
                                : '-'}
                        </h2>
                    </section>
                )}

            </section>

            <Footer />
        </main>
    )
}

export default Catalog
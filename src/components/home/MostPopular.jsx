import { useState, useMemo } from 'react'
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, List, ShoppingCart, Check, Users } from "@geist-ui/icons"
import { useTopGames } from '../../hooks/useTopGames'
import { useUserGames } from '../../hooks/useUserGames'

const ITEMS_PER_PAGE = 2

const MostPopular = () => {
    const [page, setPage] = useState(0)

    const { games, loading } = useTopGames(8)
    const { games: userGames, updateGame } = useUserGames()

    const userGameIds = useMemo(() => {
        return new Set(userGames.map(g => g.game_id))
    }, [userGames])

    const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE)
    const visibleGames = games.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)

    function handleAdd(e, gameId) {
        e.preventDefault()
        e.stopPropagation()
        updateGame({ game_id: gameId, status: 'library' })
    }

    function prevPage() {
        setPage(prev => (prev > 0 ? prev - 1 : prev))
    }

    function nextPage() {
        setPage(prev => (prev < totalPages - 1 ? prev + 1 : prev))
    }

    return (
        <main className="most-popular">
            <header className="most-popular-header">
                <h1>Most popular</h1>
                <div />
            </header>

            <section className="most-popular-content">
                <button
                    className="home-next-btn l"
                    onClick={prevPage}
                    disabled={page === 0}
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="most-popular-grid">
                    {!loading && visibleGames.map(game => {
                        const inLibrary = userGameIds.has(game.id)

                        return (
                            <Link
                                to={`/game/${game.igdb_id}`}
                                key={game.id}
                                className={`card-game-main ${inLibrary ? 'game-in-lib' : ''}`}
                            >
                                <img
                                    src={game.cover_image}
                                    alt={game.name}
                                    loading="lazy"
                                />

                                <section className="card-game-main-content">
                                    <section>
                                        <h1>{game.name}</h1>
                                        <div>
                                            {game.genres?.map(g => (
                                                <h2 key={g.id}>{g.name}</h2>
                                            ))}
                                        </div>
                                        <p>{game.description?.length > 200 ? game.description.slice(0, 200) + '...' : game.description}</p>
                                    </section>

                                    <section className="card-game-main-footer">
                                        <div>
                                            <Users size={13} /> / {game.rating_count ?? 0}
                                        </div>
                                        <button
                                            onClick={(e) => handleAdd(e, game.id)}
                                            disabled={inLibrary}
                                        >
                                            {inLibrary
                                                ? <><Check size={15} />In library</>
                                                : <><ShoppingCart size={15} />Add the library</>
                                            }
                                        </button>
                                    </section>
                                </section>

                                {inLibrary && (
                                    <div
                                        className='most-popular-in-library'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            window.location.href = '/library'
                                        }}
                                    >
                                        <List size={16} />
                                        <p className='text'>In library</p>
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </div>

                <button
                    className="home-next-btn r"
                    onClick={nextPage}
                    disabled={page >= totalPages - 1}
                >
                    <ChevronRight size={20} />
                </button>
            </section>

            <div className="most-popular-dots">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <div
                        key={i}
                        className={i === page ? 'active' : ''}
                        onClick={() => setPage(i)}
                    />
                ))}
            </div>
        </main>
    )
}

export default MostPopular
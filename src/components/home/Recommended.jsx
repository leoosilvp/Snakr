import { useState, useEffect, useRef, useMemo } from 'react'
import { ChevronLeft, ChevronRight, List } from "@geist-ui/icons"
import { Link } from "react-router-dom"
import { gamesService } from '../../services/games.service'
import { useUserGames } from '../../hooks/useUserGames'
import { useGamesContext } from '../../context/GamesCtx'

const ITEMS_PER_PAGE = 6
const TOTAL_ITEMS = 24

const cache = new Map()
const CACHE_TTL = 1000 * 60 * 60

function getCached(key) {
    const entry = cache.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) { cache.delete(key); return null }
    return entry.data
}

function setCache(key, data) {
    cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL })
}

const CACHE_KEY = 'recommended_games'

const Recommended = () => {
    const [page, setPage] = useState(0)
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)
    const abortRef = useRef(null)

    const { games: userGames } = useUserGames()
    const { registerIds } = useGamesContext()

    const userGameIds = useMemo(() => {
        return new Set(userGames.map(g => g.game_id))
    }, [userGames])

    const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE)
    const visibleGames = games.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)

    useEffect(() => {
        const cached = getCached(CACHE_KEY)
        if (cached) {
            setGames(cached)
            registerIds(cached.map(g => g.id))
            return
        }

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller
        let cancelled = false

        async function load() {
            try {
                setLoading(true)

                const totalPages = 3
                const pages = await Promise.all(
                    Array.from({ length: totalPages }, (_, i) =>
                        gamesService.list({ page: i + 1 })
                    )
                )

                if (cancelled) return

                const all = pages.flatMap(d => d?.results ?? [])
                const shuffled = all
                    .sort(() => Math.random() - 0.5)
                    .slice(0, TOTAL_ITEMS)

                setCache(CACHE_KEY, shuffled)
                setGames(shuffled)
                registerIds(shuffled.map(g => g.id))
            } catch (err) {
                if (cancelled || err.name === 'AbortError') return
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
            abortRef.current?.abort()
        }
    }, [registerIds])

    function prevPage() {
        setPage(prev => (prev > 0 ? prev - 1 : prev))
    }

    function nextPage() {
        setPage(prev => (prev < totalPages - 1 ? prev + 1 : prev))
    }

    return (
        <main className="recommended-home">
            <header className="headers-sec-home">
                <h2>Recommended for you</h2>
            </header>
            <div className="recommended-home-content">
                <button
                    className="home-next-btn l"
                    onClick={prevPage}
                    disabled={page === 0}
                >
                    <ChevronLeft size={20} />
                </button>

                <section className="recommended-home-grid">
                    {!loading && visibleGames.map(game => {
                        const inLibrary = userGameIds.has(game.id)

                        return (
                            <Link
                                to={`/game/${game.igdb_id}`}
                                key={game.id}
                                className={`card-game-s ${inLibrary ? 'game-in-lib' : ''}`}
                            >
                                <div>
                                    <img
                                        src={game.cover_image}
                                        alt={game.name}
                                        loading="lazy"
                                    />
                                </div>
                                <h1>
                                    {game.name?.length > 22
                                        ? game.name.slice(0, 22) + '...'
                                        : game.name
                                    }
                                </h1>

                                {inLibrary && (
                                    <section
                                        className='most-popular-in-library'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            window.location.href = '/library'
                                        }}
                                    >
                                        <List size={16} />
                                        <p className='text'>In library</p>
                                    </section>
                                )}
                            </Link>
                        )
                    })}
                </section>

                <button
                    className="home-next-btn r"
                    onClick={nextPage}
                    disabled={page >= totalPages - 1}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

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

export default Recommended
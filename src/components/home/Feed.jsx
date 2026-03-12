import { useState, useEffect, useRef, useMemo } from 'react'
import { List } from "@geist-ui/icons"
import { Link } from "react-router-dom"
import { gamesService } from '../../services/games.service'
import { useUserGames } from '../../hooks/useUserGames'
import { useGamesContext } from '../../context/GamesCtx'

const TOTAL_ITEMS = 10

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

const CACHE_KEY = 'feed_games'

const Feed = () => {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)
    const abortRef = useRef(null)
    const hasLoaded = useRef(false)

    const { displayedGameIds } = useGamesContext()
    const { games: userGames } = useUserGames()

    const userGameIds = useMemo(() => {
        return new Set(userGames.map(g => g.game_id))
    }, [userGames])

    useEffect(() => {
        if (displayedGameIds.size === 0 || hasLoaded.current) return

        const cached = getCached(CACHE_KEY)
        if (cached) {
            setGames(cached)
            hasLoaded.current = true
            return
        }

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller
        let cancelled = false

        async function load() {
            try {
                setLoading(true)

                const pages = await Promise.all(
                    Array.from({ length: 4 }, (_, i) =>
                        gamesService.list({ page: i + 1 })
                    )
                )

                if (cancelled) return

                const all = pages.flatMap(d => d?.results ?? [])
                const filtered = all
                    .filter(g => !displayedGameIds.has(g.id))
                    .sort(() => Math.random() - 0.5)
                    .slice(0, TOTAL_ITEMS)

                setCache(CACHE_KEY, filtered)
                setGames(filtered)
                hasLoaded.current = true
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
    }, [displayedGameIds])

    return (
        <main className="feed-home">
            <header className="headers-sec-home">
                <h1>Featured games</h1>
                <div />
            </header>
            <section className="feed-home-grid">
                {!loading && games.map(game => {
                    const inLibrary = userGameIds.has(game.id)

                    return (
                        <Link
                            to={`/game/${game.igdb_id}`}
                            key={game.id}
                            className={`card-game-b ${inLibrary ? 'game-in-lib' : ''}`}
                        >
                            <div>
                                <img
                                    src={game.cover_image}
                                    alt={game.name}
                                    loading="lazy"
                                />
                            </div>
                            {inLibrary && (
                                <section
                                    className='game-in-library'
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
        </main>
    )
}

export default Feed
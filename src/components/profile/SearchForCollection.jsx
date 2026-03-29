import { Award, Search } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { gamesService } from "../../services/games.service"

const SearchForCollection = () => {
    const { user } = useUser()

    const [games, setGames] = useState([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(null)

    useEffect(() => {
        if (!user?.id) return
        const controller = new AbortController()

        async function load() {
            try {
                setLoading(true)
                const data = await gamesService.userList({
                    userId: user.id,
                    signal: controller.signal
                })
                setGames(Array.isArray(data) ? data : [])
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err)
                    setGames([])
                }
            } finally {
                setLoading(false)
            }
        }

        load()
        return () => controller.abort()
    }, [user?.id])

    const highlightedCount = games.filter(item => item.status === 'highlight').length

    const handleAddHighlight = async (item) => {
        const game = item.games ?? {}
        const gameId = game.id
        const isHighlighted = item.status === 'highlight'
        const isUpdating = updating === gameId
        const limitReached = highlightedCount >= 6

        if (isHighlighted || isUpdating || limitReached) return
        setUpdating(gameId)

        setGames(prev =>
            prev.map(g =>
                g.games?.id === gameId
                    ? { ...g, status: 'highlight' }
                    : g
            )
        )

        try {
            await gamesService.updateUser({ game_id: gameId, status: 'highlight' })
            gamesService.clearCache()
        } catch (err) {
            console.error('Failed to add highlight', err)
            setGames(prev =>
                prev.map(g =>
                    g.games?.id === gameId
                        ? { ...g, status: item.status }
                        : g
                )
            )
        } finally {
            setUpdating(null)
        }
    }

    const filtered = games.filter(item =>
        item.games?.name?.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <main className="search-for-collection-main">
            <section className="search-for-collection-content">
                <header className="search-for-collection-header">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="search.."
                        maxLength={55}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </header>

                <section className="search-for-collection-grid">
                    {loading && (
                        <p className="search-for-collection-empty">Loading...</p>
                    )}

                    {!loading && filtered.length === 0 && (
                        <p className="search-for-collection-empty">No games found.</p>
                    )}

                    {!loading && filtered.map(item => {
                        const game = item.games ?? {}
                        const achievements = game.achievements ?? []
                        const unlocked = achievements.filter(a => a.unlocked).length
                        const total = achievements.length
                        const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0
                        const isHighlighted = item.status === 'highlight'
                        const limitReached = !isHighlighted && highlightedCount >= 6

                        return (
                            <div key={game.id}>
                                <article
                                    className={[
                                        'search-for-collection-card',
                                        isHighlighted ? 'highlighted' : '',
                                        limitReached ? 'limit-reached' : '',
                                    ].join(' ').trim()}
                                    onClick={() => handleAddHighlight(item)}
                                    title={game.name}
                                >
                                    <img src={game.cover_image} alt={game.name} />
                                    <div className="search-for-collection-card-content">
                                        <h1>{game.name}</h1>
                                        <article className="game-achievements">
                                            <section>
                                                <div>
                                                    <Award size={16} />
                                                    <p>{unlocked}</p>
                                                </div>
                                                <div>
                                                    <p>{percent}%</p>
                                                </div>
                                            </section>
                                            <div
                                                className="progress-bar"
                                                style={{ '--progress': `${percent}%` }}
                                            />
                                        </article>
                                    </div>
                                </article>
                                <hr />
                            </div>
                        )
                    })}
                </section>
            </section>
        </main>
    )
}

export default SearchForCollection
import { AlertTriangle, Award, Clock, Heart, HeartFill, Inbox } from "@geist-ui/icons"
import { useState, useCallback, useMemo } from "react"
import { useUserGames } from "../../hooks/useUserGames"
import { gamesService } from "../../services/games.service"
import { Link } from "react-router-dom"
import LibrarySkeleton from "../skeletons/LibrarySkeleton"

const AllGames = () => {
    const { games, setGames, loading, error } = useUserGames()
    const [favLoading, setFavLoading] = useState({})

    const safeGames = useMemo(() => {
        const list = Array.isArray(games) ? games : []
        return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }, [games])

    const toggleFavorite = useCallback(async (e, game_id, currentFav) => {
        e.preventDefault()
        e.stopPropagation()

        if (favLoading[game_id]) return

        setFavLoading((prev) => ({ ...prev, [game_id]: true }))

        setGames((prev) =>
            prev.map((g) => g.game_id === game_id ? { ...g, favorite: !currentFav } : g)
        )

        try {
            await gamesService.updateUser({ game_id, favorite: !currentFav })
        } catch (err) {
            console.error("Failed to toggle favorite:", err)
            setGames((prev) =>
                prev.map((g) => g.game_id === game_id ? { ...g, favorite: currentFav } : g)
            )
        } finally {
            setFavLoading((prev) => ({ ...prev, [game_id]: false }))
        }
    }, [favLoading, setGames])

    if (loading) {
        return (
            <main className="library-games-grid">
                <LibrarySkeleton />
            </main>
        )
    }

    if (error) {
        return (
            <main className="library-games-grid-error">
                <p className="library-games-error"><AlertTriangle />{error}</p>
            </main>
        )
    }

    if (!safeGames.length) {
        return (
            <main className="library-games-grid-error">
                <p className="library-games-error"><Inbox /> Your library is empty.</p>
            </main>
        )
    }

    return (
        <main className="library-games-grid">
            {safeGames.map((game) => {
                const name = game.games?.name
                const cover = game.games?.cover_image
                const unlocked = game.achievements_unlocked ?? game.user_data?.achievements_unlocked ?? 0
                const total = game.achievements_total ?? game.user_data?.achievements_total ?? 0
                const minutes = game.hours_played
                const progress = total > 0 ? Math.round((unlocked / total) * 100) : 0
                const isFav = game.favorite
                const isFavLoading = !!favLoading[game.game_id]

                return (
                    <Link to={`/game/${game.games?.igdb_id}`} key={game.game_id} className="library-game-card" title={name}>
                        <img src={cover} alt={name} />
                        <div className="cover">
                            <article className="ctn-game-time">
                                <div className="game-time">
                                    <Clock size={13} />
                                    {minutes} minutes
                                </div>
                                <button
                                    className={`game-fav${isFav ? " active" : ""}`}
                                    onClick={(e) => toggleFavorite(e, game.game_id, isFav)}
                                    disabled={isFavLoading}
                                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                                >
                                    {isFav ? <HeartFill size={15} /> : <Heart size={15} />}
                                </button>
                            </article>
                            <article className="game-achievements">
                                <section>
                                    <div>
                                        <Award size={16} />
                                        <p>{unlocked} / {total || "-"}</p>
                                    </div>
                                    <div>
                                        <p>{progress}%</p>
                                    </div>
                                </section>
                                <div className="progress-bar" />
                            </article>
                        </div>
                    </Link>
                )
            })}
        </main>
    )
}

export default AllGames
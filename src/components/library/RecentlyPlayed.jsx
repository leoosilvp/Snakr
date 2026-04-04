import { Award, Clock, Heart, HeartFill, AlertTriangle } from "@geist-ui/icons"
import { useUserGames } from "../../hooks/useUserGames"
import { useState, useCallback } from "react"
import { gamesService } from "../../services/games.service"
import { Link } from "react-router-dom"
import LibrarySkeleton from "../skeletons/LibrarySkeleton"
import AlertModal from "../../components/AlertModal"

const RecentlyPlayed = () => {
    const { games, setGames, loading, error } = useUserGames()

    const [favLoading, setFavLoading] = useState({})

    const [alert, setAlert] = useState(null)

    const showAlert = (icon, title) => {
        setAlert({ icon, title })
        setTimeout(() => setAlert(null), 4000)
    }

    const safeGames = Array.isArray(games)
        ? games
        : Array.isArray(games?.results)
            ? games.results
            : Array.isArray(games?.data)
                ? games.data
                : []

    const playedGames = safeGames.filter(game => Number(game.hours_played) > 0.01)

    const toggleFavorite = useCallback(async (e, game_id, currentFav) => {
        e.preventDefault()
        e.stopPropagation()

        if (favLoading[game_id]) return

        setFavLoading(prev => ({ ...prev, [game_id]: true }))

        setGames(prev =>
            prev.map(g =>
                g.game_id === game_id
                    ? { ...g, favorite: !currentFav }
                    : g
            )
        )
        showAlert(
            !currentFav ? "CheckCircle" : "Info",
            !currentFav ? "Added to favorites" : "Removed from favorites"
        )
        try {
            await gamesService.updateUser({
                game_id,
                favorite: !currentFav
            })
        } catch (err) {
            console.error("Failed to toggle favorite:", err)

            setGames(prev =>
                prev.map(g =>
                    g.game_id === game_id
                        ? { ...g, favorite: currentFav }
                        : g
                )
            )

            showAlert("AlertTriangle", "Failed to update favorites")
        } finally {
            setFavLoading(prev => ({ ...prev, [game_id]: false }))
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

    if (!playedGames.length) {
        return (
            <main className="library-games-grid-error">
                <p className="library-games-error"><Clock /> You haven't played any games yet.</p>
            </main>
        )
    }

    return (
        <main className="library-games-grid">

            {alert && <AlertModal icon={alert.icon} title={alert.title} />}

            {playedGames.map((game) => {
                const name = game.games?.name
                const cover = game.games?.cover_image || game.games?.cover?.url
                const unlocked = game.achievements_unlocked ?? 0
                const total = game.achievements_total ?? 0
                const minutes = game.hours_played ?? 0
                const progress = total > 0 ? Math.round((unlocked / total) * 100) : 0
                const isFav = game.favorite
                const isFavLoading = !!favLoading[game.game_id]

                return (
                    <Link
                        to={`/game/${game.games?.igdb_id}`}
                        key={game.game_id}
                        className="library-game-card"
                        title={name}
                    >
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
                                >
                                    {isFav
                                        ? <HeartFill size={15} />
                                        : <Heart size={15} />
                                    }
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

export default RecentlyPlayed
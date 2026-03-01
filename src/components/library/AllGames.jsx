import { Award, Clock, Heart, HeartFill } from "@geist-ui/icons"
import { useUserGames } from "../../hooks/useUserGames"
import { Link } from "react-router-dom"

const AllGames = () => {
    const { games, loading, error } = useUserGames()
    const safeGames = Array.isArray(games) ? games : Array.isArray(games?.results) ? games.results : Array.isArray(games?.data) ? games.data : []

    if (loading) {
        return (
            <main className="library-games-grid">
                <p>Carregando biblioteca...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="library-games-grid">
                <p>{error}</p>
            </main>
        )
    }

    if (!safeGames.length) {
        return (
            <main className="library-games-grid">
                <p>Sua biblioteca está vazia.</p>
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

                return (
                    <Link to={`/game/${game.games?.igdb_id}`} key={game.game_id} className="library-game-card" title={name}>
                        <img src={cover} alt={name} />
                        <div className="cover">
                            <article className="ctn-game-time">
                                <div className="game-time">
                                    <Clock size={13} />
                                    {minutes} minutes
                                </div>
                                <button className="game-fav">
                                    {isFav ? (
                                        <HeartFill size={15} />
                                    ) : (
                                        <Heart size={15} />
                                    )}
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
import { Award, Clock } from "@geist-ui/icons"
import { useUserGames } from "../../hooks/useUserGames"

const Favorites = () => {
    const { games, loading, error } = useUserGames()
    const safeGames = Array.isArray(games) ? games : Array.isArray(games?.results) ? games.results : Array.isArray(games?.data) ? games.data : []
    const favoriteGames = safeGames.filter(game => game.favorite === true)

    if (loading) {
        return (
            <main className="library-games-grid">
                <p>Carregando favoritos...</p>
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

    if (!favoriteGames.length) {
        return (
            <main className="library-games-grid">
                <p>Você ainda não tem jogos favoritos.</p>
            </main>
        )
    }

    return (
        <main className="library-games-grid">
            {favoriteGames.map((game) => {
                const id = game.id || game.game_id
                const name = game.games?.name
                const cover = game.games?.cover_image || game.games?.cover?.url
                const unlocked = game.achievements_unlocked ?? 0
                const total = game.achievements_total ?? 0
                const minutes = game.hours_played ?? 0
                const progress = total > 0 ? Math.round((unlocked / total) * 100) : 0

                return (
                    <article key={id} className="library-game-card" title={name}>
                        <img src={cover} alt={name} />
                        <div className="cover">
                            <article className="game-time">
                                <Clock size={13} />
                                {minutes} minutes
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
                                <div className="progress-bar" style={{ width: `${progress}%` }} />
                            </article>
                        </div>
                    </article>
                )
            })}
        </main>
    )
}

export default Favorites
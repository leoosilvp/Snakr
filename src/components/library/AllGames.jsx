import { Award, Clock } from "@geist-ui/icons"

const AllGames = () => {
    return (
        <main className="library-games-grid">
            <article className="library-game-card" title="Forza Horizon 6">
                <img src="https://upload.wikimedia.org/wikipedia/pt/0/03/Forza_Horizon_6.jpg" />
                <div className="cover" >
                    <article className="game-time"><Clock size={13} />0 minutes</article>
                    <article className="game-achievements">
                        <section>
                            <div>
                                <Award size={16} />
                                <p>0 / -</p>
                            </div>
                            <div>
                                <p>0%</p>
                            </div>
                        </section>
                        <div className="progress-bar" />
                    </article>
                </div>
            </article>
        </main>
    )
}

export default AllGames

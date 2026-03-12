import { List } from "@geist-ui/icons"
import { Link } from "react-router-dom"

const Feed = () => {
    return (
        <main className="feed-home">
            <header className="headers-sec-home">
                <h1>Featured games</h1>
                <div />
            </header>
            <section className="feed-home-grid">

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
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
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

                <Link className="card-game-b">
                    <div>
                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/cobkt6.jpg" />
                    </div>
                </Link>

            </section>
        </main>
    )
}

export default Feed

import { ChevronLeft, ChevronRight, ShoppingCart, Users } from "@geist-ui/icons"
import Footer from "../components/Footer"
import Header from "../components/Header"
import '../css/home.css'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <main className="home-main">
      <Header />

      <section className="content">
        <div className="home-main-feed">

          <section className="most-popular">
            <header className="most-popular-header">
              <h1>Most popular</h1>
              <div />
            </header>
            <section className="most-popular-content">
              <button className="home-next-btn l"><ChevronLeft size={20} /></button>
              <div className="most-popular-grid">
                <Link to={`/game/:igdb_id`} className="card-game-main">
                  <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.jpg" />
                  <section className="card-game-main-content">
                    <section>
                      <h1>Titulo do jogo</h1>
                      <div>
                        <h2>ação</h2>
                        <h2>aventura</h2>
                        <h2>corrida</h2>
                      </div>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis eaque impedit omnis provident qui temporibus itaque, sapiente iusto </p>
                    </section>
                    <section className="card-game-main-footer">
                      <div>
                        <Users size={13} /> / 1.286
                      </div>
                      <button><ShoppingCart size={15} />Add the library</button>
                    </section>
                  </section>
                </Link>

                <Link to={`/game/:igdb_id`} className="card-game-main">
                  <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg" />
                  <section className="card-game-main-content">
                    <section>
                      <h1>Titulo do jogo</h1>
                      <div>
                        <h2>ação</h2>
                        <h2>simulação</h2>
                        <h2>corrida</h2>
                      </div>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis eaque impedit omnis provident qui temporibus itaque, sapiente iusto </p>
                    </section>
                    <section className="card-game-main-footer">
                      <div>
                        <Users size={13} /> / 1.031
                      </div>
                      <button><ShoppingCart size={15} />Add the library</button>
                    </section>
                  </section>
                </Link>
              </div>
              <button className="home-next-btn r"><ChevronRight size={20} /></button>
            </section>
            <div className="most-popular-dots">
              <div className="active" />
              <div />
              <div />
            </div>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home

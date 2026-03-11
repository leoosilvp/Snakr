import Footer from "../components/Footer"
import Header from "../components/Header"
import '../css/home.css'

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
            <div className="most-popular-grid">
              <article className="card-game-main">
                <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.jpg" />
                <section className="card-game-main-content">
                  <h1>Titulo do jogo</h1>
                  <div>
                    <p>ação</p>
                    <p>aventura</p>
                    <p>corrida</p>
                  </div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis eaque impedit omnis provident qui temporibus itaque, sapiente iusto </p>
                </section>
              </article>
            </div>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home

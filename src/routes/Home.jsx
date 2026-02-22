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
          </section>
        </div>

      </section>

      <Footer />
    </main>
  )
}

export default Home

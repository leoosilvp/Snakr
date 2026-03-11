import Footer from "../components/Footer"
import Header from "../components/Header"
import '../css/home.css'
import MostPopular from "../components/home/MostPopular"

const Home = () => {
  return (
    <main className="home-main">
      <Header />

      <section className="content">
        <div className="home-main-feed">

          <MostPopular />

        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home

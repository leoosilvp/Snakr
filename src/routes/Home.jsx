import Footer from "../components/Footer"
import Header from "../components/Header"
import '../css/home.css'
import MostPopular from "../components/home/MostPopular"
import Banner from "../components/home/Banner"

const Home = () => {
  return (
    <main className="home-main">
      <Header />

      <section className="content">
        <div className="home-main-feed">
          <Banner />
          <MostPopular />
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home

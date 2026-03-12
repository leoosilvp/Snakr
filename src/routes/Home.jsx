import Footer from "../components/Footer"
import Header from "../components/Header"
import '../css/home.css'
import { GamesProvider } from '../context/GamesContext.jsx'
import Banner from "../components/home/Banner"
import MostPopular from "../components/home/MostPopular"
import Recommended from "../components/home/Recommended"
import Feed from "../components/home/Feed"

const Home = () => {
  return (
    <main className="home-main">
      <Header />

      <section className="content">
        <div className="home-main-feed">
          <Banner />
          <GamesProvider>
            <MostPopular />
            <Recommended />
            <Feed />
          </GamesProvider>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home

import Header from "../components/Header"
import Ads from "../components/Ads";

const Home = () => {
  return (
    <main className="home-main">
      <Header />

      <section className="content">
        <aside className="aside-left">
          <Ads />
        </aside>

        <section className="feed">
        </section>

        <aside className="aside-right">
        </aside>
      </section>

    </main>
  )
}

export default Home

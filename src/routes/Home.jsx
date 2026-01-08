import Header from "../components/Header"

const Home = () => {
  return (
    <main className="home-main">
      <Header />

      <section className="content">
        <div className="feed">
          <section className="most-popular">
            <header className="most-popular-header">
              <h1>Most popular</h1>
              <div />
            </header>
          </section>
        </div>
      </section>
    </main>
  )
}

export default Home

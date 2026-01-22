import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNews } from '../hooks/useNews'
import '../css/news.css'
import CardsNews from '../components/news/CardsNews'

const News = () => {
  const { news, loading, error } = useNews()

  return (
    <main className="news-main">
      <Header />

      <section className="news-content">
        <header className="news-content-header">
          <h1>Snakr News</h1>
          <div />
        </header>

        <p className="news-content-scroll-date">Highlights</p>

        {error && <p className="news-error">{error}</p>}
        {loading && <p className="news-loading">Searching news...</p>}

        {!loading && news.length > 0 && (
            <>
            <CardsNews news={news} from={0} to={15} />
            <p className="news-content-scroll-type">All news</p>
            <hr />
            <CardsNews news={news} from={15} to={30} />
            <CardsNews news={news} from={30} to={45} />
            <CardsNews news={news} from={45} to={60} />
          </>
        )}
      </section>

      <Footer />
    </main>
  )
}

export default News
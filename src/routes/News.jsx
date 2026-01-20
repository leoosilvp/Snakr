import Header from "../components/Header"
import Footer from "../components/Footer"
import '../css/news.css'

const News = () => {
    return (
        <main className="news-main">
            <Header />
            <section className="news-content">
                <header className="news-content-header">
                    <h1>Snakr News</h1>
                    <div />
                </header>
                <p className="news-content-scrool-date">Destaques</p>
                <section className="news-content-scrool">
                    <button><i className="fa-solid fa-chevron-right" /></button>
                    <section>
                        <article className="news-card">

                        </article>
                    </section>
                    <button><i className="fa-solid fa-chevron-left" /></button>
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default News

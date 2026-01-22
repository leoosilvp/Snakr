import { useRef } from 'react'

const CardsNews = ({ news = [], from = 0, to }) => {
  const scrollRef = useRef(null)

  const scroll = direction => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === 'right' ? 300 : -300,
      behavior: 'smooth'
    })
  }

  const truncate = (text, max) =>
    !text ? '' : text.length > max ? `${text.slice(0, max).trim()}...` : text

  const slicedNews = news.slice(from, to)

  if (slicedNews.length === 0) return null

  return (
    <section className="news-content-scroll">
      <button className="news-scroll-btn left" onClick={() => scroll('left')}>
        <i className="fa-solid fa-chevron-left" />
      </button>

      <section className="news-scroll-list" ref={scrollRef}>
        {slicedNews.map(item => (
          <article className="news-card" key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className="news-card-image">
                <img
                  src={item.image || 'https://www.pawnamerica.com/images/no-photo.png'}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="news-source">{item.source}</span>
              </div>

              <div className="news-card-content">
                <h3 className="news-title">{truncate(item.title, 95)}</h3>
                <p className="news-description">{truncate(item.description, 35)}</p>
                <time className="news-date">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </time>
              </div>
            </a>
          </article>
        ))}
      </section>

      <div className='card-news-smooth' />

      <button className="news-scroll-btn right" onClick={() => scroll('right')}>
        <i className="fa-solid fa-chevron-right" />
      </button>
    </section>
  )
}

export default CardsNews

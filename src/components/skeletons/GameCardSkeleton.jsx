import '../../css/skeleton.css'

const GameCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
          <article key={i} className="catalog-card-game">

            <section className="catalog-card-game-content">

              <div className="skeleton-game-image shimmer" />

              <div className="skeleton-game-info">
                <div className="skeleton-game-title shimmer" />

                <div className="skeleton-game-genres">
                  <div className="skeleton-game-genre shimmer" />
                  <div className="skeleton-game-genre shimmer" />
                  <div className="skeleton-game-genre shimmer" />
                </div>
              </div>

            </section>
          </article>
        ))}
    </>
  )
}

export default GameCardSkeleton
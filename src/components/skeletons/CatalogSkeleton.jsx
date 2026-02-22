import '../../css/skeleton.css'
import HeaderSkeleton from '../../components/skeletons/HeaderSkeleton'

const CatalogSkeleton = () => {
    return (
        <main className="catalog-main">
            <HeaderSkeleton />
            <section className="catalog-main-content">

                <header className="catalog-main-header header-skeleton">

                    <section className="catalog-main-header-content">
                        <div className="skeleton-game-title shimmer" style={{ width: 80, height: 16 }} />
                        <div className="hr" />
                        <section className="catalog-main-header-change-page">
                            <div className="skeleton-logo shimmer" />
                            <div className="skeleton-logo shimmer" />
                        </section>
                    </section>

                    <div className="skeleton-search shimmer" style={{ width: 375 }} />

                </header>

                <section className="catalog-content">

                    <section className="catalog-main-cards">

                        {Array.from({ length: 6 }).map((_, i) => (
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
                    </section>

                    <aside className="catalog-main-filter">

                        <header className="catalog-main-filter-header">
                            <article>
                                <section
                                    className="shimmer"
                                    style={{ width: 13, height: 13, borderRadius: 100 }}
                                />
                                <section
                                    className="shimmer"
                                    style={{ width: 80, height: 18, borderRadius: 4 }}
                                />
                            </article>

                            <section
                                className="shimmer"
                                style={{ width: 60, height: 14, borderRadius: 4, marginTop: 10 }}
                            />
                        </header>

                        <section className="catalog-filters">

                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i}>
                                    <div
                                        className="shimmer"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 3
                                        }}
                                    />
                                    <div
                                        className="shimmer"
                                        style={{
                                            width: 100,
                                            height: 18,
                                            borderRadius: 4
                                        }}
                                    />
                                </div>
                            ))}

                        </section>

                    </aside>

                </section>

                {/* PAGINATION */}
                <section className="catalog-change-page">
                    <div className="shimmer" style={{ width: 20, height: 14 }} />
                    <div className="skeleton-icon shimmer" />
                    <div className="shimmer" style={{ width: 30, height: 18 }} />
                    <div className="skeleton-icon shimmer" />
                    <div className="shimmer" style={{ width: 20, height: 14 }} />
                </section>

            </section>
        </main>
    )
}

export default CatalogSkeleton
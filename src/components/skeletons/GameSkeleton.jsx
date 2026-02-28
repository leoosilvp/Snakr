import '../../css/skeleton.css'
import HeaderSkeleton from '../../components/skeletons/HeaderSkeleton'
import Footer from '../../components/Footer'

const GameSkeleton = () => {
    return (
        <main className="game-main">

            <HeaderSkeleton />

            <section className="game-main-content">

                {/* HEADER */}
                <header className="game-header-main header-skeleton">

                    {/* Breadcrumbs */}
                    <section className="game-header-breadcrumbs">
                        <div className="skeleton-breadcrumb shimmer" />
                        <div className="skeleton-breadcrumb shimmer" />
                        <div className="skeleton-breadcrumb shimmer" />
                    </section>

                    {/* Title + Button */}
                    <section className="game-header-content">
                        <div
                            className="skeleton-game-title shimmer"
                            style={{ width: 300, height: 28 }}
                        />
                        <div
                            className="skeleton-btn shimmer"
                            style={{ width: 120, height: 32 }}
                        />
                    </section>
                </header>

                {/* MAIN CONTENT */}
                <section className="game-ctn-content">

                    <div className="game-content">

                        {/* CAROUSEL */}
                        <section className="game-content-carousel">

                            {/* Active Media 800x450 */}
                            <div
                                className="shimmer"
                                style={{
                                    width: 800,
                                    height: 450,
                                    borderRadius: 4
                                }}
                            />

                            {/* Thumbnails */}
                            <section className="game-carousel">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="shimmer"
                                        style={{
                                            width: 120,
                                            height: 65,
                                            borderRadius: 3,
                                            flexShrink: 0
                                        }}
                                    />
                                ))}
                            </section>
                        </section>

                        {/* SIDE BANNER */}
                        <section className="game-content-banner">

                            <div
                                className="shimmer"
                                style={{
                                    width: '100%',
                                    height: 420,
                                    borderRadius: 4
                                }}
                            />

                            <div
                                className="shimmer"
                                style={{
                                    width: '95%',
                                    height: 80,
                                    borderRadius: 4
                                }}
                            />

                            <table>
                                <tbody>
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div
                                                    className="shimmer"
                                                    style={{
                                                        width: 140,
                                                        height: 14,
                                                        borderRadius: 3
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <div
                                                    className="shimmer"
                                                    style={{
                                                        width: 160,
                                                        height: 14,
                                                        borderRadius: 3
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </section>

                    </div>

                    {/* FOOTER ACTIONS */}
                    <footer className="game-content-footer">
                        <section>
                            <div className="skeleton-btn shimmer" />
                            <div className="skeleton-btn shimmer" />
                        </section>
                        <section>
                            <div className="skeleton-btn shimmer" />
                        </section>
                    </footer>

                </section>

                {/* DOWNLOAD */}
                <section className="game-download">

                    <div
                        className="skeleton-game-title shimmer"
                        style={{ width: 220, height: 24 }}
                    />

                    <div>
                        <div
                            className="shimmer"
                            style={{
                                width: 450,
                                height: 35,
                                borderRadius: 3
                            }}
                        />
                        <div
                            className="skeleton-btn shimmer"
                            style={{
                                width: 100,
                                height: 30
                            }}
                        />
                    </div>

                </section>

                {/* DESCRIPTION */}
                <section className="game-description">

                    <div
                        className="skeleton-title shimmer"
                        style={{ width: 120, height: 20 }}
                    />

                    <div
                        className="shimmer"
                        style={{
                            width: '100%',
                            height: 100,
                            marginTop: 10,
                            borderRadius: 4
                        }}
                    />

                </section>

                {/* SYSTEM REQUIREMENTS */}
                <section className="game-specs">

                    <div
                        className="skeleton-title shimmer"
                        style={{ width: 200, height: 22 }}
                    />

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div
                                        className="shimmer"
                                        style={{ width: 120, height: 18 }}
                                    />
                                </th>
                                <th>
                                    <div
                                        className="shimmer"
                                        style={{ width: 140, height: 18 }}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div
                                        className="shimmer"
                                        style={{
                                            width: '90%',
                                            height: 80,
                                            borderRadius: 4
                                        }}
                                    />
                                </td>
                                <td>
                                    <div
                                        className="shimmer"
                                        style={{
                                            width: '90%',
                                            height: 80,
                                            borderRadius: 4
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </section>

            </section>

            <Footer />

        </main>
    )
}

export default GameSkeleton
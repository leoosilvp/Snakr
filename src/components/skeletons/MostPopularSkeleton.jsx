import '../../css/skeleton.css'

const MostPopularSkeleton = () => {
    return (
        <main>
            <section>
                <div className="most-popular-grid">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div
                            key={i}
                            className="card-game-main"
                            style={{ cursor: 'default' }}
                        >
                            <div
                                className="shimmer"
                                style={{
                                    width: 225,
                                    minWidth: 225,
                                    height: '100%',
                                    borderRadius: 0,
                                    flexShrink: 0,
                                }}
                            />

                            <section className="card-game-main-content" style={{ width: '100%' }}>

                                <section>
                                    <div
                                        className="shimmer"
                                        style={{ width: '72%', height: 19, borderRadius: 3 }}
                                    />

                                    <div>
                                        <div className="shimmer" style={{ width: 58, height: 16, borderRadius: 3 }} />
                                        <div className="shimmer" style={{ width: 72, height: 16, borderRadius: 3 }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 5 }}>
                                        <div className="shimmer" style={{ width: '100%', height: 11, borderRadius: 3 }} />
                                        <div className="shimmer" style={{ width: '97%', height: 11, borderRadius: 3 }} />
                                        <div className="shimmer" style={{ width: '90%', height: 11, borderRadius: 3 }} />
                                        <div className="shimmer" style={{ width: '93%', height: 11, borderRadius: 3 }} />
                                        <div className="shimmer" style={{ width: '62%', height: 11, borderRadius: 3 }} />
                                    </div>
                                </section>

                                <section className="card-game-main-footer">
                                    <div className="shimmer" style={{ width: 46, height: 13, borderRadius: 3 }} />
                                    <div className="shimmer" style={{ width: 120, height: 33, borderRadius: 4 }} />
                                </section>

                            </section>
                        </div>
                    ))}
                </div>

            </section>

            <div className="most-popular-dots">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className={i === 0 ? 'active' : ''}
                        style={{ pointerEvents: 'none' }}
                    />
                ))}
            </div>

        </main>
    )
}

export default MostPopularSkeleton
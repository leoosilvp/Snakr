import '../../css/skeleton.css'

const LibrarySkeleton = () => {
    return (
        <>
            {Array.from({ length: 10 }).map((_, i) => (
                <article key={i} className="library-game-card">

                    <div
                        className="shimmer"
                        style={{
                            width: 225,
                            height: 285
                        }}
                    />

                    <div className="cover">

                        <article className="ctn-game-time">

                            <div
                                className="shimmer"
                                style={{
                                    margin: 10,
                                    width: 85,
                                    height: 15,
                                    borderRadius: 3
                                }}
                            />


                            <div
                                className="shimmer"
                                style={{
                                    margin: 10,
                                    width: 15,
                                    height: 15,
                                    borderRadius: 100
                                }}
                            />

                        </article>

                        <article className="game-achievements">

                            <section>

                                <div>
                                    <div
                                        className="shimmer"
                                        style={{
                                            width: 60,
                                            height: 12,
                                            borderRadius: 2
                                        }}
                                    />
                                </div>

                                <div>
                                    <div
                                        className="shimmer"
                                        style={{
                                            width: 25,
                                            height: 12,
                                            borderRadius: 2
                                        }}
                                    />
                                </div>

                            </section>

                            <div
                                className="shimmer"
                                style={{
                                    width: '100%',
                                    height: '5px',
                                    borderRadius: 10
                                }}
                            />

                        </article>

                    </div>

                </article>
            ))}
        </>
    )
}

export default LibrarySkeleton
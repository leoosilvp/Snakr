import '../../css/skeleton.css'

const GameListSkeleton = () => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="card-game-s"
                    style={{ cursor: 'default' }}
                >
                    <div>
                        <div
                            className="shimmer"
                            style={{ width: '100%', height: '100%', borderRadius: 0 }}
                        />
                    </div>

                    <div
                        className="shimmer"
                        style={{ width: 110, height: 11, borderRadius: 3 }}
                    />
                </div>
            ))}
        </>
    )
}

export default GameListSkeleton
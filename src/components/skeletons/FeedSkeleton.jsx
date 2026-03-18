import '../../css/skeleton.css'


const FeedSkeleton = () => {
    return (
        <>
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="card-game-b"
                    style={{ cursor: 'default' }}
                >
                    <div>
                        <div
                            className="shimmer"
                            style={{
                                width: '100%',
                                aspectRatio: '3 / 4',
                                borderRadius: 0,
                                display: 'block',
                            }}
                        />
                    </div>
                </div>
            ))}

        </>
    )
}

export default FeedSkeleton
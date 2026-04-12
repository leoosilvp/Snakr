import { useState, useMemo } from 'react'
import '../css/game.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import AlertModal from '../components/AlertModal'
import { ChevronRight, Download, Bookmark, Minus, ShoppingCart } from '@geist-ui/icons'
import { Link, useParams } from 'react-router-dom'
import { useGameDetails } from '../hooks/useGameDetails'
import { useUserGames } from '../hooks/useUserGames'
import GameSkeleton from '../components/skeletons/GameSkeleton'

const Game = () => {
    const { igdb_id } = useParams()
    const { game, loading, error } = useGameDetails(igdb_id)
    const { games: userGames, updateGame, removeGame } = useUserGames()

    const [carouselState, setCarouselState] = useState({
        igdb_id,
        index: 0
    })

    const [alert, setAlert] = useState(null)
    const [selectedUri, setSelectedUri] = useState('')
    const showAlert = (icon, title) => {
        setAlert({ icon, title })
        setTimeout(() => setAlert(null), 4000)
    }

    const activeIndex =
        carouselState.igdb_id === igdb_id
            ? carouselState.index
            : 0

    const handleSetIndex = (index) => {
        setCarouselState({
            igdb_id,
            index
        })
    }

    const userGameIds = useMemo(() => {
        return new Set(userGames.map(g => g.game_id))
    }, [userGames])

    const handleLibraryToggle = (gameId) => {
        if (userGameIds.has(gameId)) {
            removeGame(gameId)
            showAlert("Info", "Game removed from your library")
        } else {
            updateGame({ game_id: gameId, status: 'library' })
            showAlert("CheckCircle", "Game added to your library")
        }
    }

    const downloadOptions = useMemo(() => {
        if (!game?.download?.uris?.length) return []

        return game.download.uris.map((uri, index) => {
            const isMagnet = uri.startsWith('magnet:')
            const isTorrent = uri.endsWith('.torrent')

            let label
            if (isMagnet) {
                label = `Magnet Link ${game.download.uris.filter(u => u.startsWith('magnet:')).indexOf(uri) > 0
                    ? game.download.uris.filter(u => u.startsWith('magnet:')).indexOf(uri) + 1
                    : ''
                    }`.trim()
            } else if (isTorrent) {
                label = `Torrent File ${game.download.uris.filter(u => u.endsWith('.torrent')).indexOf(uri) > 0
                    ? game.download.uris.filter(u => u.endsWith('.torrent')).indexOf(uri) + 1
                    : ''
                    }`.trim()
            } else {
                label = `Direct Link ${index + 1}`
            }

            return { uri, label, isMagnet, isTorrent }
        })
    }, [game])

    const defaultUri = downloadOptions[0]?.uri ?? ''
    const activeUri = selectedUri || defaultUri

    const handleDownload = () => {
        if (!activeUri) return
        // sem função por enquanto
    }

    if (loading) {
        return (
            <GameSkeleton />
        )
    }

    if (error || !game) {
        return (
            <main className="game-main">
                <Header />
                <section className="game-main-content">
                    <p>Erro ao carregar jogo.</p>
                </section>
                <Footer />
            </main>
        )
    }

    const trailer = game.videos?.[0] || null
    const screenshots = game.screenshots || []
    const hasTrailer = Boolean(trailer)
    const mediaCount = screenshots.length + (hasTrailer ? 1 : 0)

    const activeMedia = (() => {
        if (hasTrailer && activeIndex === 0) {
            return {
                type: 'video',
                video_id: trailer.video_id
            }
        }

        const imageIndex = hasTrailer
            ? activeIndex - 1
            : activeIndex

        const image = screenshots[imageIndex]

        if (!image) return null

        return {
            type: 'image',
            url: image.url
        }
    })()

    const fullDescription = game.description || ''
    const bannerDescription = fullDescription.length > 400
        ? fullDescription.slice(0, 400).trimEnd() + '...'
        : fullDescription

    const inLibrary = userGameIds.has(game.id)

    const hasDownload = downloadOptions.length > 0

    return (
        <main className="game-main">

            {alert && <AlertModal icon={alert.icon} title={alert.title} />}

            <Header />

            <section className="game-main-content">

                <header className="game-header-main">
                    <section className="game-header-breadcrumbs">
                        <Link to="/catalog">Catalog</Link>
                        <ChevronRight size={16} />

                        {game.genres?.[0] && (
                            <>
                                <Link to={`/catalog?filter=${game.genres[0].slug}`}>
                                    {game.genres[0].name}
                                </Link>
                                <ChevronRight size={16} />
                            </>
                        )}

                        <span>{game.name}</span>
                    </section>

                    <section className="game-header-content">
                        <h1>{game.name}</h1>
                    </section>
                </header>

                <section className="game-ctn-content">
                    <div className="game-content">

                        <section className="game-content-carousel">

                            {activeMedia?.type === 'video' && (
                                <iframe
                                    className="game-content-carousel-active"
                                    src={`https://www.youtube.com/embed/${activeMedia.video_id}?modestbranding=1&rel=0`}
                                    title={game.name}
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            )}

                            {activeMedia?.type === 'image' && (
                                <img
                                    className="game-content-carousel-active"
                                    src={activeMedia.url}
                                    alt={game.name}
                                />
                            )}

                            {mediaCount > 0 && (
                                <section className="game-carousel">

                                    {hasTrailer && (
                                        <div
                                            className={activeIndex === 0 ? 'active' : ''}
                                            onClick={() => handleSetIndex(0)}
                                            style={{ '--hero_img': `url(${game.hero_image || ''})` }}
                                        >
                                            ▶
                                        </div>
                                    )}

                                    {screenshots.map((img, index) => {
                                        const indexOffset = hasTrailer
                                            ? index + 1
                                            : index

                                        return (
                                            <img
                                                key={index}
                                                src={img.url}
                                                alt={game.name}
                                                className={
                                                    activeIndex === indexOffset
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={() =>
                                                    handleSetIndex(indexOffset)
                                                }
                                            />
                                        )
                                    })}
                                </section>
                            )}
                        </section>

                        <section className="game-content-banner">

                            {game.cover?.url && (
                                <img
                                    src={game.hero_image}
                                    alt={game.name}
                                />
                            )}

                            <p>
                                {bannerDescription || 'Description not available.'}
                            </p>

                            <table>
                                <tbody>

                                    <tr>
                                        <td>ANALYSIS:</td>
                                        <td>
                                            {game.rating
                                                ? `${game.rating.toFixed(1)} (${game.rating_count || 0})`
                                                : 'No reviews'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>RELEASE DATE:</td>
                                        <td>
                                            {game.release_date
                                                ? new Date(game.release_date).toLocaleDateString('pt-BR')
                                                : 'N/A'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>DEVELOPER:</td>
                                        <td>
                                            {game.developers?.length
                                                ? game.developers.map(d => d.name).join(', ')
                                                : 'N/A'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>DISTRIBUTOR:</td>
                                        <td>
                                            {game.publishers?.length
                                                ? game.publishers.map(p => p.name).join(', ')
                                                : 'N/A'}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </section>
                    </div>

                    <footer className="game-content-footer">
                        <section>
                            <Link to='/catalog'><ShoppingCart size={16} /> Catalog</Link>
                            <Link
                                className={inLibrary ? 'in-library' : ''}
                                onClick={() => handleLibraryToggle(game.id)}
                                title={inLibrary ? 'Remove from library' : 'Add to library'}
                            >
                                {inLibrary
                                    ? <Minus size={14} />
                                    : <Bookmark size={14} />
                                }
                                {inLibrary ? 'Remove from library' : 'Add to library'}
                            </Link>
                        </section>
                        <section>
                            <Link to='/library'>View library</Link>
                        </section>
                    </footer>
                </section>

                <section className="game-download">
                    <h1>Download: {game.name}</h1>

                    {hasDownload ? (
                        <>
                            <div>
                                <select
                                    value={activeUri}
                                    onChange={e => setSelectedUri(e.target.value)}
                                >
                                    {downloadOptions.map((option, index) => (
                                        <option key={index} value={option.uri}>
                                            {game.download.fileTitle}
                                            {game.download.fileSize && index === 0
                                                ? ` — ${game.download.fileSize}`
                                                : ''
                                            }
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={handleDownload}
                                    disabled={!activeUri}
                                >
                                    <Download size={16} /> Download
                                </button>
                            </div>
                        </>
                    ) : (
                        <div>
                            <select disabled>
                                <option>No download source available.</option>
                            </select>
                            <button disabled>
                                <Download size={16} /> Download
                            </button>
                        </div>
                    )}
                </section>

                <section className="game-description">
                    <h1>About</h1>
                    <p>
                        {game.description ||
                            'Descrição não disponível.'}
                    </p>
                </section>

                <section className="game-specs">
                    <h1>System Requirements</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Minimum</th>
                                <th>Recommended</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {game.minimum_requirements ||
                                        'Not informed.'}
                                </td>
                                <td>
                                    {game.recommended_requirements ||
                                        'Not informed.'}
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

export default Game
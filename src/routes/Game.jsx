import { useState } from 'react'
import '../css/game.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ChevronRight, Download } from '@geist-ui/icons'
import { Link, useParams } from 'react-router-dom'
import { useGameDetails } from '../hooks/useGameDetails'

const Game = () => {
    const { igdb_id } = useParams()
    const { game, loading, error } = useGameDetails(igdb_id)

    /**
     * Estado profissional do carrossel
     * Mantém controle do jogo que originou o estado
     * Evita useEffect e cascading render
     */
    const [carouselState, setCarouselState] = useState({
        igdb_id,
        index: 0
    })

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

    if (loading) {
        return (
            <main className="game-main">
                <Header />
                <section className="game-main-content">
                    <p>Carregando...</p>
                </section>
                <Footer />
            </main>
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

    return (
        <main className="game-main">
            <Header />

            <section className="game-main-content">

                {/* HEADER */}
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
                        <Link>Community</Link>
                    </section>
                </header>

                {/* CONTENT */}
                <section className="game-ctn-content">
                    <div className="game-content">

                        {/* CAROUSEL */}
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
                                        <button
                                            className={activeIndex === 0 ? 'active' : ''}
                                            onClick={() => handleSetIndex(0)}
                                        >
                                            ▶
                                        </button>
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

                        {/* BANNER */}
                        <section className="game-content-banner">

                            {game.cover?.url && (
                                <img
                                    src={game.hero_image}
                                    alt={game.name}
                                />
                            )}

                            <p>
                                {game.description ||
                                    'Descrição não disponível.'}
                            </p>

                            <table>
                                <tbody>

                                    <tr>
                                        <td>ANÁLISES:</td>
                                        <td>
                                            {game.rating
                                                ? `${game.rating.toFixed(1)} (${game.rating_count || 0})`
                                                : 'Sem avaliações'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>DATA DE LANÇAMENTO:</td>
                                        <td>
                                            {game.release_date
                                                ? new Date(game.release_date).toLocaleDateString('pt-BR')
                                                : 'N/A'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>DESENVOLVEDOR:</td>
                                        <td>
                                            {game.developers?.length
                                                ? game.developers.map(d => d.name).join(', ')
                                                : 'N/A'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>DISTRIBUIDORA:</td>
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
                            <Link>Seguir</Link>
                            <Link>Adicionar à lista</Link>
                        </section>
                        <section>
                            <Link>Ver lista</Link>
                        </section>
                    </footer>
                </section>

                {/* DOWNLOAD */}
                <section className="game-download">
                    <h1>Download: {game.name}</h1>
                    <div>
                        <select>
                            <option>Nenhuma fonte de download.</option>
                        </select>
                        <button>
                            <Download size={16} /> Baixar
                        </button>
                    </div>
                </section>

                {/* DESCRIPTION */}
                <section className="game-description">
                    <h1>Sobre</h1>
                    <p>
                        {game.description ||
                            'Descrição não disponível.'}
                    </p>
                </section>

                {/* SPECS */}
                <section className="game-specs">
                    <h1>Requisitos de sistema</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Mínimo</th>
                                <th>Recomendado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {game.minimum_requirements ||
                                        'Não informado.'}
                                </td>
                                <td>
                                    {game.recommended_requirements ||
                                        'Não informado.'}
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
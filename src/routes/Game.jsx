import '../css/game.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ChevronRight } from '@geist-ui/icons'
import { Link } from 'react-router-dom'

const Game = () => {
    return (
        <main className="game-main">
            <Header />
            <section className="game-main-content">
                <header className='game-header-main'>
                    <section className='game-header-breadcrumbs'>
                        <Link to='/catalog'>Catalog</Link>
                        <ChevronRight size={16} />
                        <Link to='/catalog?filter=action'>Action</Link>
                        <ChevronRight size={16} />
                        <Link to=''>Grand Theft Auto V</Link>
                    </section>
                    <section className='game-header-content'>
                        <h1>Grand Theft Auto V</h1>
                        <Link>Community</Link>
                    </section>
                </header>

                <section className='game-ctn-content'>
                    <div className='game-content'>
                        <section className='game-content-carousel'>
                            <iframe
                                className='game-content-carousel-active'
                                src="https://www.youtube.com/embed/QkkoHAzjnUs?modestbranding=1&rel=0&showinfo=1&controls=1"
                                title="Grand Theft Auto V Trailer"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                                allowfullscreen>
                            </iframe>
                            <section className='game-carousel'>
                                <img className='active' src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/257247680/6953f3f3d5ff4750a447fd604910cb5a2eb19a35/movie_232x130.jpg?t=1765479639" />
                                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/d61184a98c1cf2db2b08b2999c04b0519e3615bb/ss_d61184a98c1cf2db2b08b2999c04b0519e3615bb.116x65.jpg?t=1765479644" />
                                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/8340fd391012e12be7e4c02e65801a2648a6b60e/ss_8340fd391012e12be7e4c02e65801a2648a6b60e.116x65.jpg?t=1765479644" />
                                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/f2e70b5823510daa062293ff0b03821e1dee2d37/ss_f2e70b5823510daa062293ff0b03821e1dee2d37.116x65.jpg?t=1765479644" />
                                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/6959cc5d64cce82cb68a27457cfa46fb4d50f897/ss_6959cc5d64cce82cb68a27457cfa46fb4d50f897.116x65.jpg?t=1765479644" />
                                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/0231bf16835cd4f6d83523d76aa8d91cb2dfef9b/ss_0231bf16835cd4f6d83523d76aa8d91cb2dfef9b.116x65.jpg?t=1765479644" />
                                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/f4a6f63b4f7cb42262152449ba5e5c5837f20ff4/ss_f4a6f63b4f7cb42262152449ba5e5c5837f20ff4.116x65.jpg?t=1765479644" />
                                <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/7f432690bd6365e871a2463a5db9cc4e7ebe1151/ss_7f432690bd6365e871a2463a5db9cc4e7ebe1151.116x65.jpg?t=1765479644" />
                            </section>
                        </section>
                        <section className='game-content-banner'>
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/header.jpg?t=1765479644" />
                            <p>Aproveite os fenômenos do entretenimento Grand Theft Auto V e Grand Theft Auto Online melhorados para uma nova geração, com gráficos deslumbrantes, tempos de carregamento mais rápidos, áudio 3D e mais, além de conteúdo exclusivo para jogadores do GTA Online.</p>
                            <table>
                                <tr>
                                    <td>ANALISES:</td>
                                    <td>MUITO POSITIVAS (9.624)</td>
                                </tr>
                                <div />
                                <tr>
                                    <td>DATA DE LANÇAMENTO:</td>
                                    <td>4/mar./2025</td>
                                </tr>
                                <div />
                                <tr>
                                    <td>DESENVOLVEDOR:</td>
                                    <td>Rockstar North</td>
                                </tr>
                                <tr>
                                    <td>DISTRIBUIDORA:</td>
                                    <td>Rockstar Games</td>
                                </tr>
                            </table>
                        </section>
                    </div>
                    <footer className='game-content-footer'>
                        <section>
                            <Link>Seguir</Link>
                            <Link>Adicionar a lista</Link>
                        </section>
                        <section>
                            <Link>Ver lista</Link>
                        </section>
                    </footer>
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default Game

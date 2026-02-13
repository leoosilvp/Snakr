import '../css/welcome.css'
import icon from "../assets/svg/logo.svg"
import logo from "../assets/svg/logo2.svg"
import news from '../assets/img/interface.png'
import { Link } from 'react-router-dom'
import { BarChart2, Github, GitPullRequest, Heart, Lock, Shield, Star, StopCircle, Terminal, Zap } from '@geist-ui/icons'
import { useRef } from 'react'

const Welcome = () => {

    const cardRef = useRef(null)

    const currentX = useRef(0)
    const currentY = useRef(0)
    const targetX = useRef(0)
    const targetY = useRef(0)
    const animationRef = useRef(null)

    const animate = () => {
        currentX.current += (targetX.current - currentX.current) * 0.08
        currentY.current += (targetY.current - currentY.current) * 0.08

        cardRef.current.style.transform = `
    rotateX(${currentX.current}deg)
    rotateY(${currentY.current}deg)
  `

        animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
        const card = cardRef.current
        const rect = card.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        targetX.current = ((y - centerY) / centerY) * -3
        targetY.current = ((x - centerX) / centerX) * 3

        if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animate)
        }
    }

    const handleMouseLeave = () => {
        targetX.current = 0
        targetY.current = 0

        cancelAnimationFrame(animationRef.current)
        animationRef.current = null

        cardRef.current.style.transform =
            'rotateX(0deg) rotateY(0deg)'
    }

    return (
        <main className="welcome-main">
            <header className='welcome-main-header'>
                <Link to='/home'>
                    <img src={icon} />
                </Link>
                <nav>
                    <ul>
                        <Link to='/docs/introduction'>About Us</Link>
                        <Link to='/docs'>Docs</Link>
                        <Link to='/home'>Snakr</Link>
                        <Link to='/contribute' target='blanck'>Contribute</Link>
                        <Link to='https://github.com/leoosilvp/Snakr' target='blanck'>GitHub <GitPullRequest size={16} /></Link>
                    </ul>
                </nav>
                <section className='welcome-main-header-btn'>
                    <Link title='Snakr crypto (SNK)'><span>(SNK)</span><StopCircle size={25} /></Link>
                </section>
            </header>

            <section className='welcome-main-content'>
                <section className='welcome-hero'>
                    <section className='welcome-hero-row'>
                        <p><Star color='#e3b709' size={16} />Your OpenSource gaming center</p>
                    </section>

                    <h1>Your games, your rules. No walls, no gatekeepers</h1>
                    <p>Snakr unifies your collections across platforms while giving you unrestricted access to games. No DRM. No barriers. Just pure gaming freedom.</p>
                    <div className='welcome-hero-btns'>
                        <Link to='/home' className='active'><Terminal />Access Snakr</Link>
                        <Link to='https://github.com/leoosilvp/Snakr' ><Github />GitHub</Link>
                    </div>
                </section>

                <section className="welcome-main-featured-img">
                    <div
                        ref={cardRef}
                        className="featured-img"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={news} />
                    </div>
                </section>

                <section className="features-section">
                    <div className="features-grid">
                        <article className="feature-card">
                            <div className='feature-card-header'>
                                <div className="feature-icon">
                                    <Lock size={18} />
                                </div>
                                <h3>No DRM</h3>
                            </div>
                            <p>Play your games without restrictions. True ownership, no strings attached.</p>
                        </article>
                        <article className="feature-card">
                            <div className='feature-card-header'>
                                <div className="feature-icon">
                                    <Shield size={18} />
                                </div>
                                <h3>Privacy First</h3>
                            </div>
                            <p>Your data stays yours. No tracking, no analytics, complete privacy.</p>
                        </article>
                        <article className="feature-card">
                            <div className='feature-card-header'>
                                <div className="feature-icon">
                                    <Zap size={18} />
                                </div>
                                <h3>Lightning Fast</h3>
                            </div>
                            <p>Optimized performance for seamless gaming experience across all titles.</p>
                        </article>
                    </div>
                </section>

                <section className='about-snakr'>
                    <section className='about-snakr-background'>
                        <div>
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header_292x136.jpg?t=1769844435" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2397300/54d7f7be1eb9e289186fab6132dc668c3644f826/header_292x136.jpg?t=1769873014" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/322170/header_292x136.jpg?t=1703006148" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/312520/header_292x136.jpg?t=1769011296" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/221100/header_292x136.jpg?t=1769695513" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/448280/header_292x136.jpg?t=1710217876" />
                        </div>
                        <div className='active'>
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/594650/header_292x136.jpg?t=1770652362" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3059520/37f833ca5bd3d5c3eec2b411131f3e00f580bbe7/header.jpg?t=1767801592" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/12210/header_292x136.jpg?t=1721061564" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/header_292x136.jpg?t=1716831270" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3949040/cae24b4ed7f4531be51f0d63f785b7d253f92dc3/header_292x136.jpg?t=1766020280" />
                        </div>
                        <div>
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/22380/header.jpg?t=1765992876" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/516750/header_292x136.jpg?t=1736372299" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2537590/header_292x136.jpg?t=1747324291" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/header_292x136.jpg?t=1746471508" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header_292x136.jpg?t=1769690377" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/934700/header_292x136.jpg?t=1761231459" />
                        </div>
                        <div className='active'>
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3527290/31bac6b2eccf09b368f5e95ce510bae2baf3cfcd/header_292x136.jpg?t=1764003551" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/27abb1584a118d50d0e3950fd48d557c51981db7/header_292x136.jpg?t=1769736903" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/686810/fa2c71907321b36aab57edc44dbfe645f0f3a899/header_292x136_alt_assets_4.jpg?t=1770938229" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2300320/c2a205133d23cd24faf3c152d972a1d0177661b8/header_292x136.jpg?t=1764249746" />
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3917090/6954316f59850d5eb912464e30f5644a38131e7b/header.jpg?t=1766069643" />
                        </div>
                    </section>
                    <section className='about-snakr-content'>
                        <h1>What is Snakr?</h1>
                        <p>We believe gaming libraries should belong to players, not platforms. That's why we created Snakr - an open-source game launcher that unifies your collections across Steam, Epic, GOG, and more, while removing DRM restrictions and giving you true ownership of your games.</p>
                        <p>Join thousands of gamers who've reclaimed control of their gaming libraries.</p>
                        <Link to='/home'><Terminal />Access Snakr</Link>
                    </section>
                </section>

                <section className="stats-row">
                    <span><BarChart2 size={16}/>Growing community</span>
                    <h1>Snakr's growth status</h1>
                    <p>Like a snake shedding its skin, our community grows stronger every day, and the numbers speak for themselves:</p>
                    <section className='stats-row-content'>
                        <article className="stat-item">
                            <div className="stat-number">100K+</div>
                            <div className="stat-label">Active Users</div>
                        </article>
                        <div className="stat-divider" />
                        <article className="stat-item">
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Games Available</div>
                        </article>
                        <div className="stat-divider" />
                        <article className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Community Support</div>
                        </article>
                    </section>
                </section>

                <footer className="welcome-footer">
                    <div className="footer-content">
                        <div className="footer-section-logo">
                            <Link to='/home'>
                                <img src={logo} alt="Snakr" className="footer-logo" />
                            </Link>
                            <p>All your games. One place.</p>
                        </div>
                        <div className="footer-section">
                            <h4>Snakr</h4>
                            <Link to='/login'>Login</Link>
                            <Link to='/login?view=register'>Register</Link>
                            <Link to='/home'>Home</Link>
                            <Link to='/profile'>Profile</Link>
                        </div>
                        <div className="footer-section">
                            <h4>Product</h4>
                            <Link to=''>Documentation</Link>
                            <Link to='/status'>Status</Link>
                            <Link to=''>Downloads</Link>
                            <Link to='/contribute'>Contribute</Link>
                        </div>
                        <div className="footer-section">
                            <h4>Community</h4>
                            <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>GitHub</Link>
                            <Link to=''>Discord</Link>
                            <Link to=''>Instagram</Link>
                            <Link to=''>Twitter</Link>
                        </div>
                        <div className="footer-section">
                            <h4>Legal</h4>
                            <Link to='/settings/terms%20and%20privacy'>Privacy Policy</Link>
                            <Link to='/settings/terms%20and%20privacy'>Terms of Service</Link>
                            <Link to='https://github.com/leoosilvp/Snakr/blob/main/LICENSE'>License</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>Snakr | ©2026. Open source and built with <Heart size={12} /> by snakrs.</p>
                    </div>
                </footer>
            </section>
        </main>
    )
}

export default Welcome

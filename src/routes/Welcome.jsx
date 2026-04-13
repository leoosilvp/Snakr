import '../css/welcome.css'
import logo from "../assets/svg/logo2.svg"
import news from '../assets/img/interface.png'
import { Link } from 'react-router-dom'
import { BarChart2, BookOpen, Briefcase, Coffee, Github, GitPullRequest, Heart, Lock, Shield, StopCircle, Terminal, User, Zap, Star, Download, Globe, Code, Package, Layers, ArrowRight, CheckCircle, Users, Activity, TrendingUp, Clock, MessageSquare, Award } from '@geist-ui/icons'
import { useRef, useEffect, useState } from 'react'

const Welcome = () => {

    const cardRef = useRef(null)
    const currentX = useRef(0)
    const currentY = useRef(0)
    const targetX = useRef(0)
    const targetY = useRef(0)
    const animationRef = useRef(null)

    const [counters, setCounters] = useState({ users: 0, games: 0, reviews: 0 })

    useEffect(() => {
        const targets = { users: 100, games: 50, reviews: 4.9 }
        const duration = 2500
        const steps = 60
        const interval = duration / steps

        let step = 0
        const timer = setInterval(() => {
            step++
            const progress = step / steps
            const eased = 1 - Math.pow(1 - progress, 3)
            setCounters({
                users: Math.floor(eased * targets.users),
                games: Math.floor(eased * targets.games),
                reviews: parseFloat((eased * targets.reviews).toFixed(1))
            })
            if (step >= steps) clearInterval(timer)
        }, interval)

        return () => clearInterval(timer)
    }, [])

    const animate = () => {
        currentX.current += (targetX.current - currentX.current) * 0.08
        currentY.current += (targetY.current - currentY.current) * 0.08
        cardRef.current.style.transform = `rotateX(${currentX.current}deg) rotateY(${currentY.current}deg)`
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
        cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
    }

    const testimonials = [
        {
            photo: 'https://avatars.githubusercontent.com/u/225023097?v=4',
            name: 'Samuel M.',
            role: 'Competitive gamer',
            text: "Finally, something that doesn't try to decide for me. A clean interface, no distractions, and complete freedom to manage my library.",
            link: 'https://github.com/SamuelEDMonteiro',
            rating: 5
        },
        {
            photo: 'https://avatars.githubusercontent.com/u/111513559?v=4',
            name: 'Guilherme A.',
            role: 'Gamer enthusiast',
            text: 'Lightweight, fast, and without those unnecessary layers. It looks like it was made by someone who actually uses a PC every day.',
            link: 'https://github.com/Guilherme5G',
            rating: 5
        },
        {
            photo: 'https://avatars.githubusercontent.com/u/149447142?v=4',
            name: 'Yan B.',
            role: 'PC Gamer',
            text: "What truly sets it apart is the community. People contribute, improve, suggest things; it's not just a product, it's a living ecosystem.",
            link: 'https://github.com/Yan2809',
            rating: 5
        }
    ]

    const roadmapItems = [
        { label: 'Unified Library', status: 'done', desc: 'Sync all platform libraries in one place' },
        { label: 'DRM Removal Tools', status: 'done', desc: 'True ownership for your purchased games' },
        { label: 'Cloud Save Sync', status: 'progress', desc: 'Cross-platform save file management' },
        { label: 'Mod Manager', status: 'progress', desc: 'Install and manage mods natively' },
        { label: 'Snakr Mobile', status: 'upcoming', desc: 'Remote play and library browsing on mobile' },
        { label: 'Community Hub', status: 'upcoming', desc: 'Reviews, lists, and game discovery' },
    ]

    return (
        <main className="welcome-main">
            <header className='welcome-main-header'>
                <section className='welcome-main-header-logo'>
                    <Link to='/home'>
                        <img src={logo} />
                    </Link>
                </section>
                <section className='welcome-main-header-right'>
                    <nav>
                        <ul>
                            <Link to='' ><BookOpen size={17} />Docs</Link>
                            <Link to='https://github.com/leoosilvp/Snakr' ><GitPullRequest size={17} />GitHub</Link>
                            <Link to='' ><StopCircle size={17} />ONE</Link>
                            <Link to='/careers' ><Briefcase size={17} />Jobs</Link>
                            <Link to='/contribute' ><Coffee size={17} />Contribute</Link>
                        </ul>
                    </nav>
                    <section className='welcome-main-header-btns'>
                        <Link to='/login?view=register'>Join now</Link>
                        <Link to='/login' className='active'>Sign in</Link>
                    </section>
                </section>
            </header>

            <section className='welcome-main-content'>
                {/* HERO */}
                <section className='welcome-hero'>
                    <section className='welcome-hero-left'>
                        <div className='hero-badge'>
                            <span className='hero-badge-dot' />
                            Open Source · Free Forever · No DRM
                        </div>
                        <h1>Welcome to the most complete game distribution experience.</h1>
                        <div className='welcome-hero-btns'>
                            <Link to='/login' className='active'><User size={22} />Sign in with username</Link>
                            <Link to='https://github.com/leoosilvp/Snakr' ><Github size={22} />Have an idea? Open a P.R.</Link>
                        </div>
                        <section className='welcome-hero-left-content'>
                            <p>By accessing your account, you confirm that you agree to the <Link to='/settings/terms and privacy'>Terms of Use</Link> and <Link to='/settings/terms and privacy' >Privacy Policy</Link> of the platform.</p>
                            <p>Don't have an account? <Link to='/login?view=register' >Create one.</Link></p>
                        </section>
                    </section>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/os-jogadores-jogam-videogame-online-illustration-svg-download-png-4231654.png" />
                </section>

                {/* STATS */}
                <section className="stats-row">
                    <span><BarChart2 size={16} />Growing community</span>
                    <h1>Snakr's growth status</h1>
                    <p>Like a snake shedding its skin, our community grows stronger every day, and the numbers speak for themselves:</p>
                    <section className='stats-row-content'>
                        <article className="stat-item">
                            <div className="stat-number">{counters.users}K+</div>
                            <div className="stat-label">Active Users</div>
                        </article>
                        <div className="stat-divider" />
                        <article className="stat-item">
                            <div className="stat-number">{counters.games}K+</div>
                            <div className="stat-label">Games Available</div>
                        </article>
                        <div className="stat-divider" />
                        <article className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Community Support</div>
                        </article>
                        <div className="stat-divider" />
                        <article className="stat-item">
                            <div className="stat-number">⭐ {counters.reviews}</div>
                            <div className="stat-label">Average Rating</div>
                        </article>
                    </section>
                </section>

                {/* FEATURED IMG */}
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

                {/* FEATURES */}
                <section className="features-section">
                    <div className="features-grid">
                        <article className="feature-card">
                            <div className='feature-card-header'>
                                <div className="feature-icon"><Lock size={18} /></div>
                                <h3>No DRM</h3>
                            </div>
                            <p>Play your games without restrictions. True ownership, no strings attached.</p>
                        </article>
                        <article className="feature-card">
                            <div className='feature-card-header'>
                                <div className="feature-icon"><Shield size={18} /></div>
                                <h3>Privacy First</h3>
                            </div>
                            <p>Your data stays yours. No tracking, no analytics, complete privacy.</p>
                        </article>
                        <article className="feature-card">
                            <div className='feature-card-header'>
                                <div className="feature-icon"><Zap size={18} /></div>
                                <h3>Lightning Fast</h3>
                            </div>
                            <p>Optimized performance for seamless gaming experience across all titles.</p>
                        </article>
                    </div>
                </section>



                {/* ABOUT */}
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

                {/* OPEN SOURCE */}
                <section className='opensource-section'>
                    <div className='opensource-left'>
                        <div className='section-label'><Code size={14} />Open Source</div>
                        <h2>Built in public.<br />Owned by everyone.</h2>
                        <p>Snakr is fully open source. Read the code, fork it, audit it, improve it. No hidden agenda, no black boxes — just a community-driven platform for gamers who care about what runs on their machine.</p>
                        <div className='opensource-actions'>
                            <Link to='https://github.com/leoosilvp/Snakr' className='btn-primary'><Github size={16} />View on GitHub</Link>
                            <Link to='/contribute' className='btn-ghost'><Coffee size={16} />Contribute</Link>
                        </div>
                        <div className='opensource-checks'>
                            {['MIT Licensed', 'No telemetry', 'Community governed', 'Auditable code'].map((item, i) => (
                                <div key={i} className='opensource-check'>
                                    <CheckCircle size={14} />{item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='opensource-right'>
                        <div className='code-block'>
                            <div className='code-block-header'>
                                <div className='code-dots'>
                                    <span /><span /><span />
                                </div>
                                <span className='code-filename'>snakr.config.ts</span>
                            </div>
                            <pre className='code-content'>{`import { defineConfig } from 'snakr'

export default defineConfig({
  drm: false,
  telemetry: false,
  platforms: [
    'steam',
    'epic',
    'gog',
    'itch'
  ],
  privacy: {
    tracking: false,
    analytics: false,
    dataSelling: false
  }
})`}</pre>
                        </div>
                    </div>
                </section>

                {/* ROADMAP */}
                <section className='roadmap-section'>
                    <div className='section-label'><TrendingUp size={14} />Roadmap</div>
                    <h2>Where we're going</h2>
                    <p className='section-sub'>Snakr is always evolving. Here's what's been built and what's coming next.</p>
                    <div className='roadmap-grid'>
                        {roadmapItems.map((item, i) => (
                            <div key={i} className={`roadmap-item roadmap-${item.status}`}>
                                <div className='roadmap-item-header'>
                                    <div className={`roadmap-badge roadmap-badge-${item.status}`}>
                                        {item.status === 'done' ? 'Released' : item.status === 'progress' ? 'In Progress' : 'Coming Soon'}
                                    </div>
                                </div>
                                <h4>{item.label}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className='testimonials-section'>
                    <div className='section-label'><MessageSquare size={14} />Community</div>
                    <h2>What gamers are saying</h2>
                    <div className='testimonials-grid'>
                        {testimonials.map((t, i) => (
                            <Link to={t.link} target='_blank' key={i} className='testimonial-card'>
                                <div className='testimonial-stars'>
                                    {Array.from({ length: t.rating }).map((_, s) => (
                                        <Star key={s} size={13} fill="currentColor" />
                                    ))}
                                </div>
                                <p>"{t.text}"</p>
                                <div className='testimonial-author'>
                                    <div className='testimonial-avatar'>
                                        <img src={t.photo}/>
                                    </div>
                                    <div>
                                        <strong>{t.name}</strong>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className='cta-section'>
                    <div className='cta-glow' />
                    <div className='cta-content'>
                        <div className='section-label'><Award size={14} />Get started</div>
                        <h2>Your games.<br />Your rules.</h2>
                        <p>Join the community that's building the future of game distribution — open, free, and yours.</p>
                        <div className='cta-btns'>
                            <Link to='/login?view=register' className='btn-primary btn-xl'><Download size={18} />Create free account</Link>
                            <Link to='https://github.com/leoosilvp/Snakr' className='btn-ghost btn-xl'><Github size={18} />View source</Link>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
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

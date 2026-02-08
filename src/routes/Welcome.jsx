import '../css/welcome.css'
import icon from "../assets/svg/logo.svg"
import news from '../assets/img/interface.png'
import { Link } from 'react-router-dom'
import { Github, GitPullRequest, StopCircle, Terminal } from '@geist-ui/icons'
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
                    <h1>The definitive game launcher for all your gaming needs</h1>
                    <p>Snakr is a game launcher that allows you to download, play, track your stats and manage your games all in one place.</p>
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
            </section>
        </main>
    )
}

export default Welcome

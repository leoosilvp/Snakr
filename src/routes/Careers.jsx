import '../css/careers.css'
import logo from '../assets/svg/logo2.svg'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from '@geist-ui/icons';

const Careers = () => {

    const { user } = useUser();
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeCard, setActiveCard] = useState(null)

    const isLogged = Boolean(user)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 64)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <main className='careers-main'>

            <div className='careers-bg'>
                <div className='careers-grid'></div>
                <div className='careers-glow'></div>
                <div className='careers-noise'></div>
            </div>

            <header className={`careers-main-header ${isScrolled && 'scrolled'}`}>
                <div className='careers-main-header-content'>
                    <section className='careers-header-left'>
                        <img src={logo} />
                        <nav>
                            <Link to='/home'>Home</Link>
                            <Link to='/docs'>Docs</Link>
                            <Link to='/one'>ONE</Link>
                            <Link to='/contribute'>Contribute</Link>
                        </nav>
                    </section>
                    <section className='careers-header-right'>
                        <Link to='/welcome'>Welcome</Link>
                        {isLogged ? (
                            <button onClick={() => window.location.href = '/profile'}>
                                <img src={user?.profile?.photo} />
                            </button>
                        ) : (
                            <Link to='/login'>Login</Link>
                        )}
                    </section>
                </div>
            </header>

            <section className='careers-content-main'>
                <section className='careers-content-introduction'>
                    <h1>Join the Team<br />Building What Comes Next.</h1>
                    <Link to='#positions'>Open Positions</Link>
                </section>

                <section id='positions' className='careers-content-positions'>
                    <header className='careers-content-positions-header'>
                        <h1>Open Positions at Snakr</h1>
                    </header>

                    <section className='careers-positions-ctn'>

                        <aside className='careers-positions-aside'>

                            <div
                                className={`careers-positions-aside-card ${activeCard === 'about1' ? 'active' : ''}`}
                                onClick={() => setActiveCard(activeCard === 'about1' ? null : 'about1')}
                            >
                                <h1>
                                    About positions in Snakr
                                    {activeCard === 'about1'
                                        ? <ChevronUp size={22} />
                                        : <ChevronDown size={22} />
                                    }
                                </h1>

                                <section>
                                    The Snakr positions are opportunities to participate in an open-source project, meaning they are intended for people who want to contribute to the platform’s development on a voluntary basis. Open-source projects make their code publicly available, allowing anyone to study, modify, and contribute improvements to the system.
                                    <br /><br />
                                    Unlike traditional job positions, these roles do not offer financial compensation, since the main goal is community collaboration and the growth of the project. In this model, developers, designers, and other contributors share their time and knowledge to help improve the software, learn new technologies, and gain practical experience working on real projects.
                                    <br /><br />
                                    Participating in an open-source project offers several benefits, such as developing technical skills, gaining experience in collaborative work, and building a strong portfolio. Additionally, contributions are publicly recorded, which can help demonstrate experience and engagement in the technology field.
                                    <br /><br />
                                    Therefore, the opportunities at Snakr are designed for individuals interested in technology who want to actively participate in building the platform, contributing ideas, code, and improvements while growing professionally in a collaborative environment.
                                </section>
                            </div>

                            <div
                                className={`careers-positions-aside-card ${activeCard === 'about2' ? 'active' : ''}`}
                                onClick={() => setActiveCard(activeCard === 'about2' ? null : 'about2')}
                            >
                                <h1>
                                    Requirements
                                    {activeCard === 'about2'
                                        ? <ChevronUp size={22} />
                                        : <ChevronDown size={22} />
                                    }
                                </h1>

                                <section>
                                    To contribute to Snakr, participants should have a basic understanding of software development and the technologies used in the project. Familiarity with tools like Git, pull requests, and issue tracking is recommended.
                                    <br /><br />
                                    Contributors are expected to communicate clearly, collaborate with others, and follow the project’s coding standards. A willingness to learn, accept feedback, and help improve the project is essential.
                                </section>
                            </div>

                        </aside>

                        <section className='careers-positions-grid'>
                            <article className='careers-positions'>
                                <div>
                                    <h1>Database architect</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>Back-end developer, Node.js</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>Software engineer</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>Data Engineer</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>DevOps Engineer</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>Data scientist</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>Cybersecurity specialist</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>UI/UX specialist</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                            <article className='careers-positions'>
                                <div>
                                    <h1>Integration specialist</h1>
                                    <h2>Brazil, remote</h2>
                                </div>
                                <Link to='https://github.com/leoosilvp/Snakr' target='_blank'>Read more</Link>
                            </article>

                        </section>

                    </section>
                </section>
            </section>

            <Footer bg='linear-gradient(0deg, #000, #00000000)' ln='none' />
        </main>
    )
}

export default Careers
import { useEffect, useState } from 'react'
import { socialService } from '../services/social.service'
import '../css/friends.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Mail, Search, User, UserMinus, UserPlus } from '@geist-ui/icons'
import { NavLink } from 'react-router-dom'

export default function Friends() {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        socialService.listFriends().then(setFriends)
    }, [])

    return (
        <main className='friends-main'>
            <Header />
            <section className='friends-main-content'>
                <section className='friends-main-me'>
                    <img src="data:image/jpeg;base64,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" alt="" />
                    <h1>leoosilvp</h1>
                </section>
                <section className='friends-ctn'>
                    <aside className='friends-main-aside'>
                        <h1>Friends</h1>
                        <ul>
                            <NavLink to='/friends'><span><User size={16} /> Friends</span> 1</NavLink>
                            <NavLink to='/friends/add-friends'><span><UserPlus size={16} /> Add friends</span></NavLink>
                            <NavLink to='/friends/invites'><span><Mail size={16} /> Pending invites</span> 0</NavLink>
                        </ul>
                    </aside>
                    <section className='friends-content'>
                        <header className='friends-main-header'>
                            <section className='friends-main-header-title'>
                                <h1>My friends</h1>
                                <div />
                            </section>
                            <section className='friends-main-header-search'>
                                <div>
                                    <Search size={20} color='#c3c3c3' />
                                    <input type="text" placeholder='Search for friends by username.' />
                                </div>
                            </section>
                        </header>

                        <header className='friends-header-status'>
                            <h1>PLAYING</h1>
                        </header>
                        <section className='friends-grid'>

                            {friends.map(friend => {
                                const user = friend.users

                                return (
                                    <article key={friend.id} className="friend-card playing">
                                        <section className='friend-img'>
                                            <img src={user.profile.photo} />
                                        </section>
                                        <div />
                                        <section className='friend-card-content playing'>
                                            <h1>{user.profile.username}</h1>
                                            <h2>GTA IV</h2>
                                        </section>
                                        <section className='friend-remove-btn' title='remove friend'>
                                            <UserMinus size={16} color='#db3939' onClick='' />
                                        </section>
                                    </article>
                                )
                            })}
                        </section>

                        <header className='friends-header-status'>
                            <h1>ONLINE</h1>
                        </header>
                        <section className='friends-grid'>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>

                            <article className="friend-card online">
                                <section className='friend-img'>
                                    <img src='data:image/jpeg;base64,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' />
                                </section>
                                <div />
                                <section className='friend-card-content online'>
                                    <h1>tozin_binladen</h1>
                                </section>
                            </article>
                        </section>

                        <header className='friends-header-status'>
                            <h1>OFFLINE</h1>
                        </header>
                        <section className='friends-grid'>

                            {friends.map(friend => {
                                const user = friend.users

                                return (
                                    <article key={friend.id} className="friend-card">
                                        <section className='friend-img'>
                                            <img src={user.profile.photo} />
                                        </section>
                                        <div />
                                        <section className='friend-card-content'>
                                            <h1>{user.profile.username}</h1>
                                            <h2></h2>
                                        </section>
                                    </article>
                                )
                            })}
                        </section>
                    </section>
                </section>
            </section>
            <Footer />
        </main>
    )
}

import '../css/friends.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Mail, User, UserPlus } from '@geist-ui/icons'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Friends() {

    return (
        <main className='friends-main'>
            <Header />
            <section className='friends-main-content'>
                <section className='friends-main-me'>
                    <img src="data:image/jpeg;base64,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" alt="" />
                    <Link to='/profile'>leoosilvp</Link>
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
                        <Outlet />
                    </section>
                </section>
            </section>
            <Footer />
        </main>
    )
}

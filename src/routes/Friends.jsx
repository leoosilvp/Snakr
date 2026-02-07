import '../css/friends.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Mail, User, UserPlus } from '@geist-ui/icons'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useEffect, useState } from 'react'
import { socialService } from '../services/social.service'

export default function Friends() {
    const { user } = useUser()
    const [friendsCount, setFriendsCount] = useState(0)
    const [pendingCount, setPendingCount] = useState(0)

    useEffect(() => {
        if (!user?.id) return

        let mounted = true

        async function loadFriendsCount() {
            try {
                const friends = await socialService.listFriends({ myUserId: user.id })
                if (!mounted) return

                const accepted = friends.filter(f => f.status === 'accepted')
                setFriendsCount(accepted.length)

                const pending = friends.filter(
                    f => f.status === 'pending' && f.addressee_id === user.id
                )
                setPendingCount(pending.length)
            } catch (err) {
                console.error('Failed to load friends count', err)
            }
        }

        loadFriendsCount()

        return () => {
            mounted = false
        }
    }, [user?.id])

    return (
        <main className='friends-main'>
            <Header />
            <section className='friends-main-content'>
                <section className='friends-main-me'>
                    <img src={user?.profile?.photo || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} />
                    <Link to='/profile'>{user?.profile?.username}</Link>
                </section>

                <section className='friends-ctn'>
                    <aside className='friends-main-aside'>
                        <h1>Friends</h1>
                        <ul>
                            <NavLink to='my-friends'><span><User size={16} /> Friends</span> {friendsCount}</NavLink>
                            <NavLink to='add-friends'><span><UserPlus size={16} /> Add friends</span></NavLink>
                            <NavLink to='invitations'><span><Mail size={16} /> Pending invites</span> {pendingCount}</NavLink>
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

import { useEffect, useMemo, useState } from 'react'
import { socialService } from '../../services/social.service'
import { Search, UserMinus } from '@geist-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'

const MyFriends = () => {
    const [friends, setFriends] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const { user } = useUser()
    const myUserId = user?.id

    useEffect(() => {
        if (!myUserId) return
        async function fetchFriends() {
            try {
                const data = await socialService.listFriends({ force: true, myUserId })
                setFriends(data)
            } catch (err) {
                console.error('Failed to fetch friends', err)
            }
        }
        fetchFriends()
    }, [myUserId])

    const normalizedFriends = useMemo(() => {
        if (!myUserId) return []

        return friends
            .map(friend => {
                const user =
                    friend.requester_id === myUserId
                        ? friend.addressee
                        : friend.addressee_id === myUserId
                            ? friend.requester
                            : null

                if (!user) return null

                const statusObj = user.status || {}
                const status =
                    statusObj.status === 'playing'
                        ? 'playing'
                        : statusObj.status === 'online'
                            ? 'online'
                            : 'offline'

                return {
                    ...friend,
                    users: user,
                    _status: status,
                    _playing: status === 'playing' ? statusObj.playing : null,
                }
            })
            .filter(Boolean)
    }, [friends, myUserId])

    const filteredFriends = useMemo(() => {
        const q = search.toLowerCase()
        return normalizedFriends.filter(
            f => f.users?.profile?.username?.toLowerCase().includes(q)
        )
    }, [normalizedFriends, search])

    const playing = filteredFriends.filter(f => f._status === 'playing')
    const online = filteredFriends.filter(f => f._status === 'online')
    const offline = filteredFriends.filter(f => f._status === 'offline')

    function goToProfile(username) {
        if (!username) return
        navigate(`/${username}`)
    }

    async function removeFriend(friendId) {
        try {
            await socialService.removeFriend(friendId)
            setFriends(prev => prev.filter(f => f.id !== friendId))
        } catch (err) {
            console.error('Failed to remove friend', err)
        }
    }

    function FriendCard({ friend, variant }) {
        const user = friend.users
        if (!user || !user.profile) return null

        return (
            <article
                className={`friend-card ${variant}`}
                onClick={() => goToProfile(user.profile.username)}
                style={{ cursor: 'pointer' }}
            >
                <section className='friend-img'>
                    <img
                        src={user.profile.photo || null}
                        alt={user.profile.username || 'Unknown'}
                    />
                </section>

                <div />

                <section className={`friend-card-content ${variant}`}>
                    <h1>{user.profile.username || 'Unknown'}</h1>
                    <h2>{friend._playing || ''}</h2>
                </section>

                <section
                    className='friend-remove-btn'
                    title='remove friend'
                    onClick={e => {
                        e.stopPropagation()
                        removeFriend(friend.id)
                    }}
                >
                    <UserMinus size={16} color='#db3939' />
                </section>
            </article>
        )
    }

    return (
        <>
            {/* HEADER */}
            <header className='friends-main-header'>
                <section className='friends-main-header-title'>
                    <h1>My friends</h1>
                    <div />
                </section>

                <section className='friends-main-header-search'>
                    <div>
                        <Search size={20} color='#c3c3c3' />
                        <input
                            type='text'
                            placeholder='Search for friends by username.'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </section>
            </header>

            {/* PLAYING */}
            <header className='friends-header-status'>
                <h1>PLAYING</h1>
            </header>
            <section className='friends-grid'>
                {playing.length === 0 && <p className='friends-empty'>No friends Playing</p>}
                {playing.map(friend => (
                    <FriendCard key={friend.id} friend={friend} variant='playing' />
                ))}
            </section>

            {/* ONLINE */}
            <header className='friends-header-status'>
                <h1>ONLINE</h1>
            </header>
            <section className='friends-grid'>
                {online.length === 0 && <p className='friends-empty'>No friends online</p>}
                {online.map(friend => (
                    <FriendCard key={friend.id} friend={friend} variant='online' />
                ))}
            </section>

            {/* OFFLINE */}
            <header className='friends-header-status'>
                <h1>OFFLINE</h1>
            </header>
            <section className='friends-grid'>
                {offline.length === 0 && <p className='friends-empty'>No friends...</p>}
                {offline.map(friend => (
                    <FriendCard key={friend.id} friend={friend} variant='' />
                ))}
            </section>
        </>
    )
}

export default MyFriends

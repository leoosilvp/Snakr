import { useEffect, useState, useCallback } from 'react'
import { socialService } from '../../services/social.service'
import { Frown, Check, X } from '@geist-ui/icons'
import { useUser } from '../../hooks/useUser'
import { Link } from 'react-router-dom'

const Invitation = () => {
    const [received, setReceived] = useState([])
    const [sent, setSent] = useState([])
    const [loading, setLoading] = useState(true)

    const { user } = useUser()
    const myUserId = user?.id

    function resolveUser(inv) {
        if (inv.users) return inv.users

        if (inv.requester_id === myUserId) return inv.addressee || null
        if (inv.addressee_id === myUserId) return inv.requester || null

        return null
    }

    useEffect(() => {
        if (!myUserId) return
        if (typeof socialService.getCachedFriends !== 'function') return

        const cached = socialService.getCachedFriends()
        if (!cached) return

        const receivedRequests = cached.filter(
            f => f.direction === 'received' && f.status === 'pending'
        )

        const sentRequests = cached.filter(
            f => f.direction === 'sent' && f.status === 'pending'
        )

        setReceived(receivedRequests)
        setSent(sentRequests)
        setLoading(false)
    }, [myUserId])

    const loadInvitations = useCallback(async () => {
        if (!myUserId) return

        try {
            const friends = await socialService.listFriends({
                myUserId,
                force: false,
            })

            const receivedRequests = friends.filter(
                f => f.direction === 'received' && f.status === 'pending'
            )

            const sentRequests = friends.filter(
                f => f.direction === 'sent' && f.status === 'pending'
            )

            setReceived(receivedRequests)
            setSent(sentRequests)
        } catch (err) {
            console.error('Failed to load invitations:', err)
        } finally {
            setLoading(false)
        }
    }, [myUserId])

    useEffect(() => {
        loadInvitations()
    }, [loadInvitations])

    const handleAccept = async requestId => {
        try {
            await socialService.acceptFriendRequest(requestId)
            socialService.invalidateFriendsCache()
            loadInvitations()
        } catch (err) {
            console.error('Failed to accept invitation:', err)
        }
    }

    const handleRemove = async friendId => {
        try {
            await socialService.removeFriend(friendId)
            socialService.invalidateFriendsCache()
            loadInvitations()
        } catch (err) {
            console.error('Failed to remove invitation:', err)
        }
    }

    if (loading) {
        return (
            <div className="invitations-main">
                <section className="invitations-sec">
                    <header className="invitations-sec-header">
                        <h1>Invitations received</h1>
                    </header>
                    <section className="invitations">
                        <div className="no-invitations">
                            <Frown />
                            <p>We're sorry, there are no pending friend requests.</p>
                        </div>
                    </section>
                </section>

                <section className="invitations-sec">
                    <header className="invitations-sec-header">
                        <h1>Invitations sent</h1>
                    </header>
                    <section className="invitations" />
                </section>
            </div>
        )
    }

    return (
        <div className="invitations-main">
            <section className="invitations-sec">
                <header className="invitations-sec-header">
                    <h1>Invitations received</h1>
                    {received.length > 0 && (
                        <button onClick={() => received.forEach(r => handleRemove(r.id))}>
                            Reject all
                        </button>
                    )}
                </header>

                <section className="invitations">
                    {received.length === 0 ? (
                        <div className="no-invitations">
                            <Frown />
                            <p>We're sorry, there are no pending friend requests.</p>
                        </div>
                    ) : (
                        received.map(inv => {
                            const u = resolveUser(inv)
                            if (!u || !u.profile) return null

                            return (
                                <Link key={inv.id} className="invitations-card">
                                    <div>
                                        <img
                                            src={
                                                u.profile.photo ||
                                                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                                            }
                                            alt={u.profile.username}
                                        />
                                        <h1>{u.profile.username}</h1>
                                    </div>

                                    <section className="invitations-card-btns">
                                        <button onClick={() => handleAccept(inv.id)}>
                                            <Check size={16} />
                                        </button>
                                        <button
                                            className="recuse"
                                            onClick={() => handleRemove(inv.id)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </section>
                                </Link>
                            )
                        })
                    )}
                </section>
            </section>

            <section className="invitations-sec">
                <header className="invitations-sec-header">
                    <h1>Invitations sent</h1>
                </header>

                <section className="invitations">
                    {sent.map(inv => {
                        const u = resolveUser(inv)
                        if (!u || !u.profile) return null

                        return (
                            <Link key={inv.id} className="invitations-card">
                                <div>
                                    <img
                                        src={
                                            u.profile.photo ||
                                            'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                                        }
                                        alt={u.profile.username}
                                    />
                                    <h1>{u.profile.username}</h1>
                                </div>

                                <section className="invitations-card-btns">
                                    <button
                                        className="recuse"
                                        onClick={() => handleRemove(inv.id)}
                                    >
                                        <X size={16} />
                                    </button>
                                </section>
                            </Link>
                        )
                    })}
                </section>
            </section>
        </div>
    )
}

export default Invitation
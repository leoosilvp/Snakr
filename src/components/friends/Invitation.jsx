import { useEffect, useState, useCallback } from "react"
import { socialService } from '../../services/social.service'
import { Frown, Check, X } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"

const Invitation = () => {
    const [received, setReceived] = useState([])
    const [sent, setSent] = useState([])
    const [loading, setLoading] = useState(true)

    const { user } = useUser();
    const myUserId = user?.id

    // Carrega todos os convites
    const loadInvitations = useCallback(async () => {
        setLoading(true)
        try {
            const friends = await socialService.listFriends({ myUserId, force: true })

            // Convites recebidos
            const receivedRequests = friends.filter(
                f => f.direction === "received" && f.status === "pending"
            )

            // Convites enviados
            const sentRequests = friends.filter(
                f => f.direction === "sent" && f.status === "pending"
            )

            setReceived(receivedRequests)
            setSent(sentRequests)
        } catch (err) {
            console.error("Failed to load invitations:", err)
        } finally {
            setLoading(false)
        }
    }, [myUserId])

    // Atualiza quando monta ou muda myUserId
    useEffect(() => {
        loadInvitations()
    }, [loadInvitations])

    // Aceita pedido de amizade
    const handleAccept = async (requestId) => {
        try {
            await socialService.acceptFriendRequest(requestId)
            await loadInvitations()
        } catch (err) {
            console.error("Failed to accept invitation:", err)
        }
    }

    // Recusa pedido ou remove enviado
    const handleRemove = async (friendId) => {
        try {
            await socialService.removeFriend(friendId)
            await loadInvitations()
        } catch (err) {
            console.error("Failed to remove invitation:", err)
        }
    }

    if (loading) return (
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

    return (
        <div className="invitations-main">
            {/* Convites recebidos */}
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
                        received.map(inv => (
                            <article key={inv.id} className="invitations-card">
                                <div>
                                    <img
                                        src={inv.users.profile?.photo || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                                        alt={inv.users.profile?.username || "Unknown"}
                                    />
                                    <h1>{inv.users.profile?.username || "Unknown"}</h1>
                                </div>
                                <section className="invitations-card-btns">
                                    <button onClick={() => handleAccept(inv.id)}>
                                        <Check size={16} />
                                    </button>
                                    <button className="recuse" onClick={() => handleRemove(inv.id)}>
                                        <X size={16} />
                                    </button>
                                </section>
                            </article>
                        ))
                    )}
                </section>
            </section>

            {/* Convites enviados */}
            <section className="invitations-sec">
                <header className="invitations-sec-header">
                    <h1>Invitations sent</h1>
                </header>
                <section className="invitations">
                    {
                        sent.map(inv => (
                            <article key={inv.id} className="invitations-card">
                                <div>
                                    <img
                                        src={inv.users.profile?.photo || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                                        alt={inv.users.profile?.username || "Unknown"}
                                    />
                                    <h1>{inv.users.profile?.username || "Unknown"}</h1>
                                </div>
                                <section className="invitations-card-btns">
                                    <button className="recuse" onClick={() => handleRemove(inv.id)}>
                                        <X size={16} />
                                    </button>
                                </section>
                            </article>
                        ))
                    }
                </section>
            </section>
        </div>
    )
}

export default Invitation
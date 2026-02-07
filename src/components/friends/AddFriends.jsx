import { Check, Copy, UserPlus } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"
import { useState, useEffect, useRef } from "react"
import { socialService } from "../../services/social.service"

const AddFriends = () => {
    const { user } = useUser()
    const [copied, setCopied] = useState(false)
    const [searchUsername, setSearchUsername] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [sendingRequest, setSendingRequest] = useState(false)
    const modalRef = useRef(null)

    function removeQuotes(str) {
        if (!str || typeof str !== "string") return str
        return str.replace(/^["']|["']$/g, "").trim()
    }

    const FriendCode = removeQuotes(user?.friend_code)

    function hasRelationshipWith(userId) {
        const cached = socialService.getCachedFriends?.()
        if (!cached || !userId) return false
        return cached.some(f =>
            (f.requester_id === userId || f.addressee_id === userId) &&
            (f.status === "accepted" || f.status === "pending")
        )
    }

    const copyFriendCode = async () => {
        if (!FriendCode) return
        await navigator.clipboard.writeText(FriendCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }

    const sendRequestByCode = async code => {
        if (!code) return
        code = code.replace(/^["']|["']$/g, "").trim()
        if (!code) return alert("Friend code is required")
        if (code === FriendCode) return alert("You can't send a friend request to yourself")

        setSendingRequest(true)
        try {
            await socialService.sendFriendRequest(code, null)
            alert("Friend request sent!")
            socialService.invalidateFriendsCache()
        } catch (err) {
            alert(err.message || "Failed to send friend request")
        } finally {
            setSendingRequest(false)
        }
    }

    const sendRequestByUsername = async username => {
        if (!username) return
        if (username.toLowerCase() === user.profile?.username?.toLowerCase()) {
            alert("You can't send a friend request to yourself")
            return
        }

        const targetUser = searchResults.find(u => u.profile?.username === username)
        if (targetUser && hasRelationshipWith(targetUser.id)) {
            alert("You already have a relationship with this user")
            return
        }

        setSendingRequest(true)
        try {
            await socialService.sendFriendRequest(null, username)
            alert("Friend request sent!")
            socialService.invalidateFriendsCache()
        } catch (err) {
            alert(err.message || "Failed to send friend request")
        } finally {
            setSendingRequest(false)
        }
    }

    useEffect(() => {
        if (!searchUsername) {
            setSearchResults([])
            setModalOpen(false)
            return
        }

        const timeout = setTimeout(async () => {
            try {
                const users = await socialService.listUsers()
                const results = users
                    .filter(
                        u =>
                            u.id !== user.id &&
                            u.profile?.username?.toLowerCase().includes(searchUsername.toLowerCase())
                    )
                    .slice(0, 5)

                setSearchResults(results)
                setModalOpen(results.length > 0)
            } catch (err) {
                console.error("Failed to search users", err)
            }
        }, 10)

        return () => clearTimeout(timeout)
    }, [searchUsername, user?.id])

    useEffect(() => {
        const handler = e => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setModalOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <main className="add-friends-main">
            <header className="add-friends-main-header">
                <h1>Add friend</h1>
            </header>

            <section className="add-friend-content">
                <section className="add-friend-bycode">
                    <h1>A unique 8-digit code used to add friends.</h1>

                    <div className="friend-code">
                        <h2>{FriendCode || "N/A"}</h2>
                        <button onClick={copyFriendCode}>
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>

                    <h1>Enter the friend code of the person you want to add.</h1>
                    <input
                        type="text"
                        placeholder="código do amigo"
                        onKeyDown={async e => {
                            if (e.key === "Enter" && e.target.value) {
                                await sendRequestByCode(e.target.value)
                                e.target.value = ""
                            }
                        }}
                    />
                </section>

                <section className="add-friend-byusername">
                    <h1>Enter a friend's username to send an invitation.</h1>
                    <input
                        type="text"
                        placeholder="username"
                        value={searchUsername}
                        onChange={e => setSearchUsername(e.target.value)}
                    />

                    {modalOpen && (
                        <section ref={modalRef} className="add-friend-list">
                            {searchResults.map(u => (
                                <div key={u.id} className="add-friend-card">
                                    <div>
                                        <img src={u.profile?.photo || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" } alt={u.profile?.username || "Unknown"} />
                                        <h1>{u.profile?.username || "Unknown"}</h1>
                                    </div>
                                    <button
                                        disabled={sendingRequest}
                                        onClick={() => sendRequestByUsername(u.profile?.username)}
                                    >
                                        <UserPlus size={16} />
                                    </button>
                                </div>
                            ))}
                        </section>
                    )}

                    <p>
                        By adding friends on Snakr, you can keep track of shared profiles, games,
                        achievements, and activities. Friends can view shared information,
                        interact with you, and receive notifications about news and updates.
                        Friend requests must be accepted for a connection to be established.
                        You can manage your friends and interference at any time in your account
                        settings.
                    </p>
                </section>
            </section>
        </main>
    )
}

export default AddFriends

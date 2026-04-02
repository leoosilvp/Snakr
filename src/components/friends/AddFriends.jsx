import { Check, Copy, Loader, Search, UserPlus, X } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"
import { useState, useEffect, useRef, useCallback } from "react"
import { socialService } from "../../services/social.service"
import { Link } from "react-router-dom"

const DEFAULT_AVATAR = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"

const AddFriends = () => {
    const { user } = useUser()
    const [copied, setCopied] = useState(false)

    const [searchUsername, setSearchUsername] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchLoading, setSearchLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const modalRef = useRef(null)

    const [friendCodeInput, setFriendCodeInput] = useState("")
    const [codePreview, setCodePreview] = useState(null)
    const [codeLoading, setCodeLoading] = useState(false)
    const [codeError, setCodeError] = useState(null)
    const [codeModalOpen, setCodeModalOpen] = useState(false)
    const codeModalRef = useRef(null)

    const [sendingRequest, setSendingRequest] = useState({})

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

    const lookupFriendCode = useCallback(async (code) => {
        code = removeQuotes(code)
        if (!code || code.length < 6) {
            setCodePreview(null)
            setCodeError(null)
            setCodeModalOpen(false)
            return
        }
        if (code === FriendCode) {
            setCodeError("That's your own friend code.")
            setCodePreview(null)
            setCodeModalOpen(true)
            return
        }

        setCodeLoading(true)
        setCodeError(null)

        try {
            const result = await socialService.getUserByFriendCode(code)
            setCodePreview(result)
            setCodeModalOpen(true)
        } catch {
            setCodePreview(null)
            setCodeError("No user found with this friend code.")
            setCodeModalOpen(true)
        } finally {
            setCodeLoading(false)
        }
    }, [FriendCode])

    useEffect(() => {
        if (!friendCodeInput) {
            setCodePreview(null)
            setCodeError(null)
            setCodeModalOpen(false)
            return
        }
        const t = setTimeout(() => lookupFriendCode(friendCodeInput), 500)
        return () => clearTimeout(t)
    }, [friendCodeInput, lookupFriendCode])

    const sendRequestByCode = async () => {
        if (!codePreview) return
        const key = codePreview.id
        setSendingRequest(prev => ({ ...prev, [key]: true }))
        try {
            await socialService.sendFriendRequest(friendCodeInput, null)
            socialService.invalidateFriendsCache()
            setFriendCodeInput("")
            setCodePreview(null)
            setCodeModalOpen(false)
        } catch (err) {
            setCodeError(err.message || "Failed to send friend request")
        } finally {
            setSendingRequest(prev => ({ ...prev, [key]: false }))
        }
    }

    const sendRequestByUsername = async (username, userId) => {
        if (!username) return
        if (username.toLowerCase() === user.profile?.username?.toLowerCase()) return

        const targetUser = searchResults.find(u => u.profile?.username === username)
        if (targetUser && hasRelationshipWith(targetUser.id)) return

        setSendingRequest(prev => ({ ...prev, [userId]: true }))
        try {
            await socialService.sendFriendRequest(null, username)
            socialService.invalidateFriendsCache()
        } catch (err) {
            console.error(err.message || "Failed to send friend request")
        } finally {
            setSendingRequest(prev => ({ ...prev, [userId]: false }))
        }
    }

    useEffect(() => {
        if (!searchUsername) {
            setSearchResults([])
            setModalOpen(false)
            setSearchLoading(false)
            return
        }

        setSearchLoading(true)
        const timeout = setTimeout(async () => {
            try {
                const users = await socialService.listUsers()
                const results = users
                    .filter(u =>
                        u.id !== user.id &&
                        u.profile?.username?.toLowerCase().includes(searchUsername.toLowerCase())
                    )
                    .slice(0, 5)

                setSearchResults(results)
                setModalOpen(results.length > 0)
            } catch (err) {
                console.error("Failed to search users", err)
            } finally {
                setSearchLoading(false)
            }
        }, 350)

        return () => clearTimeout(timeout)
    }, [searchUsername, user?.id])

    useEffect(() => {
        const handler = e => {
            if (modalRef.current && !modalRef.current.contains(e.target)) setModalOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    useEffect(() => {
        const handler = e => {
            if (codeModalRef.current && !codeModalRef.current.contains(e.target)) setCodeModalOpen(false)
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

                    <div className="add-friend-input-wrapper" ref={codeModalRef}>
                        <div className="add-friend-input-row">
                            <input
                                type="text"
                                placeholder="friend code"
                                value={friendCodeInput}
                                onChange={e => setFriendCodeInput(e.target.value)}
                            />
                            <i>
                                {codeLoading && <Loader size={16} className="spinner" />}
                            </i>
                        </div>

                        {codeModalOpen && (
                            <section ref={codeModalRef} className="add-friend-list">
                                {codeError && (
                                    <p className="add-friend-code-error">{codeError}</p>
                                )}
                                {codePreview && (
                                    <Link to={`/user/${codePreview.profile?.username}`} className="add-friend-card">
                                        <div>
                                            <div>
                                                <img src={codePreview.profile?.photo || DEFAULT_AVATAR} alt={codePreview.profile?.username || "Unknown"} />
                                            </div>
                                            <h1>{codePreview.profile?.username || "Unknown"}</h1>
                                        </div>
                                        <button
                                            disabled={sendingRequest[codePreview.id] || hasRelationshipWith(codePreview.id)}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                sendRequestByCode()
                                            }}
                                        >
                                            {hasRelationshipWith(codePreview.id)
                                                ? <Check size={16} />
                                                : sendingRequest[codePreview.id]
                                                    ? <Loader size={16} />
                                                    : <UserPlus size={16} />
                                            }
                                        </button>
                                    </Link>
                                )}
                            </section>
                        )}
                    </div>
                </section>

                <section className="add-friend-byusername">
                    <h1>Enter a friend's username to send an invitation.</h1>

                    <div className="add-friend-input-wrapper" ref={modalRef}>
                        <div className="add-friend-input-row">
                            <input
                                type="text"
                                placeholder="username"
                                value={searchUsername}
                                onChange={e => setSearchUsername(e.target.value)}
                            />
                            <i>
                                {searchLoading && <Loader size={16} className="spinner" />}
                            </i>
                        </div>

                        {modalOpen && (

                            <section ref={modalRef} className="add-friend-list">
                                {searchResults.map(u => (
                                    <Link to={`/user/${u.profile?.username}`} key={u.id} className="add-friend-card">
                                        <div>
                                            <div>
                                                <img src={u.profile?.photo || DEFAULT_AVATAR} alt={u.profile?.username || "Unknown"} />
                                            </div>
                                            <h1>{u.profile?.username || "Unknown"}</h1>
                                        </div>
                                        <button
                                            disabled={sendingRequest[u.id] || hasRelationshipWith(u.id)}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                sendRequestByUsername(u.profile?.username, u.id)
                                            }}
                                        >
                                            {hasRelationshipWith(u.id)
                                                ? <Check size={16} />
                                                : sendingRequest[u.id]
                                                    ? <Loader size={16} />
                                                    : <UserPlus size={16} />
                                            }
                                        </button>
                                    </Link>
                                ))}
                            </section>
                        )}
                    </div>

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
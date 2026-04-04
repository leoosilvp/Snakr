import { Check, Copy, Loader, Mail, UserPlus } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"
import { useState, useEffect, useRef, useCallback } from "react"
import { socialService } from "../../services/social.service"
import { Link } from "react-router-dom"
import AlertModal from "../../components/AlertModal"

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
    const [localPending, setLocalPending] = useState({})

    const [alert, setAlert] = useState(null)

    const showAlert = (icon, title) => {
        setAlert({ icon, title })
        setTimeout(() => setAlert(null), 4000)
    }

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
            f.status === "accepted"
        )
    }

    function hasPendingRequestTo(userId) {
        if (localPending[userId]) return true
        const cached = socialService.getCachedFriends?.()
        if (!cached || !userId) return false
        return cached.some(f =>
            (f.requester_id === userId || f.addressee_id === userId) &&
            f.status === "pending"
        )
    }

    function getIcon(userId) {
        if (sendingRequest[userId]) return <Loader size={16} className="spinner" />
        if (hasRelationshipWith(userId)) return <Check size={16} />
        if (hasPendingRequestTo(userId)) return <Mail size={16} />
        return <UserPlus size={16} />
    }

    function isDisabled(userId) {
        return (
            sendingRequest[userId] ||
            hasRelationshipWith(userId) ||
            hasPendingRequestTo(userId)
        )
    }

    const copyFriendCode = async () => {
        if (!FriendCode) return
        await navigator.clipboard.writeText(FriendCode)
        setCopied(true)
        showAlert("CheckCircle", "Friend code copied!")
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
            showAlert("AlertTriangle", "You can't add yourself")
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
            showAlert("Info", "User not found")
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
        const userId = codePreview.id
        setSendingRequest(prev => ({ ...prev, [userId]: true }))
        try {
            await socialService.sendFriendRequest(friendCodeInput, null)

            setLocalPending(prev => ({ ...prev, [userId]: true }))
            socialService.invalidateFriendsCache()
            socialService.listFriends({ myUserId: user?.id, force: true }).catch(() => { })

            showAlert("CheckCircle", "Friend request sent successfully")

            setFriendCodeInput("")
            setCodePreview(null)
            setCodeModalOpen(false)
        } catch (err) {
            const msg = err.message || "Failed to send friend request"
            setCodeError(msg)
            showAlert("AlertTriangle", msg)
        } finally {
            setSendingRequest(prev => ({ ...prev, [userId]: false }))
        }
    }

    const sendRequestByUsername = async (username, userId) => {
        if (!username) return
        if (username.toLowerCase() === user.profile?.username?.toLowerCase()) return
        if (hasRelationshipWith(userId) || hasPendingRequestTo(userId)) return

        setSendingRequest(prev => ({ ...prev, [userId]: true }))
        try {
            await socialService.sendFriendRequest(null, username)

            setLocalPending(prev => ({ ...prev, [userId]: true }))
            socialService.invalidateFriendsCache()
            socialService.listFriends({ myUserId: user?.id, force: true }).catch(() => { })

            showAlert("CheckCircle", "Friend request sent successfully")
        } catch (err) {
            const msg = err.message || "Failed to send friend request"
            console.error(msg)
            showAlert("AlertTriangle", msg)
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
                showAlert("AlertTriangle", "Search failed")
            } finally {
                setSearchLoading(false)
            }
        }, 250)

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

            {alert && <AlertModal icon={alert.icon} title={alert.title} />}

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
                                            disabled={isDisabled(codePreview.id)}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                sendRequestByCode()
                                            }}
                                        >
                                            {getIcon(codePreview.id)}
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
                                            disabled={isDisabled(u.id)}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                sendRequestByUsername(u.profile?.username, u.id)
                                            }}
                                        >
                                            {getIcon(u.id)}
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
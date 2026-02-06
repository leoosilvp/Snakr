import { Check, Copy, UserPlus } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"
import { useState, useEffect } from "react"
import { socialService } from "../../services/social.service"

const AddFriends = () => {
    const { user } = useUser()
    const [copied, setCopied] = useState(false)
    const [searchUsername, setSearchUsername] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [sendingRequest, setSendingRequest] = useState(false)

    // Remove aspas de friend_code
    function removeQuotes(str) {
        if (!str || typeof str !== "string") return str
        return str.replace(/^["']|["']$/g, "").trim()
    }

    const FriendCode = removeQuotes(user?.friend_code)

    // Copiar friend code
    const copyFriendCode = async () => {
        if (!FriendCode) return
        await navigator.clipboard.writeText(FriendCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }

    // Enviar pedido por friend code
    const sendRequestByCode = async code => {
        if (!code) return
        code = code.replace(/^["']|["']$/g, "").trim()
        if (!code) {
            alert("Friend code is required")
            return
        }
        if (code === FriendCode) {
            alert("You can't send a friend request to yourself")
            return
        }

        setSendingRequest(true)
        try {
            await socialService.sendFriendRequest(code, null)
            alert("Friend request sent!")
        } catch (err) {
            alert(err.message || "Failed to send friend request")
        } finally {
            setSendingRequest(false)
        }
    }

    // Enviar pedido por username
    const sendRequestByUsername = async username => {
        if (!username) return
        if (username.toLowerCase() === user.profile?.username?.toLowerCase()) {
            alert("You can't send a friend request to yourself")
            return
        }

        setSendingRequest(true)
        try {
            await socialService.sendFriendRequest(null, username)
            alert("Friend request sent!")
        } catch (err) {
            alert(err.message || "Failed to send friend request")
        } finally {
            setSendingRequest(false)
        }
    }

    // Busca usuários ao digitar username
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
                    .filter(u => u.profile?.username?.toLowerCase().includes(searchUsername.toLowerCase()))
                    .slice(0, 5)
                setSearchResults(results)
                setModalOpen(results.length > 0)
            } catch (err) {
                console.error("Failed to search users", err)
            }
        }, 200)

        return () => clearTimeout(timeout)
    }, [searchUsername])

    return (
        <main className="add-friends-main">
            <header className="add-friends-main-header">
                <h1>Add friend</h1>
            </header>

            <section className="add-friend-content">
                {/* Adicionar por Friend Code */}
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

                {/* Adicionar por Username */}
                <section className="add-friend-byusername">
                    <h1>Enter a friend's username to send an invitation.</h1>
                    <input
                        type="text"
                        placeholder="username"
                        value={searchUsername}
                        onChange={e => setSearchUsername(e.target.value)}
                    />

                    {modalOpen && (
                        <section className="add-friend-list">
                            {searchResults.map(u => (
                                <div key={u.id} className="add-friend-card">
                                    <div>
                                        <img src={u.profile?.photo || null} alt={u.profile?.username || "Unknown"} />
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
                        By adding friends on Snakr, you can keep track of shared profiles, games, achievements, and activities.
                        Friends can view shared information, interact with you, and receive notifications about news and updates.
                        <br />
                        <br />
                        Friend requests must be accepted for a connection to be established. You can manage your friends and interference at any time in your account settings.
                    </p>
                </section>
            </section>
        </main>
    )
}

export default AddFriends

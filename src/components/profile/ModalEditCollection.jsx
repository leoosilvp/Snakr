import { Plus, X } from "@geist-ui/icons"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { useUser } from "../../hooks/useUser"
import { gamesService } from "../../services/games.service"
import SearchForCollection from "./SearchForCollection"

const SLOTS = 6

const ModalEditCollection = ({ open, onClose }) => {
    const { user } = useUser()
    const [slots, setSlots] = useState(Array(SLOTS).fill(null))
    const [activeSlot, setActiveSlot] = useState(null)
    const [saving, setSaving] = useState(false)
    const [originalGames, setOriginalGames] = useState([])

    useEffect(() => {
        if (!open || !user?.id) return
        async function loadHighlighted() {
            try {
                const data = await gamesService.userList({ userId: user.id })
                const list = Array.isArray(data) ? data : []
                setOriginalGames(list)

                const highlighted = list
                    .filter(item => item.status === 'highlight')
                    .slice(0, SLOTS)
                    .map(item => item.games ?? null)

                const initial = Array(SLOTS).fill(null)
                highlighted.forEach((game, i) => { initial[i] = game })
                setSlots(initial)
            } catch (err) {
                console.error('Failed to load highlighted games', err)
            }
        }

        loadHighlighted()
        setActiveSlot(null)
    }, [open, user?.id])

    const excludeIds = slots.filter(Boolean).map(g => g.id)

    const handleSelectGame = (item) => {
        const game = item.games ?? {}
        setSlots(prev => {
            const next = [...prev]
            next[activeSlot] = game
            return next
        })
        setActiveSlot(null)
    }

    const handleRemoveSlot = (e, index) => {
        e.stopPropagation()
        setSlots(prev => {
            const next = [...prev]
            next[index] = null
            return next
        })
    }

    const handleSave = async () => {
        if (saving) return
        setSaving(true)

        try {
            const filledIds = slots.filter(Boolean).map(g => g.id)

            await Promise.all(
                originalGames.map(item => {
                    const gameId = item.games?.id
                    const wasHighlight = item.status === 'highlight'
                    const willHighlight = filledIds.includes(gameId)

                    if (willHighlight && !wasHighlight)
                        return gamesService.updateUser({ game_id: gameId, status: 'highlight' })

                    if (!willHighlight && wasHighlight)
                        return gamesService.updateUser({ game_id: gameId, status: null })

                    return Promise.resolve()
                })
            )

            gamesService.clearCache()
            onClose()
        } catch (err) {
            console.error('Failed to save collection', err)
        } finally {
            setSaving(false)
        }
    }

    const handleCancel = () => {
        setActiveSlot(null)
        onClose()
    }

    if (!open) return null

    return createPortal(
        <main className="modal-edit-collection-main" onClick={handleCancel}>
            <article className="modal-edit-collection" onClick={e => e.stopPropagation()}>
                <header className="modal-edit-collection-header">
                    <h1>Edit Collection</h1>
                    <div>
                        <button onClick={handleCancel} disabled={saving}>Cancel</button>
                        <button className="active" onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </header>

                <section className="modal-edit-collection-content">
                    <h1>Some games fade away… and some stay with you. Keep the ones that remain with you here.</h1>
                    <p>You can highlight up to 6 games. To add a new one, remove one of the current ones.</p>

                    <div className="modal-edit-collection-grid">
                        {slots.map((game, index) => (
                            <article
                                key={index}
                                className={['modal-edit-collection-card', game ? 'filled' : ''].join(' ').trim()}
                                onClick={() => setActiveSlot(index)}
                                title={game ? game.name : 'Choose a game'}
                            >
                                {game ? (
                                    <>
                                        <img src={game.cover_image} alt={game.name} />
                                        <button className="modal-edit-collection-card-remove" onClick={(e) => handleRemoveSlot(e, index)} title="Remove" >
                                            <X size={12} />
                                        </button>
                                    </>
                                ) : (
                                    <Plus />
                                )}
                            </article>
                        ))}
                    </div>

                    <p className="active">The featured games are not in any fixed order — they are displayed randomly.</p>

                    {activeSlot === null ? '' : (
                        <SearchForCollection onSelect={handleSelectGame} onClose={() => setActiveSlot(null)} excludeIds={excludeIds} />
                    )}

                </section>
            </article>
        </main>,
        document.body
    )
}

export default ModalEditCollection
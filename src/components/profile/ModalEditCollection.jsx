import { Plus } from "@geist-ui/icons"
import { createPortal } from "react-dom"
import SearchForCollection from "./SearchForCollection"

const ModalEditCollection = ({ open, onClose }) => {
    if (!open) return null

    return createPortal(
        <main className="modal-edit-collection-main" onClick={onClose}>
            <article className="modal-edit-collection" onClick={e => e.stopPropagation()}>
                <header className="modal-edit-collection-header">
                    <h1>Edit Collection</h1>
                    <div>
                        <button onClick={onClose}>Cancel</button>
                        <button className="active">Save</button>
                    </div>
                </header>
                <section className="modal-edit-collection-content">
                    <h1>Some games fade away… and some stay with you. Keep the ones that remain with you here.</h1>
                    <p>You can highlight up to 6 games. To add a new one, remove one of the current ones.</p>
                    <p>The featured games are not in any fixed order — they are displayed randomly.</p>
                    <div className="modal-edit-collection-grid">
                        <article className="modal-edit-collection-card">
                            <Plus />
                        </article>

                        <article className="modal-edit-collection-card">
                            <Plus />
                        </article>

                        <article className="modal-edit-collection-card">
                            <Plus />
                        </article>

                        <article className="modal-edit-collection-card">
                            <Plus />
                        </article>

                        <article className="modal-edit-collection-card">
                            <Plus />
                        </article>

                        <article className="modal-edit-collection-card">
                            <Plus />
                        </article>
                    </div>
                </section>
                <SearchForCollection />
            </article>
        </main>,
        document.body
    )
}

export default ModalEditCollection
import { Plus } from "@geist-ui/icons"

const ModalEditCollection = () => {
    return (
        <main className="modal-edit-collection-main">
            <article className="modal-edit-collection">
                <header className="modal-edit-collection-header">
                    <h1>Edit Collection</h1>
                    <div>
                        <button>Cancel</button>
                        <button className="active">Save</button>
                    </div>
                </header>
                <section className="modal-edit-collection-content">
                    <h1>Some games fade away… and some stay with you. Keep the ones that remain with you here.</h1>
                    <p>You can highlight up to 6 games. To add a new one, remove one of the current ones.</p>
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
            </article>
        </main>
    )
}

export default ModalEditCollection

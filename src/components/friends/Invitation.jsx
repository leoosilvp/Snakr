import { Frown } from "@geist-ui/icons"

const Invitation = () => {
    return (
        <div className="invitations-main">
            <section className="invitations-sec">
                <header className="invitations-sec-header">
                    <h1>Invitations received</h1>
                    <button>Reject all</button>
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
                <section className="invitations">

                </section>
            </section>
        </div>
    )
}

export default Invitation

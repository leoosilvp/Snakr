import { Frown } from "@geist-ui/icons"

const RecentActivity = () => {
    return (
        <section className="profile-recent-activity">
            <header className="profile-recent-activity-header">
                <h1>Recent activity</h1>
                <h1>0 hours last week</h1>
            </header>
            <section className="profile-recent-activity-content">
                <span className="no-games-played-recently"><Frown size={30} /> No games played recently.</span>
            </section>
        </section>
    )
}

export default RecentActivity

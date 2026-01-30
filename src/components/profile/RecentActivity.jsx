import { Link } from "react-router-dom"

const RecentActivity = () => {
    return (
        <section className="profile-recent-activity">
            <header className="profile-recent-activity-header">
                <h1>My collection</h1>
                <h1>0 hours last week</h1>
            </header>
            <section className="profile-recent-activity-content">
                <span><i className="fa-regular fa-face-rolling-eyes"/> No games played recently.</span>
            </section>
        </section>
    )
}

export default RecentActivity

import '../../css/skeleton.css'
import HeaderSkeleton from '../../components/skeletons/HeaderSkeleton'

const ProfileSkeleton = () => {
    return (
        <main className="profile-main">
            <HeaderSkeleton />
            <article className="profile skeleton-profile-wrapper">

                <header className="profile-header-ctn">
                    <div className="profile-header">
                        <div className="skeleton-avatar-wrapper">
                            <div className="skeleton-avatar shimmer" />
                        </div>

                        <section className="profile-header-content">
                            <div>
                                <div className="skeleton-username shimmer" />
                                <div className="skeleton-bio shimmer" />
                            </div>
                        </section>
                    </div>

                    <div className="profile-header-aside">
                        <div className="skeleton-level shimmer" />
                        <div className="skeleton-buttons">
                            <div className="skeleton-btn shimmer" />
                            <div className="skeleton-btn shimmer" />
                        </div>
                    </div>
                </header>

                <section className="profile-content">

                    <div>
                        <section className="profile-collection">
                            <div className="profile-collection-header">
                                <div className="skeleton-title shimmer" />
                            </div>

                            <div className="profile-collection-content">
                                <div className="profile-statistics-in-collection">
                                    <div>
                                        <div className="skeleton-stat-number shimmer" />
                                        <div className="skeleton-stat-label shimmer" />
                                    </div>
                                    <div>
                                        <div className="skeleton-stat-number shimmer" />
                                        <div className="skeleton-stat-label shimmer" />
                                    </div>
                                </div>

                                <div className="profile-featured-games">
                                    <div className="skeleton-game shimmer" />
                                    <div className="skeleton-game shimmer" />
                                    <div className="skeleton-game shimmer" />
                                </div>
                            </div>
                        </section>

                        <section className="profile-recent-activity">
                            <div className="profile-recent-activity-header">
                                <div className="skeleton-title shimmer" />
                            </div>

                            <div className="profile-recent-activity-content">
                                <div className="skeleton-activity shimmer" />
                                <div className="skeleton-activity shimmer" />
                            </div>
                        </section>

                    </div>

                    <aside className="profile-aside">
                        <section className="profile-aside-info">

                            <div className="skeleton-online shimmer" />

                            <div className="profile-aside-info-content">

                                <div className="profile-aside-awards">
                                    <div className="skeleton-title shimmer" />
                                    <div className="profile-awards">
                                        <div className="skeleton-award shimmer" />
                                        <div className="skeleton-award shimmer" />
                                        <div className="skeleton-award shimmer" />
                                        <div className="skeleton-award shimmer" />
                                    </div>
                                </div>

                                <ul>
                                    <div className="skeleton-link shimmer" />
                                    <div className="skeleton-link shimmer" />
                                    <div className="skeleton-link shimmer" />
                                    <div className="skeleton-link shimmer" />
                                </ul>

                                <div className="profile-aside-friends">
                                    <div className="skeleton-title shimmer" />
                                    <div className="profile-aside-list-friends">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="skeleton-friend shimmer" />
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>
                    </aside>

                </section>
            </article>
        </main>
    )
}

export default ProfileSkeleton
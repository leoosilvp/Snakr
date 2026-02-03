import '../css/profile.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import background from '../assets/img/background-default.png'
import { useUser } from '../hooks/useUser'
import { Link } from 'react-router-dom'
import Collection from '../components/profile/Collection'
import RecentActivity from '../components/profile/RecentActivity'


const Profile = () => {

  const { user } = useUser();
  const awards = user?.awards?.awards ?? []

  return (
    <main className="profile-main" style={{ '--background-img': `url(${user?.settings?.appearance?.background || background})` }}>
      <Header />
      <article className='profile'>
        <header className='profile-header-ctn'>
          <div className='profile-header'>
            <div>
              <div className='frame' style={{ '--background-img': `url(${user?.settings?.appearance?.frame || ''})` }} />
              <img src={user?.profile?.photo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
            </div>
            <section className='profile-header-content'>
              <div>
                <h1>{user?.profile?.username}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </section>
          </div>
          <div className='profile-header-aside'>
            <h1>Level <span className={`${user?.profile?.accountLevel >= 10 && user?.profile?.accountLevel < 99 ? 'medium' : user?.profile?.accountLevel >= 100 ? 'pro' : ''}`}>{user?.profile?.accountLevel}</span></h1>
            <Link to='/settings/account'>Edit profile</Link>
          </div>
        </header>

        <section className='profile-content'>
          <div>
            <Collection />
            <RecentActivity />
          </div>
          <aside className='profile-aside'>
            <section className='profile-aside-info'>
              <h1>On-line</h1>
              <div className='profile-aside-info-content'>
                <article className='profile-aside-awards'>
                  <Link><p>Awards</p> <span>{awards.length}</span></Link>
                  <section className='profile-awards'>
                    {awards.slice(0, 4).map((award) => (
                      <Link className='award' key={award.id} title={`${award.title} - ${award.rarity}`}>
                        <img src={award.badgeUrl} alt={award.title} />
                      </Link>
                    ))}
                  </section>
                </article>

                <ul>
                  <Link><p>Games</p> <span>0</span></Link>
                  <Link><p>Achievements</p> <span>0</span></Link>
                  <Link><p>Library</p></Link>
                  <Link><p>Screenshot</p></Link>
                  <Link><p>Videos</p></Link>
                  <Link><p>Arts</p></Link>
                </ul>

                <article className='profile-aside-friends'>
                  <Link><p>Friends</p> <span>0</span></Link>
                  <section className='profile-aside-list-friends'>
                  </section>
                </article>
              </div>
            </section>
          </aside>
        </section>

      </article>
      <Footer />
    </main>
  )
}

export default Profile

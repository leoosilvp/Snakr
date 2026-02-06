import '../css/profile.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import background from '../assets/img/background-default.png'
import { useUser } from '../hooks/useUser'
import { Link } from 'react-router-dom'
import Collection from '../components/profile/Collection'
import RecentActivity from '../components/profile/RecentActivity'
import { UserPlus } from '@geist-ui/icons'
import { useEffect, useState } from 'react'
import { socialService } from '../services/social.service'

const DEFAULT_AVATAR =
  'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'

const Profile = () => {
  const { user } = useUser()
  const myUserId = user?.id

  const awards = user?.awards?.awards ?? []
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if (!myUserId) return

    async function fetchFriends() {
      try {
        const data = await socialService.listFriends({ myUserId })

        const acceptedFriends = data
          .filter(f => f.status === 'accepted')
          .map(friend => {
            const otherUser =
              friend.requester_id === myUserId
                ? friend.addressee
                : friend.requester

            if (!otherUser || !otherUser.profile) return null

            const statusObj = otherUser.status || {}
            const status =
              statusObj.status === 'playing'
                ? 'playing'
                : statusObj.status === 'online'
                  ? 'online'
                  : 'offline'

            return {
              id: friend.id,
              username: otherUser.profile.username,
              photo: otherUser.profile.photo,
              status
            }
          })
          .filter(Boolean)

        setFriends(acceptedFriends)
      } catch (err) {
        console.error('Failed to load profile friends', err)
      }
    }

    fetchFriends()
  }, [myUserId])

  const STATUS_ORDER = {
    playing: 0,
    online: 1,
    offline: 2
  }

  const sortedFriends = [...friends]
    .sort((a, b) => {
      return (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99)
    })
    .slice(0, 10)

  return (
    <main
      className="profile-main"
      style={{
        '--background-img': `url(${user?.settings?.appearance?.background || background})`
      }}
    >
      <Header />

      <article className='profile'>
        <header className='profile-header-ctn'>
          <div className='profile-header'>
            <div>
              <div
                className='frame'
                style={{
                  '--background-img': `url(${user?.settings?.appearance?.frame || ''})`
                }}
              />
              <img
                src={user?.profile?.photo || DEFAULT_AVATAR}
                alt={user?.profile?.username}
              />
            </div>

            <section className='profile-header-content'>
              <div>
                <h1>{user?.profile?.username}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </section>
          </div>

          <div className='profile-header-aside'>
            <h1>
              Level{' '}
              <span
                className={
                  user?.profile?.accountLevel >= 100
                    ? 'pro'
                    : user?.profile?.accountLevel >= 10
                      ? 'medium'
                      : ''
                }
              >
                {user?.profile?.accountLevel}
              </span>
            </h1>

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
                  <Link>
                    <p>Awards</p> <span>{awards.length}</span>
                  </Link>

                  <section className='profile-awards'>
                    {awards.slice(0, 4).map(award => (
                      <Link
                        key={award.id}
                        className='award'
                        title={`${award.title} - ${award.rarity}`}
                      >
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
                  <Link to='/friends'>
                    <p>Friends</p> <span>{friends.length}</span>
                  </Link>

                  <section className='profile-aside-list-friends'>
                    {sortedFriends.slice(0, 10).map(friend => (
                      <Link
                        key={friend.id}
                        to={`/user/${friend.username}`}
                        className={`profile-card-friend ${friend.status || ''}`}
                      >
                        <img
                          src={friend.photo || DEFAULT_AVATAR}
                          alt={friend.username}
                        />
                        <div />
                        <h2>{friend.username}</h2>
                      </Link>
                    ))}

                    {friends.length === 0 && (
                      <div className='profile-no-friends'>
                        <p>No friends here</p>
                        <Link to='/friends/add-friends'>
                          <UserPlus size={15} />
                        </Link>
                      </div>
                    )}
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

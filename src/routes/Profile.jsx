import '../css/profile.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import background from '../assets/img/background-default.png'
import { useUser } from '../hooks/useUser'
import { Link } from 'react-router-dom'
import Collection from '../components/profile/Collection'
import RecentActivity from '../components/profile/RecentActivity'
import { Share2, UserPlus } from '@geist-ui/icons'
import { useEffect, useState } from 'react'
import { socialService } from '../services/social.service'
import ModalEditCollection from '../components/profile/ModalEditCollection'

const DEFAULT_AVATAR =
  'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'

function formatLastSeen(lastSeen) {
  if (!lastSeen) return null

  const diff = Date.now() - new Date(lastSeen).getTime()
  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)

  if (minutes < 1) return 'Online recently'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  if (days <= 30) return `${days} days ago`
  return '+30 days ago'
}

function getLastSeenTimestamp(statusObj) {
  if (!statusObj) return Infinity

  if (statusObj.status === 'playing' || statusObj.status === 'online') {
    return 0
  }

  if (statusObj.last_seen) {
    return Date.now() - new Date(statusObj.last_seen).getTime()
  }

  return Infinity
}

const Profile = () => {
  const { user } = useUser()
  const myUserId = user?.id

  const awards = user?.awards?.awards ?? []
  const [friends, setFriends] = useState([])

  const preference = user?.settings?.profile
  const showGames = preference?.showGames
  const showActivity = preference?.showActivity
  const showAchievements = preference?.showAchievements
  const showOnlineStatus = preference?.showOnlineStatus

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

            const statusObj = otherUser.presence || {}

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
              level: otherUser.profile.accountLevel,
              status,
              lastSeen: formatLastSeen(statusObj.last_seen),
              lastSeenDelta: getLastSeenTimestamp(statusObj),
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

  const handleShareProfile = async () => {
    if (!user?.profile?.username) return

    const baseUrl = window.location.origin
    const profileUrl = `${baseUrl}/user/${user?.profile?.username}`

    const shareData = {
      title: `${user?.profile.username} • Snakr`,
      text: `Confira o meu perfil no Snakr.`,
      url: profileUrl
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        //
      }
    }

    try {
      await navigator.clipboard.writeText(profileUrl)
      alert('Profile link copied to clipboard')
    } catch {
      alert('Unable to copy profile link')
    }
  }

  const sortedFriends = [...friends]
    .sort((a, b) => a.lastSeenDelta - b.lastSeenDelta)
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

            <section className='profile-header-aside-btns'>
              <Link to='/settings/account'>Edit profile</Link>
              <button onClick={handleShareProfile}>
                <Share2 size={18} /> Share profile
              </button>
            </section>
          </div>
        </header>

        <section className='profile-content'>
          <div>
            <Collection userId={user?.id} showGames={showGames} />
            {showActivity ? <RecentActivity /> : ''}
          </div>

          <aside className='profile-aside'>
            <section className='profile-aside-info'>
              {showOnlineStatus ?? <h1>On-line</h1>}

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
                  {showGames ? <Link to='/library'><p>Games</p> <span>0</span></Link> : ''}
                  {showAchievements ? <Link><p>Achievements</p> <span>0</span></Link> : ''}
                  <Link to='/library'><p>Library</p></Link>
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
                        <section className='profile-card-friend-content'>
                          <img
                            src={friend.photo || DEFAULT_AVATAR}
                            alt={friend.username}
                          />
                          <div />
                          <section className='profile-card-friend-content-info'>
                            <h2>{friend.username}</h2>
                            <h3>{friend.lastSeen ?? ''}</h3>
                          </section>
                        </section>
                        <section className='profile-icon-level'>
                          <h1 className={friend.level >= 100 ? 'pro' : friend.level >= 10 ? 'medium' : ''}>
                            {friend.level}
                          </h1>
                        </section>
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
      
      <ModalEditCollection />
      <Footer />
    </main>
  )
}

export default Profile
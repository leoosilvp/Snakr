import '../css/profile.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Skeleton from "../components/Skeleton"
import background from '../assets/img/background-default.png'
import { Link, Navigate } from 'react-router-dom'
import Collection from '../components/profile/Collection'
import RecentActivity from '../components/profile/RecentActivity'
import { useEffect, useState } from 'react'
import { usePublicProfile } from '../hooks/usePublicProfile'
import { socialService } from '../services/social.service'
import { useUser } from '../hooks/useUser'
import { Lock, Mail, Share2, UserMinus, UserPlus } from '@geist-ui/icons'

const DEFAULT_AVATAR =
  'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'

const User = () => {
  const { profile, loading, error } = usePublicProfile()
  const { user, loading: userLoading } = useUser()

  const [friends, setFriends] = useState([])
  const [friendStatus, setFriendStatus] = useState('none')
  const [friendRelationId, setFriendRelationId] = useState(null)

  const awards = profile?.awards?.awards ?? []

  const preference = profile?.settings?.profile
  const isPublic = preference?.isPublic
  const showGames = preference?.showGames
  const showActivity = preference?.showActivity
  const showAchievements = preference?.showAchievements
  const showOnlineStatus = preference?.showOnlineStatus

  function resolveOtherUser(relation, myUserId) {
    if (relation.users) return relation.users
    if (relation.requester_id === myUserId) return relation.addressee
    if (relation.addressee_id === myUserId) return relation.requester
    return null
  }

  useEffect(() => {
    if (!profile?.id) return

    async function fetchFriends() {
      try {
        const data = await socialService.listFriends({
          myUserId: profile.id
        })

        const acceptedFriends = data
          .filter(f => f.status === 'accepted')
          .map(friend => {
            const otherUser =
              friend.requester_id === profile.id
                ? friend.addressee
                : friend.requester

            if (!otherUser?.profile) return null

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
        console.error('Failed to load public profile friends', err)
      }
    }

    fetchFriends()
  }, [profile?.id])

  useEffect(() => {
    if (!user?.id || !profile?.id) return

    async function resolveFriendStatus() {
      try {
        const relations = await socialService.listFriends({
          myUserId: user.id
        })

        const relation = relations.find(r => {
          const otherUser = resolveOtherUser(r, user.id)
          return otherUser?.id === profile.id
        })

        if (!relation) {
          setFriendStatus('none')
          setFriendRelationId(null)
          return
        }

        setFriendRelationId(relation.id)

        if (relation.status === 'accepted') {
          setFriendStatus('accepted')
        } else if (relation.status === 'pending') {
          setFriendStatus('pending')
        } else {
          setFriendStatus('none')
        }
      } catch (err) {
        console.error('Failed to resolve friend status', err)
        setFriendStatus('none')
      }
    }

    resolveFriendStatus()
  }, [user?.id, profile?.id])

  const handleAddFriend = async () => {
    try {
      await socialService.sendFriendRequest(
        null,
        profile.profile.username
      )
      setFriendStatus('pending')
    } catch (err) {
      console.error('Failed to send friend request', err)
    }
  }

  const handleRemoveFriend = async () => {
    if (!friendRelationId) return

    try {
      await socialService.removeFriend(friendRelationId)
      setFriendStatus('none')
      setFriendRelationId(null)
    } catch (err) {
      console.error('Failed to remove friend', err)
    }
  }

  const handleShareProfile = async () => {
    if (!profile?.profile?.username) return

    const baseUrl = window.location.origin
    const profileUrl = `${baseUrl}/user/${profile.profile.username}`

    const shareData = {
      title: `${profile.profile.username} • Snakr`,
      text: `Confira o perfil de ${profile.profile.username} na Snakr.`,
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

  if (loading || userLoading) return <Skeleton />
  if (error || !profile) return <Skeleton />

  if (user && profile && user.id === profile.id) {
    return <Navigate to="/profile" replace />
  }

  const STATUS_ORDER = { playing: 0, online: 1, offline: 2 }

  const sortedFriends = [...friends]
    .sort((a, b) =>
      (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99)
    )
    .slice(0, 10)

  return (
    <main
      className="profile-main"
      style={{
        '--background-img': `url(${isPublic
          ? profile?.settings?.appearance?.background || background
          : background
        })`
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
                  '--background-img': `url(${profile?.settings?.appearance?.frame || ''})`
                }}
              />
              <img
                src={profile?.profile?.photo || DEFAULT_AVATAR}
                alt={profile?.profile?.username}
              />
            </div>

            <section className='profile-header-content'>
              <div>
                <h1>{profile?.profile?.username}</h1>
                <p>{profile?.profile?.bio}</p>
              </div>
            </section>
          </div>

          <div className='profile-header-aside'>
            <h1>
              Level
              <span className={
                profile?.profile?.accountLevel >= 100
                  ? 'pro'
                  : profile?.profile?.accountLevel >= 10
                  ? 'medium'
                  : ''
              }>
                {profile?.profile?.accountLevel}
              </span>
            </h1>

            <section className='profile-header-aside-btns'>
              {friendStatus === 'none' && (
                <button className='active' onClick={handleAddFriend}>
                  <UserPlus size={18} /> Add friend
                </button>
              )}

              {friendStatus === 'pending' && (
                <button disabled>
                  <Mail size={18} /> Pending
                </button>
              )}

              {friendStatus === 'accepted' && (
                <button className='red' onClick={handleRemoveFriend}>
                  <UserMinus size={18} /> Remove friend
                </button>
              )}

              <button onClick={handleShareProfile}>
                <Share2 size={18} /> Share profile
              </button>
            </section>
          </div>
        </header>

        {isPublic ? (
          <section className='profile-content'>
            <div>
              <Collection userId={profile.id} showGames={showGames} />
              {showActivity && <RecentActivity userId={profile.id} />}
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
                    {showGames && <Link><p>Games</p> <span>{profile?.games?.length ?? 0}</span></Link>}
                    {showAchievements && <Link><p>Achievements</p> <span>0</span></Link>}
                    <Link><p>Library</p></Link>
                  </ul>

                  <article className='profile-aside-friends'>
                    <Link>
                      <p>Friends</p> <span>{friends.length}</span>
                    </Link>

                    <section className='profile-aside-list-friends'>
                      {sortedFriends.map(friend => (
                        <Link
                          key={friend.id}
                          to={`/user/${friend.username}`}
                          className={`profile-card-friend ${friend.status}`}
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
                        </div>
                      )}
                    </section>
                  </article>
                </div>
              </section>
            </aside>
          </section>
        ) : (
          <section className='profile-private'>
            <Lock size={50} />
            <h1>This profile is private</h1>
          </section>
        )}
      </article>

      <Footer />
    </main>
  )
}

export default User

import { Edit3 } from "@geist-ui/icons"
import { Link } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { gamesService } from "../../services/games.service"

const Collection = ({ userId }) => {

  const { user } = useUser()
  const isOwner = user?.id == userId

  const [gamesCount, setGamesCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)

        const data = await gamesService.userList({
          userId,
          signal: controller.signal
        })

        const list = Array.isArray(data) ? data : []
        setGamesCount(list.length)

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err)
          setGamesCount(0)
        }
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [userId])

  return (
    <section className='profile-collection'>
      <header className='profile-collection-header'>
        <h1>My collection</h1>
        {isOwner ? <Link><Edit3 size={16} /> Edit collection</Link> : ''}
      </header>

      <section className='profile-collection-content'>
        <section className='profile-statistics-in-collection'>

          <Link to='/library'>
            <h1>{loading ? '...' : gamesCount}</h1>
            <h2>Games on account</h2>
          </Link>

          <Link>
            <h1>0</h1>
            <h2>Analytics</h2>
          </Link>

          <Link>
            <h1>0</h1>
            <h2>Total hours played</h2>
          </Link>

          <Link to='/library/favorites'>
            <h1>0</h1>
            <h2>On the Favorites</h2>
          </Link>

        </section>

        <section className='profile-ctn-featured-games'>
          <h1>Featured games</h1>
          <section className='profile-featured-games'>
            <span className="no-featured-games">No featured games.</span>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Collection
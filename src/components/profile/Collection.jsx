import { Edit3 } from "@geist-ui/icons"
import { Link } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { gamesService } from "../../services/games.service"
import ModalEditCollection from "./ModalEditCollection"

const Collection = ({ userId }) => {

  const { user } = useUser()
  const isOwner = user?.id == userId

  const [gamesCount, setGamesCount] = useState(0)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [featuredGames, setFeaturedGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)

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

        const favorites = list.filter(g => g.favorite === true)
        setFavoritesCount(favorites.length)

        const featured = list.filter(g => g.status === 'highlight')
        setFeaturedGames(featured)

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err)
          setGamesCount(0)
          setFavoritesCount(0)
          setFeaturedGames([])
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
        {isOwner ? (
          <Link onClick={() => setOpenModal(true)}>
            <Edit3 size={16} /> Edit collection
          </Link>
        ) : ''}
      </header>

      <section className='profile-collection-content'>
        <section className='profile-statistics-in-collection'>

          <Link to='/library'>
            <h1>{loading ? 0 : gamesCount}</h1>
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
            <h1>{loading ? 0 : favoritesCount}</h1>
            <h2>On the Favorites</h2>
          </Link>

        </section>

        <section className='profile-ctn-featured-games'>
          <h1>Featured games</h1>
          <section className='profile-featured-games'>

            {!loading && featuredGames.length === 0 && (
              <span className="no-featured-games">No featured games.</span>
            )}

            {!loading && featuredGames.map(item => (
              <Link key={item.games?.id} to={`/game/${item.games?.igdb_id}`}>
                <img src={item.games?.cover_image} alt={item.games?.name} />
              </Link>
            ))}

          </section>
        </section>
      </section>
      <ModalEditCollection open={openModal} onClose={() => setOpenModal(false)} />
    </section>
  )
}

export default Collection
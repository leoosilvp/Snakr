import { Edit3 } from "@geist-ui/icons"
import { Link } from "react-router-dom"
import { useUser } from "../../hooks/useUser"

const Collection = ({ userId, showGames }) => {

  const { user } = useUser()
  const isOwner = user?.id == userId

  return (
    <section className='profile-collection'>
      <header className='profile-collection-header'>
        <h1>My collection</h1>
        {isOwner ? <Link><Edit3 size={16} /> Edit collection</Link> : ''}
      </header>
      <section className='profile-collection-content'>
        <section className='profile-statistics-in-collection'>
          {showGames ?
            <div>
              <h1>0</h1>
              <Link>Games on account</Link>
            </div> : ''
          }
          <div>
            <h1>0</h1>
            <Link>Analytics</Link>
          </div>
          <div>
            <h1>0</h1>
            <Link>Total hours played</Link>
          </div>
          <div>
            <h1>0</h1>
            <Link>On the wish list</Link>
          </div>
        </section>
        {showGames ?
          <section className='profile-ctn-featured-games'>
            <h1>Featured games</h1>
            <section className='profile-featured-games'>
              <span className="no-featured-games">No featured games.</span>
            </section>
          </section> : ''
        }
      </section>
    </section>
  )
}

export default Collection

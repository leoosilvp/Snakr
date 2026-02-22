import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as IconSearch } from '@geist-ui/icons'
import { useGames } from '../hooks/useGames'

const Search = () => {
    const navigate = useNavigate()

    const [input, setInput] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const modalRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(input.trim())
        }, 300)

        return () => clearTimeout(timer)
    }, [input])

    const { games } = useGames({
        search: debouncedSearch || null
    })

    const isOpen = debouncedSearch.length > 0

    function handleKeyDown(e) {
        if (e.key === 'Enter' && input.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(input.trim())}`)
        }
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setInput('')
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <main className='search-main'>
            <section className='search-input'>
                <button>
                    <IconSearch size={18} />
                </button>

                <input
                    type='text'
                    placeholder='search for games...'
                    maxLength={30}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </section>

            {isOpen && (
                <section
                    className='search-games'
                    ref={modalRef}
                >
                    {games.length === 0 && (
                        <p style={{ padding: '20px' }}>
                            No games found.
                        </p>
                    )}

                    {games.map((game, index) => (
                        <div key={game.id}>
                            <article
                                className='search-games-card'
                                onClick={() =>
                                    navigate(`/catalog?search=${encodeURIComponent(game.name)}`)
                                }
                            >
                                <img
                                    src={game.background_image}
                                    alt={game.name}
                                />

                                <section className='search-games-card-content'>
                                    <h1>{game.name}</h1>

                                    <section className='search-games-card-categories'>
                                        {game.genres?.slice(0, 3).map((genre) => (
                                            <p key={genre.id}>{genre.name}</p>
                                        ))}
                                    </section>
                                </section>
                            </article>

                            {index < games.length - 1 && <div className='hr' />}
                        </div>
                    ))}

                </section>
            )}
        </main>
    )
}

export default Search
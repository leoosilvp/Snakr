import { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useGifts } from '../hooks/useGifts'
import '../css/gifts.css'

const PLATFORM_MAP = {
    PC: 'pc',
    Steam: 'steam',
    'Epic Games Store': 'epic-store',
    GOG: 'gog',
    Xbox: 'xbox',
    Playstation: 'playstation',
    Nintendo: 'nintendo',
    Android: 'android',
    iOS: 'ios'
}

const PLATFORM_ICONS = [
    { key: 'steam', icon: 'fa-steam-symbol', label: 'Steam' },
    { key: 'windows', icon: 'fa-windows', label: 'Windows' },
    { key: 'epic-store', label: 'Epic Games' },
    { key: 'gog', icon: 'fa-galactic-republic', label: 'GOG' },
    { key: 'xbox', icon: 'fa-xbox', label: 'Xbox' },
    { key: 'playstation', icon: 'fa-playstation', label: 'Playstation' },
    { key: 'android', icon: 'fa-android', label: 'Android' },
    { key: 'ios', icon: 'fa-apple', label: 'iOS' }
]

const Gifts = () => {
    const [platform, setPlatform] = useState(null)
    const { gifts, loading, error } = useGifts({ platform, sortBy: 'date' })

    const isExpired = item => {
        if (!item.end_date || item.end_date === 'N/A') return false
        const end = new Date(item.end_date)
        return !isNaN(end) && end < new Date()
    }

    const formatEndDate = endDate => {
        if (!endDate || endDate === 'N/A') return null
        const end = new Date(endDate)
        if (isNaN(end.getTime())) return null
        const diffDays = Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24))
        if (diffDays <= 0) return 'Expired'
        if (diffDays === 1) return 'Ends in 1 day'
        if (diffDays <= 7) return `Ends in ${diffDays} days`
        return `Ends on ${end.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })}`
    }

    const sortGifts = gifts => {
        const now = new Date()

        return [...gifts].sort((a, b) => {
            const aEnd = a.end_date && a.end_date !== 'N/A' ? new Date(a.end_date) : null
            const bEnd = b.end_date && b.end_date !== 'N/A' ? new Date(b.end_date) : null

            const aExpired = aEnd && !isNaN(aEnd) && aEnd < now
            const bExpired = bEnd && !isNaN(bEnd) && bEnd < now

            if (aExpired !== bExpired) {
                return aExpired ? 1 : -1
            }

            return new Date(b.published_date) - new Date(a.published_date)
        })
    }

    return (
        <main className="gifts-main">
            <Header />
            <section className="gifts-main-content">
                <header className="gifts-main-content-header">
                    <button className={platform === null ? 'active' : ''} onClick={() => setPlatform(null)}>All</button>
                    {Object.entries(PLATFORM_MAP).map(([label, value]) => (
                        <button key={value} className={platform === value ? 'active' : ''} onClick={() => setPlatform(platform === value ? null : value)}>
                            {label}
                        </button>
                    ))}
                </header>

                <h1>{gifts.length} Snakr Gifts</h1>
                <div className="trace" />

                <section className="gifts-main-cards">
                    {loading && <div className='gifts-main-cards-loading'><div className='card-loading' /><div className='card-loading' /><div className='card-loading' /><div className='card-loading' /> </div>}
                    {error && <p>{error}</p>}

                    {!loading && !error && gifts.length === 0 && (
                        <div className="gifts-no-results"><i className='fa-regular fa-face-tired' /><p>No results</p></div>
                    )}

                    {sortGifts(gifts).map(item => {
                        const platforms = item.platforms?.toLowerCase() || ''
                        return (
                            <article key={item.id} className={`gift-card ${isExpired(item) ? 'expired' : ''}`}>
                                <section className="gift-thumbnail">
                                    <a href={item.open_giveaway_url} target="_blank" rel="noreferrer">
                                        <img src={item.image} alt={item.title} />
                                    </a>

                                    {formatEndDate(item.end_date) && !isExpired(item) && (
                                        <span className="gift-badge-top-left">
                                            {formatEndDate(item.end_date)}
                                        </span>
                                    )}

                                    <div className="gift-platforms">
                                        {PLATFORM_ICONS
                                            .filter(p => p.key !== 'epic-store')
                                            .map(p =>
                                                platforms.includes(p.key) ? (
                                                    <span key={p.key} title={p.label}>
                                                        <i className={`fa-brands ${p.icon}`} />
                                                    </span>
                                                ) : null
                                            )}
                                    </div>

                                    <span className="gift-rarity">
                                        {item.worth === 'N/A' ? 'Free' : 'Deal'}
                                    </span>
                                    {isExpired(item) && (
                                        <p className='gift-expired'>EXPIRED</p>
                                    )}
                                </section>

                                <section className="gift-content">
                                    <h3 className="gift-title">{item.title}</h3>
                                    <div className="gift-price">
                                        <span className="gift-free">FREE</span>
                                        {item.worth !== 'N/A' && <s>{item.worth}</s>}
                                        <span className="gift-type">{item.type}</span>
                                    </div>
                                    <p className="gift-description">{item.description}</p>
                                    <div className="gift-actions">
                                        <a href={item.open_giveaway_url} target="_blank" rel="noreferrer" className="gift-claim">
                                            Claim Gift
                                        </a>
                                    </div>
                                    <div className="gift-claimed">
                                        <p><i className='fa-solid fa-user' />{item.users?.toLocaleString()}+ Claimed</p>
                                    </div>
                                </section>
                            </article>
                        )
                    })}
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default Gifts

import { useCallback, useEffect, useMemo, useState } from 'react'

const API_URL = 'https://www.gamerpower.com/api/giveaways'

/**
 * Hook profissional para consumir a API GamerPower
 */
export const useNews = (options = {}) => {
    const {
        platform = null,     // pc, steam, epic-games-store, etc
        type = null,         // game, loot, beta
        sortBy = 'date',     // date | popularity | value
        search = null,       // texto livre
        limit = null         // número máximo de itens
    } = options

    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    /**
     * Fetch principal
     */
    const fetchNews = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const res = await fetch(API_URL)
            if (!res.ok) throw new Error('Failed to fetch GamerPower API')

            const data = await res.json()
            setNews(data)
        } catch (err) {
            setError(err.message || 'Unexpected error')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchNews()
    }, [fetchNews])

    /**
     * Filtros e transformações
     */
    const filteredNews = useMemo(() => {
        let data = [...news]

        // filtro por plataforma
        if (platform) {
            data = data.filter(item =>
                item.platforms?.toLowerCase().includes(platform.toLowerCase())
            )
        }

        // filtro por tipo
        if (type) {
            data = data.filter(item =>
                item.type?.toLowerCase() === type.toLowerCase()
            )
        }

        // busca por texto
        if (search) {
            const q = search.toLowerCase()
            data = data.filter(item =>
                item.title?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q)
            )
        }

        // ordenação
        if (sortBy === 'popularity') {
            data.sort((a, b) => (b.users || 0) - (a.users || 0))
        }

        if (sortBy === 'value') {
            data.sort((a, b) =>
                parseFloat(b.worth?.replace(/[^0-9.]/g, '')) -
                parseFloat(a.worth?.replace(/[^0-9.]/g, ''))
            )
        }

        if (sortBy === 'date') {
            data.sort(
                (a, b) => new Date(b.published_date) - new Date(a.published_date)
            )
        }

        // limite
        if (limit) {
            data = data.slice(0, limit)
        }

        return data
    }, [news, platform, type, search, sortBy, limit])

    return {
        news: filteredNews,
        loading,
        error,
        total: filteredNews.length,
        refetch: fetchNews
    }
}
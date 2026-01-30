export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const query = `
("game release" OR "new game" OR "game update" OR "patch notes"
OR "early access" OR "steam release" OR "pc game" OR "indie game"
OR "AAA game" OR "game trailer")
AND (Steam OR PlayStation OR Xbox OR Nintendo OR PC)
NOT (stock OR market OR economy OR addiction OR gambling OR lawsuit OR study)
    `

        const url = `https://newsapi.org/v2/everything?` +
            `q=${encodeURIComponent(query)}` +
            `&language=en` +
            `&sortBy=publishedAt` +
            `&pageSize=100`

        const response = await fetch(url, {
            headers: {
                'X-Api-Key': process.env.NEWS_API_KEY
            }
        })

        if (!response.ok) {
            const text = await response.text()
            console.error('[NEWSAPI_ERROR]', response.status, text)

            return res.status(502).json({ error: 'Upstream NewsAPI error' })
        }

        const data = await response.json()

        const normalized = data.articles
            .filter(a =>
                a.title &&
                a.description &&
                a.url &&
                !a.title.toLowerCase().includes('stock') &&
                !a.title.toLowerCase().includes('market')
            )
            .map((article, index) => ({
                id: `${article.publishedAt}-${index}`,
                title: article.title,
                description: article.description,
                image: article.urlToImage,
                url: article.url,
                source: article.source?.name || 'Unknown',
                publishedAt: article.publishedAt
            }))

        return res.status(200).json(normalized)
    } catch (error) {
        console.error('[NEWS_API]', error)
        return res.status(500).json({ error: 'Failed to fetch game news' })
    }
}
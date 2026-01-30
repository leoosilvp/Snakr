const API_URL = 'https://www.gamerpower.com/api/giveaways'

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      platform = null,
      type = null,
      sortBy = 'date',
      search = null,
      limit = null
    } = req.query

    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch GamerPower API')
    }

    let gifts = await response.json()

    const PLATFORM_MATCHERS = {
      'pc': ['pc'],
      'steam': ['steam'],
      'epic-store': ['epic games store'],
      'gog': ['gog', 'drm-free'],
      'xbox': ['xbox'],
      'playstation': ['playstation'],
      'nintendo': ['switch', 'nintendo'],
      'android': ['android'],
      'ios': ['ios']
    }

    if (platform) {
      const matchers = PLATFORM_MATCHERS[platform.toLowerCase()]

      if (matchers) {
        gifts = gifts.filter(item => {
          const platforms = item.platforms?.toLowerCase() || ''
          return matchers.some(m => platforms.includes(m))
        })
      }
    }

    if (type) {
      gifts = gifts.filter(item =>
        item.type?.toLowerCase() === type.toLowerCase()
      )
    }

    if (search) {
      const q = search.toLowerCase()
      gifts = gifts.filter(item =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'popularity':
        gifts.sort((a, b) => (b.users || 0) - (a.users || 0))
        break

      case 'value':
        gifts.sort((a, b) =>
          parseFloat(b.worth?.replace(/[^0-9.]/g, '')) -
          parseFloat(a.worth?.replace(/[^0-9.]/g, ''))
        )
        break

      default:
        gifts.sort(
          (a, b) =>
            new Date(b.published_date) - new Date(a.published_date)
        )
    }

    if (limit) {
      gifts = gifts.slice(0, Number(limit))
    }

    return res.status(200).json({
      total: gifts.length,
      gifts
    })
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to load gifts',
      message: err.message
    })
  }
}

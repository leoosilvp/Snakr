const COMMITS_URL = 'https://api.github.com/repos/leoosilvp/Snakr/commits'

export default async function handler(req, res) {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json'
    }

    const commitsRes = await fetch(`${COMMITS_URL}?per_page=35`, { headers })

    if (!commitsRes.ok) {
      return res.status(commitsRes.status).json({ error: 'Erro ao buscar commits' })
    }

    const commits = await commitsRes.json()
    if (!Array.isArray(commits) || commits.length === 0) {
      return res.status(200).json({
        overallStatus: 'success',
        commitsByDay: {}
      })
    }

    const commitsWithStatus = await Promise.all(
      commits.map(async (commit) => {
        const statusRes = await fetch(
          `https://api.github.com/repos/leoosilvp/Snakr/commits/${commit.sha}/status`,
          { headers }
        )

        const statusData = await statusRes.json()

        return {
          sha: commit.sha,
          message: commit.commit.message,
          date: commit.commit.committer.date,
          status: statusData.state || 'success'
        }
      })
    )

    let overallStatus = 'success'

    const latestCommit = commitsWithStatus[0]
    const lastThreeCommits = commitsWithStatus.slice(0, 3)

    if (latestCommit?.status !== 'success') {
      overallStatus = 'failure'
    } else if (
      lastThreeCommits.some(
        c => c.status === 'failure' || c.status === 'error'
      )
    ) {
      overallStatus = 'warning'
    }

    const grouped = commitsWithStatus.reduce((acc, commit) => {
      const day = commit.date.split('T')[0]
      acc[day] = acc[day] || []
      acc[day].push(commit)
      return acc
    }, {})

    const newestDate = commitsWithStatus[0].date.split('T')[0]
    const oldestDate = commitsWithStatus[commitsWithStatus.length - 1].date.split('T')[0]

    const completedDays = {}
    let current = new Date(`${newestDate}T00:00:00Z`)
    const end = new Date(`${oldestDate}T00:00:00Z`)

    while (current >= end) {
      const key = current.toISOString().split('T')[0]
      completedDays[key] = grouped[key] || []
      current.setUTCDate(current.getUTCDate() - 1)
    }

    return res.status(200).json({
      overallStatus,
      commitsByDay: completedDays
    })

  } catch (error) {
    console.error('Erro API status:', error)
    return res.status(500).json({ error: 'Erro interno' })
  }
}

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../css/status.css'
import icon from '../assets/svg/logo.svg'

const Status = () => {
    const [commitsByDay, setCommitsByDay] = useState({})
    const [overallStatus, setOverallStatus] = useState('')

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('/api/status')
                if (!res.ok) return

                const data = await res.json()
                setOverallStatus(data.overallStatus)
                setCommitsByDay(data.commitsByDay)
            } catch (error) {
                console.error('Error retrieving status:', error)
            }
        }

        fetchStatus()
    }, [])

    const formatMonth = (date) =>
        date
            .toLocaleString('pt-BR', { month: 'short', timeZone: 'UTC' })
            .replace('.', '')
            .replace(/^./, c => c.toUpperCase())

    const formatDayTitle = (dateStr) => {
        const date = new Date(`${dateStr}T00:00:00Z`)
        return `${formatMonth(date)} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
    }

    const formatCommitDate = (dateStr) => {
        const date = new Date(dateStr)
        const time = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        })

        return `${formatMonth(date)} ${date.getUTCDate()}, ${time} UTC`
    }

    return (
        <main className='status-page'>
            <section className='status-page'>
                <header className='status-page-header'>
                    <img onClick={() => window.location.href = '/'} src={icon} alt="logo Snakr" />
                    <Link to='/docs'>Go to Docs</Link>
                </header>

                <article style={overallStatus === 'failure' ? { background: '#ec2222' } : overallStatus === 'warning' ? { background: '#efa422' } : overallStatus === '' ? { background: '#444444ff' } : {}}
                    className='status-all-applications'>

                    <i className={`fa-solid ${overallStatus === ''
                        ? 'fa-circle-exclamation'
                        : overallStatus === 'success'
                            ? 'fa-check'
                            : overallStatus === 'warning'
                                ? 'fa-triangle-exclamation'
                                : 'fa-xmark'
                        }`}
                    ></i>

                    <h1>
                        {overallStatus === ''
                            ? 'System is down. No recent records.'
                            : overallStatus === 'success'
                                ? 'System working normally.'
                                : overallStatus === 'warning'
                                    ? 'Recent errors detected. System may be unstable.'
                                    : 'System with recent failures.'
                        }
                    </h1>
                </article>

                <section className='commits-dates'>
                    {Object.entries(commitsByDay).map(([day, commits]) => (
                        <article className='commits-day' key={day}>
                            <h1>{formatDayTitle(day)}</h1>
                            <hr />

                            <section className='latest-commits'>
                                {commits.length === 0 ? (
                                    <h3>No results for this date.</h3>
                                ) : (
                                    commits.map(commit => (
                                        <article className='commit' key={commit.sha}>
                                            <section>
                                                <p>{commit.message}</p>
                                                <h2>{formatCommitDate(commit.date)}</h2>
                                            </section>

                                            <i className={`fa-solid ${commit.status === 'success' || commit.status === 'pending' ? 'fa-check' : 'fa-xmark'}`}
                                                style={commit.status === 'success' || commit.status === 'pending' ? {} : { color: 'red' }}>
                                            </i>
                                        </article>
                                    ))
                                )}
                            </section>
                        </article>
                    ))}
                </section>

                <article className='link-go-to'>
                    <Link to='/docs'>🠔 Go to Docs</Link>
                </article>
            </section>
        </main>
    )
}

export default Status

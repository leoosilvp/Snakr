import { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import '../css/password-reset.css'
import logo from '../assets/svg/logo3.svg'

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')

    const isRecovery = accessToken && refreshToken

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    async function sendResetEmail() {
        setError('')
        setSuccess(false)

        if (!email) {
            setError('Please enter your email.')
            return
        }

        try {
            setLoading(true)

            const res = await fetch(
                'https://backend-snakr.vercel.app/api/auth/forgot-password',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                }
            )

            if (!res.ok) throw new Error()

            setSuccess(true)
        } catch {
            setError('Unable to send reset email. Try again later.')
        } finally {
            setLoading(false)
        }
    }

    async function resetPassword() {
        setError('')

        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }

        try {
            setLoading(true)

            const res = await fetch(
                'https://backend-snakr.vercel.app/api/auth/reset-password',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        accessToken,
                        refreshToken,
                        newPassword: password
                    })
                }
            )

            if (!res.ok) throw new Error()

            setSuccess(true)

            setTimeout(() => navigate('/login'), 2500)
        } catch {
            setError('Invalid or expired recovery link.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="password-reset-main">
            <header className="password-reset-main-header">
                <Link to="/login">
                    <img src={logo} alt="logo Snakr" />
                </Link>

                <section className="password-reset-main-header-btns">
                    <Link to="/login">Login</Link>
                    <Link to="/login?view=register" className="active">
                        Join now
                    </Link>
                </section>
            </header>

            <section className="password-reset-main-content">
                <article className="password-reset-main-card">
                    {!isRecovery && (
                        <>
                            <h1>I forgot my password.</h1>

                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading || success}
                            />

                            <p>
                                We will send a verification link to this email if it matches a
                                Snakr account.
                            </p>

                            {error && <p className="error">{error}</p>}
                            {success && (
                                <p className="success">
                                    If an account exists, a reset link was sent.
                                </p>
                            )}

                            <section className="password-reset-main-card-btns">
                                <button
                                    className="active"
                                    onClick={sendResetEmail}
                                    disabled={loading || success}
                                >
                                    {loading ? 'Sending...' : 'Send e-mail'}
                                </button>

                                <button onClick={() => navigate('/login')}>Back</button>
                            </section>
                        </>
                    )}

                    {isRecovery && (
                        <>
                            <h1>Set a new password</h1>

                            <input
                                type="password"
                                placeholder="New password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading || success}
                            />

                            <p>Password must be at least 8 characters.</p>

                            {error && <p className="error">{error}</p>}
                            {success && (
                                <p className="success">
                                    Password updated successfully. Redirecting…
                                </p>
                            )}

                            <section className="password-reset-main-card-btns">
                                <button
                                    className="active"
                                    onClick={resetPassword}
                                    disabled={loading || success}
                                >
                                    {loading ? 'Saving...' : 'Update password'}
                                </button>
                            </section>
                        </>
                    )}
                </article>
            </section>

            <footer className="password-reset-main-footer">
                <div>
                    <img src={logo} alt="" />
                    <p>&copy; 2026</p>
                </div>

                <ul>
                    <Link to="/settings/terms and privacy#user">User Agreement</Link>
                    <Link to="/settings/terms and privacy#policy">Privacy Policy</Link>
                    <Link to="/settings/security">Security</Link>
                    <Link to="/settings/terms and privacy#cookie">Cookie Policy</Link>
                    <Link to="/settings/support">Support</Link>
                    <Link to="/settings/account">Account</Link>
                </ul>
            </footer>
        </main>
    )
}

export default ResetPassword

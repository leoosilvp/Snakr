import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/password-reset.css'
import logo from '../assets/svg/logo3.svg'
import { useUser } from '../hooks/useUser'

const ResetPassword = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [isRecovery, setIsRecovery] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        if (!user) {
            setIsLogged(true)
        }
    }, [user])

    useEffect(() => {
        const hash = window.location.hash
        if (!hash) return
        const params = new URLSearchParams(hash.replace('#', ''))
        const at = params.get('access_token')
        const rt = params.get('refresh_token')
        const type = params.get('type')
        if (at && rt && type === 'recovery') {
            setAccessToken(at)
            setRefreshToken(rt)
            setIsRecovery(true)
            window.history.replaceState(null, '', window.location.pathname)
        }
    }, [])

    function calculatePasswordStrength(value) {
        let strength = 0
        if (value.length >= 8) strength += 1.5
        if (value.length >= 10) strength += 0.75
        if (value.length >= 12) strength += 0.75
        if (/[A-Z]/.test(value)) strength += 0.75
        if (/[0-9]/.test(value)) strength += 0.75
        if (/[^A-Za-z0-9]/.test(value)) strength += 1.5
        return Math.min(strength, 6)
    }

    async function sendResetEmail() {
        setError('')
        setSuccess(false)
        if (!email) { setError('Please enter your email.'); return }
        try {
            setLoading(true)
            const res = await fetch('https://backend-snakr.vercel.app/api/auth/forgot-password', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

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
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
        if (password !== confirmPassword) { setError('Passwords do not match.'); return }
        if (passwordStrength < 2) { setError('Password is too weak.'); return }
        try {
            setLoading(true)
            const res = await fetch('https://backend-snakr.vercel.app/api/auth/reset-password', { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accessToken, refreshToken, newPassword: password }) })
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
                <Link to={`${isLogged ? '/' : '/login'}`}><img src={logo} alt="logo Snakr" /></Link>
                <section className="password-reset-main-header-btns">
                    <Link to={`${isLogged ? '/settings/security' : '/login'}`}>{isLogged ? 'Back' : 'Login'}</Link>
                    <Link to={`${isLogged ? '/settings' : '/login?view=register'}`} className="active">{isLogged ? 'Settings' : 'Join now'}</Link>
                </section>
            </header>

            <section className="password-reset-main-content">
                <article className="password-reset-main-card">
                    {!isRecovery && <>
                        <h1>{isLogged ? 'Change my password.' : 'I forgot my password.'}</h1>
                        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} disabled={loading || success} />
                        <p>{isLogged ? 'We will send a confirmation link to this email address to verify the change.' : 'We will send a verification link to this email if it matches a Snakr account.'}</p>
                        {error && <span className="password-error">{error}</span>}
                        {success && <p className="password-success">If an account exists, a reset link was sent.</p>}
                        <section className="password-reset-main-card-btns">
                            <button className="active" onClick={sendResetEmail} disabled={loading || success}>{loading ? 'Sending...' : 'Send e-mail'}</button>
                            <button onClick={() => navigate('/login')}>Back</button>
                        </section>
                    </>}

                    {isRecovery && <>
                        <div>
                            <h1>Set a new password</h1>
                            <p>Choose a strong password you haven’t used before to keep your account secure.</p>
                        </div>

                        <div className="password-input-wrapper">
                            <input type={showPassword ? 'text' : 'password'} placeholder="New password" value={password} onChange={e => { setPassword(e.target.value); setPasswordStrength(calculatePasswordStrength(e.target.value)) }} disabled={loading || success} />
                            <i type="button" className={`fa-regular fa-${showPassword ? 'eye' : 'eye-slash'}`} onClick={() => setShowPassword(v => !v)} />
                        </div>

                        <div className="password-input-wrapper">
                            <input type={showPassword ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={loading || success} />
                        </div>

                        <div className="password-strength">
                            {[1, 2, 3, 4, 5, 6].map(level => <span key={level} className={`strength-box ${passwordStrength >= level ? 'active' : ''}`} />)}
                        </div>

                        {confirmPassword && confirmPassword !== password && <span className="password-error">Passwords do not match.</span>}
                        <p>Password must be at least 8 characters.</p>
                        {error && <p className="password-error">{error}</p>}
                        {success && <p className="password-success">Password updated successfully. Redirecting…</p>}

                        <section className="password-reset-main-card-btns">
                            <button className="active" onClick={resetPassword} disabled={loading || success || password !== confirmPassword || passwordStrength < 2}>{loading ? 'Saving...' : 'Update password'}</button>
                        </section>
                    </>}
                </article>
            </section>

            <footer className="password-reset-main-footer">
                <div><img src={logo} alt="" /><p>&copy; 2026</p></div>
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
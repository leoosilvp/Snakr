import '../css/login.css'
import icon from '../assets/svg/icon-dark.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'

const Login = () => {
  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)

  const { user } = useUser()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");

  useEffect(() => {
    if (view === "register") {
      setMode(view === "register" ? "register" : "login");
    }
  }, [view]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (user) {
    if (window.history.back()) {
      return window.history.back(), window.location.reload()
    }
    return window.location.href = '/home'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError(null)
    setLoading(true)

    try {
      const endpoint =
        mode === 'login'
          ? 'https://backend-snakr.vercel.app/api/auth/login'
          : 'https://backend-snakr.vercel.app/api/auth/register'

      const payload =
        mode === 'login'
          ? {
            username: form.username,
            password: form.password
          }
          : {
            username: form.username,
            email: form.email,
            password: form.password
          }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      if (mode === 'register') {
        setMode('login')
        return
      }

      window.location.href = '/home'

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-main">
      <section className='login-card'>

        <section className='login-left'>
          <header className='login-left-header'>
            <img src={icon} alt="logo snakr" />
            <h2>All your games. One place.</h2>
          </header>

          <section className='login-left-content'>
            <h1>
              {mode === 'login'
                ? 'Create your account'
                : "It's good to have you back."}
            </h1>

            <p>
              {mode === 'login'
                ? 'Join Snakr and centralize all your games.'
                : 'Access your account right now.'}
            </p>

            <button
              onClick={() =>
                setMode(prev => prev === 'login' ? 'register' : 'login')
              }
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </button>

            <Link to='/security/reset-password'>I forgot my password.</Link>
          </section>
        </section>

        <form className='login-right' onSubmit={handleSubmit}>
          <header className='login-right-header'>
            <h1>
              {mode === 'login' ? 'Sign in' : 'Create your account'}
            </h1>
            <h2>
              {mode === 'login'
                ? 'Enter your credentials.'
                : 'Fill in your details.'}
            </h2>
          </header>

          <section className='login-inputs'>
            {mode === 'register' && (
              <article className='login-right-input'>
                <i className='fa-regular fa-user' />
                <input
                  name="username"
                  type="text"
                  maxLength={17}
                  placeholder='Username'
                  value={form.username}
                  onChange={handleChange}
                />
              </article>
            )}

            {mode === 'login' && (
              <article className='login-right-input'>
                <i className='fa-regular fa-user' />
                <input
                  name="username"
                  type="text"
                  maxLength={17}
                  placeholder='Username'
                  value={form.username}
                  onChange={handleChange}
                />
              </article>
            )}

            {mode === 'register' && (
              <article className='login-right-input'>
                <i className='fa-regular fa-envelope' />
                <input
                  name="email"
                  type="email"
                  placeholder='Email'
                  value={form.email}
                  onChange={handleChange}
                />
              </article>
            )}

            <article className='login-right-input'>
              <i
                className={`fa-regular ${showPass ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={() => setShowPass(prev => !prev)}
                style={{ cursor: 'pointer' }}
              />
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
              />
            </article>
          </section>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? (<img src='https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZzA3bnk5ZjBhOGdkZTJuaXBrZnJyb2s1NDFqeDV4aXlwemo3b202diZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/L05HgB2h6qICDs5Sms/source.gif' />)
              : mode === 'login'
                ? 'Login'
                : 'Register'}
          </button>

          {mode === 'login' ? (
            <p className="login-switch">
              Don’t have an account?
              <span onClick={() => setMode('register')}>
                Register
              </span>
            </p>
          ) : (
            <p className="login-switch">
              Already have an account?
              <span onClick={() => setMode('login')}>
                Login
              </span>
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default Login

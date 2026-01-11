import '../css/login.css'
import icon from '../assets/svg/icon-dark.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)

    try {
      const endpoint =
        mode === 'login'
          ? '/api/auth/login'
          : '/api/auth/register'

      const payload =
        mode === 'login'
          ? {
            email: form.email,
            password: form.password
          }
          : {
            name: form.name,
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

            <Link>I forgot my password.</Link>
          </section>
        </section>

        <section className='login-right'>
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
                  name="name"
                  type="text"
                  placeholder='Name'
                  value={form.name}
                  onChange={handleChange}
                />
              </article>
            )}

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
            {loading
              ? 'Please wait...'
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
        </section>
      </section>
    </main>
  )
}

export default Login

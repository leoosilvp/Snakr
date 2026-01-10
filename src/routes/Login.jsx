import '../css/login.css'
import icon from '../assets/svg/icon-dark.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [mode, setMode] = useState('register')
  const [showPass, SetShowPass] = useState()

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

            <button onClick={() => setMode(prev => prev === 'login' ? 'register' : 'login')}>
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
                <input type="text" placeholder='Name' />
              </article>
            )}

            <article className='login-right-input'>
              <i className='fa-regular fa-envelope' />
              <input type="email" placeholder='Email' />
            </article>

            <article className='login-right-input'>
              <i className={`fa-regular ${showPass ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => SetShowPass(prev => !prev)} />
              <input type={showPass ? 'text' : 'password'} placeholder='Password' />
            </article>
          </section>

          <button>
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </section>
      </section>
    </main>
  )
}

export default Login

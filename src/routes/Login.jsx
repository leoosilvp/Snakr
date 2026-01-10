import '../css/login.css'
import icon from '../assets/svg/icon-dark.svg'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main className="login-main">
      <section className='login-card'>
        <section className='login-left'>
          <header className='login-left-header'>
            <img src={icon} alt="logo snakr" />
            <h2>All your games. One place.</h2>
          </header>

          <section className='login-left-content'>
            <h1>It's so good to have you back!</h1>
            <p>Access your account right now.</p>

            <button>Login</button>

            <Link>I forgot my password.</Link>
          </section>
        </section>

        <section className='login-right'>
          <header className='login-right-header'>
            <h1>Create your account</h1>
            <h2>Fill in your details.</h2>
          </header>

          <section className='login-inputs'>
            <article className='login-right-input'>
              <i className='fa-regular fa-user' />
              <input type="text" placeholder='Name' />
            </article>

            <article className='login-right-input'>
              <i className='fa-regular fa-envelope' />
              <input type="email" placeholder='Email' />
            </article>

            <article className='login-right-input'>
              <i className='fa-regular fa-eye-slash' />
              <input type="password" placeholder='Password' />
            </article>
          </section>

          <button>Register</button>
        </section>
      </section>
    </main>
  )
}

export default Login

import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth'
import { useUser } from '../../hooks/useUser'

const Security = () => {

  const navigate = useNavigate()
  const { user } = useUser();

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      await logout()
      navigate('/login', { replace: true })
      window.location.reload()
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <section className="settings-security">
      <i className="fa-solid fa-fingerprint persona" />

      <h1>E-mail</h1>
      <input className='readOnly' type="text" defaultValue={user?.email} readOnly />
      <button className='reset-password disabled'>Change email address</button>

      <h1>Password</h1>
      <input className='readOnly' type="password" value={'**************'} readOnly />
      <button className='reset-password' onClick={() => window.location.href = '/security/reset-password'}>Reset password</button>

      <hr />

      <section className='settings-security-session'>
        <h2>Log out of this device</h2>
        <button onClick={handleLogout}>Sign out</button>
      </section>

      <hr />

      <section className='settings-security-all-session'>
        <div className='settings-security-session'>
          <h2>Sign out on all devices</h2>
          <button className='active' onClick={handleLogout}>Log out for everyone</button>
        </div>
        <p>Sign out of all active sessions on all devices, including your current session. It may take up to 15 minutes for other devices to sign out.</p>
      </section>

      <hr />
    </section>
  )
}

export default Security

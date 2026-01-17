import { useUser } from '../../hooks/useUser'

const Security = () => {

  const { user } = useUser();

  return (
    <section className="settings-security">
      <i class="fa-solid fa-fingerprint persona" />

      <h1>E-mail</h1>
      <input type="text" defaultValue={user?.email} />

      <h1>Password</h1>
      <input className='readOnly' type="password" value={'**************'} readOnly />
      <button className='reset-password'>Reset password</button>

      <hr />

      <section className='settings-security-session'>
        <h2>Log out of this device</h2>
        <button>Sign out</button>
      </section>

      <hr />

      <section className='settings-security-all-session'>
        <div className='settings-security-session'>
          <h2>Sign out on all devices</h2>
          <button className='active'>Log out for everyone</button>
        </div>
        <p>Sign out of all active sessions on all devices, including your current session. It may take up to 15 minutes for other devices to sign out.</p>
      </section>

      <hr />
    </section>
  )
}

export default Security

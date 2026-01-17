import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { Link } from 'react-router-dom'

const General = () => {

  const { user } = useUser()
  const [background, setBackground] = useState(user?.settings?.appearance?.background || '')

  return (
    <section className="settings-general">
      <h2>Appearance</h2>
      <hr />
      <h1>Theme</h1>
      <select defaultValue={user?.settings?.appearance?.theme}>
        <option value="System">System</option>
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
      </select>

      <h1>Background</h1>
      <input type="text" value={background} onChange={e => setBackground(e.target.value)} />
      <p>Personalize your profile by adding a background.</p>


      <h2>Privacy</h2>
      <hr />
      <h1>Profile</h1>
      <select value={user?.settings?.profile?.isPublic}>
        <option value={true}>Public</option>
        <option value={false}>Private</option>
      </select>
      <p>Private profiles do not appear in public searches or social interactions.</p>


      <h2>Language & Region</h2>
      <hr />
      <h1>Language</h1>
      <select value={user?.settings?.appearance?.language}>
        <option value={'pt-BR'}>🇧🇷 Portuguese</option>
        <option value={'en-US'}>🇺🇸 English</option>
        <option value={'es-ES'}>🇪🇸 Spanish</option>
      </select>
      <p>The language used in its interface.</p>

      <h1>Country</h1>
      <input type="text" defaultValue={user?.profile?.country} />
      <p>We use this to recommend events near you.</p>


      <h2>About</h2>
      <hr />
      <h1>System status</h1>
      <Link to='/status'><div />Check status</Link>

      <h1>Version</h1>
      <p>Snakr V.0.5.5</p>

    </section>
  )
}

export default General

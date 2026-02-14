import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { Link } from 'react-router-dom'

const DEFAULT_GENERAL = {
  settings: {
    appearance: {
      frame: '',
      theme: 'System',
      background: '',
      language: 'pt-BR'
    },
    profile: {
      isPublic: true
    }
  },
  profile: {
    country: ''
  }
}

const General = () => {
  const { user } = useUser()
  const { updateUser } = useUpdateUser()

  const [general, setGeneral] = useState(null)

  useEffect(() => {
    if (!user) return

    setGeneral({
      ...DEFAULT_GENERAL,
      ...user,
      settings: {
        ...DEFAULT_GENERAL.settings,
        ...user.settings
      },
      profile: {
        ...DEFAULT_GENERAL.profile,
        ...user.profile
      }
    })
  }, [user])

  if (!general) return null

  const updateSetting = (path, value) => {
    setGeneral(prev => {
      const clone = structuredClone(prev)
      const keys = path.split('.')
      let ref = clone

      keys.slice(0, -1).forEach(k => {
        ref[k] ??= {}
        ref = ref[k]
      })

      ref[keys[keys.length - 1]] = value
      return clone
    })

    updateUser(path, value)
  }

  return (
    <section className="settings-general">
      <h2>Appearance</h2>
      <hr />

      <h1>Theme</h1>
      <select
        value={general.settings.appearance.theme}
        onChange={e =>
          updateSetting('settings.appearance.theme', e.target.value)
        }
      >
        <option value="System">System</option>
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
      </select>

      <h1>Background</h1>
      <input
        type="text"
        value={general.settings.appearance.background}
        onChange={e =>
          updateSetting('settings.appearance.background', e.target.value)
        }
      />
      <p>Personalize your profile by adding a background.</p>

      <h1>Profile frame</h1>
      <input
        type="text"
        value={general.settings.appearance.frame}
        onChange={e =>
          updateSetting('settings.appearance.frame', e.target.value)
        }
      />
      <p>Personalize your profile with a unique profile frame.</p>

      <h2>Privacy</h2>
      <hr />

      <h1>Profile</h1>
      <select
        value={String(general.settings.profile.isPublic)}
        onChange={e =>
          updateSetting('settings.profile.isPublic', e.target.value === 'true')
        }
      >
        <option value="true">Public</option>
        <option value="false">Private</option>
      </select>

      <p>
        Private profiles do not appear in public searches or social interactions.
      </p>

      <h2>Language & Region</h2>
      <hr />

      <h1>Language</h1>
      <select
        value={general.settings.appearance.language}
        onChange={e =>
          updateSetting('settings.appearance.language', e.target.value)
        }
      >
        <option value="pt-BR">🇧🇷 Portuguese</option>
        <option value="en-US">🇺🇸 English</option>
        <option value="es-ES">🇪🇸 Spanish</option>
      </select>

      <p>The language used in its interface.</p>

      <h1>Country</h1>
      <input
        type="text"
        value={general.profile.country}
        onChange={e =>
          updateSetting('profile.country', e.target.value)
        }
      />
      <p>We use this to recommend events near you.</p>

      <h2>About</h2>
      <hr />

      <h1>System status</h1>
      <Link to="/status">
        <div />Check status
      </Link>

      <h1>Version</h1>
      <p>Snakr V.0.6.4</p>
    </section>
  )
}

export default General

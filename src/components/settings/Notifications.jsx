import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useUpdateUser } from '../../hooks/useUpdateUser'

const DEFAULT_NOTIFICATIONS = {
  enabled: true,
  email: { securityAlerts: true, productUpdates: true, marketing: false },
  inApp: { achievements: true, friendsActivity: true, libraryActivity: true },
  push: { enabled: false }
}

const Notifications = () => {
  const { user } = useUser()
  const { updateUser } = useUpdateUser()

  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    if (!user?.settings?.notifications) return

    setNotifications({
      ...DEFAULT_NOTIFICATIONS,
      ...user.settings.notifications,
      email: { ...DEFAULT_NOTIFICATIONS.email, ...user?.settings?.notifications?.email },
      inApp: { ...DEFAULT_NOTIFICATIONS.inApp, ...user?.settings?.notifications?.inApp },
      push: { ...DEFAULT_NOTIFICATIONS.push, ...user?.settings?.notifications?.push }
    })
  }, [user])

  if (!notifications) return null

  const updateSetting = (path, value) => {
    setNotifications(prev => {
      const clone = structuredClone(prev)
      const keys = path.split('.')
      let ref = clone
      keys.slice(0, -1).forEach(k => { ref[k] ??= {}; ref = ref[k] })
      ref[keys[keys.length - 1]] = value
      return clone
    })
    updateUser(`settings.notifications.${path}`, value)
  }

  return (
    <section className="settings-notifications">
      <h1>Notifications</h1>

      <select value={String(notifications?.enabled)} onChange={e => updateSetting('enabled', e.target.value === 'true')}>
        <option value="true">Enabled</option>
        <option value="false">Disabled</option>
      </select>
      <h2>Enable or disable all Snakr notifications at once.</h2>

      <h1>Email Notifications</h1>
      <hr />
      <div className={`settings-notifications-checkbox ${notifications.enabled ? '' : 'disabled'}`}>
        <div>
          <label className="switch">
            <input id="security-alerts" type="checkbox" checked={notifications.email.securityAlerts} onChange={e => updateSetting('email.securityAlerts', e.target.checked)} />
            <span className="slider" />
          </label>
          <label htmlFor="security-alerts">Security alerts</label>
        </div>
        <p>We will send you important notifications related to your account security.</p>

        <div>
          <label className="switch">
            <input id="product-updates" type="checkbox" checked={notifications.email.productUpdates} onChange={e => updateSetting('email.productUpdates', e.target.checked)} />
            <span className="slider" />
          </label>
          <label htmlFor="product-updates">Product updates</label>
        </div>
        <p>Receive emails about new features and improvements to Snakr.</p>

        <div>
          <label className="switch">
            <input id="marketing-emails" type="checkbox" checked={notifications.email.marketing} onChange={e => updateSetting('email.marketing', e.target.checked)} />
            <span className="slider" />
          </label>
          <label htmlFor="marketing-emails">Marketing emails</label>
        </div>
        <p>Receive offers, announcements, and promotional communications.</p>
      </div>

      <h1>In-App Notifications</h1>
      <hr />
      <div className={`settings-notifications-checkbox ${notifications.enabled ? '' : 'disabled'}`}>
        <div>
          <label className="switch">
            <input id="achievements" type="checkbox" checked={notifications.inApp.achievements} onChange={e => updateSetting('inApp.achievements', e.target.checked)} />
            <span className="slider" />
          </label>
          <label htmlFor="achievements">Achievements</label>
        </div>
        <p>It displays notifications when you unlock new achievements.</p>

        <div>
          <label className="switch">
            <input id="friends-activity" type="checkbox" checked={notifications.inApp.friendsActivity} onChange={e => updateSetting('inApp.friendsActivity', e.target.checked)} />
            <span className="slider" />
          </label>
          <label htmlFor="friends-activity">Friends activity</label>
        </div>
        <p>Find out when friends are doing new activities or achieving new goals.</p>

        <div>
          <label className="switch">
            <input id="library-activity" type="checkbox" checked={notifications.inApp.libraryActivity} onChange={e => updateSetting('inApp.libraryActivity', e.target.checked)} />
            <span className="slider" />
          </label>
          <label htmlFor="library-activity">Library activity</label>
        </div>
        <p>Receive alerts about new games added to your library.</p>
      </div>

      <h1>Push Notifications</h1>
      <hr />

      <div className={`settings-notifications-checkbox ${notifications.enabled ? '' : 'disabled'}`}>
        <div>
          <label className="switch">
            <input id="enable-push" type="checkbox" checked={notifications.push.enabled} onChange={e => updateSetting('push.enabled', e.target.checked)} />
            <span className="slider" />
          </label>
          <label htmlFor="enable-push">Enable push notifications</label>
        </div>
        <p>Receive instant alerts directly on your device.</p>
      </div>
    </section>
  )
}

export default Notifications

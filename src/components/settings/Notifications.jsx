import { useUser } from '../../hooks/useUser'

const Notifications = () => {

  const { user } = useUser();

  const email = user?.settings?.notifications?.email
  const inApp = user?.settings?.notifications?.inApp
  const push = user?.settings?.notifications?.push

  return (
    <section className="settings-notifications">
      <h1>Notifications</h1>
      <select value={user?.settings?.notifications?.enabled}>
        <option value={true}>Enabled</option>
        <option value={false}>Disabled</option>
      </select>
      <h2>Enable or disable all Snakr notifications at once.</h2>

      <h1>Email Notifications</h1>
      <hr />
      <div className="settings-notifications-checkbox">
        <div>
          <label className="switch">
            <input id="security-alerts" checked={email?.securityAlerts} type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="security-alerts">Security alerts</label>
        </div>
        <p>We will send you important notifications related to your account security.</p>

        <div>
          <label className="switch">
            <input id="product-updates" checked={email?.productUpdates} type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="product-updates">Product updates</label>
        </div>
        <p>Receive emails about new features and improvements to Snakr.</p>

        <div>
          <label className="switch">
            <input id="marketing-emails" checked={email?.marketing} type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="marketing-emails">Marketing emails</label>
        </div>
        <p>Receive offers, announcements, and promotional communications.</p>
      </div>

      <h1>In-App Notifications</h1>
      <hr />
      <div className="settings-notifications-checkbox">
        <div>
          <label className="switch">
            <input id="achievements" checked={inApp?.achievements} type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="achievements">Achievements</label>
        </div>
        <p>It displays notifications when you unlock new achievements.</p>

        <div>
          <label className="switch">
            <input id="friends-activity" checked={inApp?.friendsActivity} type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="friends-activity">Friends activity</label>
        </div>
        <p>Find out when friends are doing new activities or achieving new goals.</p>

        <div>
          <label className="switch">
            <input id="library-activity" checked={inApp?.libraryActivity} type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="library-activity">Library activity</label>
        </div>
        <p>Receive alerts about new games added to your library.</p>
      </div>

      <h1>Push Notifications</h1>
      <hr />
      <div className="settings-notifications-checkbox">
        <div>
          <label className="switch">
            <input id="enable-push" checked={push?.enabled} type="checkbox" />
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

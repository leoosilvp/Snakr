
const Notifications = () => {
  return (
    <section className="settings-notifications">
      <h1>Notifications</h1>
      <select >
        <option value={true}>Enabled</option>
        <option value={true}>Disabled</option>
      </select>
      <h2>Enable or disable all Snakr notifications at once.</h2>

      <h1>Email Notifications</h1>
      <hr />
      <div className="settings-notifications-checkbox">
        <div>
          <label className="switch">
            <input id="security-alerts" type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="security-alerts">Security alerts</label>
        </div>
        <p>We will send you important notifications related to your account security.</p>

        <div>
          <label className="switch">
            <input id="product-updates" type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="product-updates">Product updates</label>
        </div>
        <p>Receive emails about new features and improvements to Snakr.</p>

        <div>
          <label className="switch">
            <input id="marketing-emails" type="checkbox" />
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
            <input id="achievements" type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="achievements">Achievements</label>
        </div>
        <p>It displays notifications when you unlock new achievements.</p>

        <div>
          <label className="switch">
            <input id="friends-activity" type="checkbox" />
            <span className="slider" />
          </label>
          <label htmlFor="friends-activity">Friends activity</label>
        </div>
        <p>Find out when friends are doing new activities or achieving new goals.</p>

        <div>
          <label className="switch">
            <input id="library-activity" type="checkbox" />
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
            <input id="enable-push" type="checkbox" />
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

import { Link } from "react-router-dom"

const Support = () => {
  return (
    <section className="settings-support">
      <h1 style={{textDecoration: 'none'}}>If you need help with Snakr, you've come to the right place. Here we've compiled basic guidelines to help you resolve common issues and make your experience on the platform easier.</h1>
      
      <hr />

      <h1>FAQ</h1>
      <h2>What is Snakr?</h2>
      <p>Snakr is a gaming platform that allows you to discover, organize, and manage your game library in one place, offering catalog features, a personal library, profiles, and integration with external services like Steam.</p>
      
      <h2>Do I need a Steam account to use Snakr?</h2>
      <p>Not necessarily.</p>
      <p>You can use Snakr without integrating your Steam account, however integration unlocks additional features, such as:</p>
      <ul>
        <li>Game import</li>
        <li>Display of achievements</li>
        <li>Detailed profile information</li>
      </ul>

      <h2>Does Snakr access my private Steam data?</h2>
      <p>No!</p>
      <p>Snakr uses only public data, as permitted by Steam, fully respecting Valve's policies and user privacy.</p>

      <h2>Can I use Snakr on any device?</h2>
      <p>Yes</p>
      <p>Snakr is designed to work on modern browsers and desktop devices. Mobile support may vary depending on the interface.</p>

      <h2>Does Snakr allow downloading games?</h2>
      <p>No</p>
      <p>Snakr does not host, distribute, or provide game downloads. It functions as a platform for organizing, discovering, and managing information about games.</p>

      <h2>Is Snakr affiliated with Steam or Valve?</h2>
      <p>No</p>
      <p>Snakr is an independent project and has no official affiliation with Valve or Steam. All trademarks belong to their respective owners.</p>

      <h2>Change profile picture</h2>
      <p>Go to Settings and under Account, upload a new image. The file must be in PNG, JPG, JPEG, or Gif format, be a maximum of 20 MB, and preferably 500x500 pixels.</p>
      
      <h2>How do I change my profile background?</h2>
      <p>Go to Settings and under Appearance upload your new background. The file must be in PNG, JPG, JPEG, ou Gif format, be a maximum of 20 MB, and preferably 1920x800 pixels.</p>

      <hr />

      <h1>Common Problems</h1>
      <h2>Error sending profile picture/background</h2>
      <p>Make sure the file complies with the rules:</p>
      <ul>
        <li>Máx. 20 MB</li>
        <li>PNG, JPG, JPEG or Gif</li>
        <li>Ideal profile picture size: 500x500 pixels</li>
        <li>Ideal background size: 1920x800 pixels</li>
      </ul>

      <h2>My Steam account won't connect to Snakr.</h2>
      <p>Possible causes:</p>
      <ul>
        <li>Private Steam Profile</li>
        <li>Temporary error on Steam Web</li>
        <li>Invalid Steam ID</li>
      </ul>
      <p>How to solve:</p>
      <ul>
        <li>Check if your Steam profile is set to Public.</li>
        <li>Try disconnecting and reconnecting your Steam account.</li>
        <li>Please wait a few minutes and try again (Steam may be experiencing instability).</li>
      </ul>

      <h2>I receive a 404 error or a blank page.</h2>
      <p>Possible causes:</p>
      <ul>
        <li>Invalid route</li>
        <li>Direct navigation to a subroute</li>
        <li>Outdated cache</li>
      </ul>
      <p>How to solve:</p>
      <ul>
        <li>Go back to the Home page and browse again.</li>
        <li>Refresh the page</li>
        <li>Please check that the URL is correct.</li>
      </ul>

      <hr />

      <h2>Important Note!</h2>
      <p>Some issues may be related to external services, such as the Steam Web API. In these cases, functionality depends on the availability of these services.</p>

      <hr />

      <h1>Contact</h1>
      <h2>If you still need help, contact our team:</h2>
      <Link><i className="fa-solid fa-headset" /> Contact Support</Link>
    </section>
  )
}

export default Support

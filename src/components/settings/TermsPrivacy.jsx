import { Link } from "react-router-dom"

const TermsPrivacy = () => {
  return (
    <section className="settings-terms-privacy">
      <h1 style={{ textDecoration: 'none' }}>
        These Terms of Use and Privacy Policy govern the use of Snakr. By accessing or using the platform, you agree to the conditions described below.
      </h1>

      <hr />

      <h1>Terms of Use</h1>

      <h2>What is Snakr?</h2>
      <p>
        Snakr is a digital platform designed to help users organize, view, and manage information related to games, personal libraries, and user profiles, including optional integrations with third-party services such as Steam.
      </p>

      <h2>Eligibility</h2>
      <p>
        By using Snakr, you confirm that you have the legal capacity to accept these terms and that you will use the platform in compliance with applicable laws.
      </p>

      <h2>User Account Responsibility</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for all activities performed under your account.
      </p>

      <h2>Third-Party Integrations</h2>
      <p>
        Snakr may integrate with external services such as Steam, strictly using public data made available through official APIs and only with user authorization.
      </p>
      <p>
        Snakr is not affiliated with Valve Corporation or Steam.
      </p>

      <h2>Prohibited Use</h2>
      <ul>
        <li>Using Snakr for illegal purposes</li>
        <li>Attempting to access internal systems without authorization</li>
        <li>Exploiting security vulnerabilities</li>
        <li>Copying or redistributing platform content without permission</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All elements of Snakr, including brand, design, source code, and visual identity, are protected by intellectual property laws.
      </p>

      <h2>Service Availability</h2>
      <p>
        Snakr is provided “as is” and may undergo maintenance, updates, or temporary downtime without prior notice.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Snakr is not responsible for failures caused by third-party services, external factors, or indirect damages resulting from the use of the platform.
      </p>

      <hr />

      <h1>Privacy Policy</h1>

      <h2>Commitment to Privacy</h2>
      <p>
        Snakr is committed to protecting user privacy and processes personal data in accordance with applicable data protection laws, including the LGPD.
      </p>

      <h2>Data We Collect</h2>
      <p>We may collect the following data:</p>
      <ul>
        <li>Username and email address</li>
        <li>Profile picture</li>
        <li>User preferences and settings</li>
        <li>Public Steam profile data (when integrated)</li>
      </ul>

      <h2>Steam Data Usage</h2>
      <p>
        When authorized, Snakr may access public Steam data such as:
      </p>
      <ul>
        <li>Steam ID</li>
        <li>Avatar and profile name</li>
        <li>Public game library</li>
        <li>Achievements</li>
        <li>Playtime information</li>
      </ul>
      <p>
        Snakr does not access private messages, financial data, or purchase history.
      </p>

      <h2>How We Use Your Data</h2>
      <ul>
        <li>To operate and maintain the platform</li>
        <li>To personalize user experience</li>
        <li>To ensure security and prevent fraud</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        Snakr does not sell or trade personal data. Data is shared only when necessary for technical operation or legal compliance.
      </p>

      <h2>Data Security</h2>
      <p>
        We apply technical and organizational measures to protect user data against unauthorized access, loss, or misuse.
      </p>

      <h2>User Rights</h2>
      <p>
        Users may request access, correction, or deletion of their personal data at any time through the support channels.
      </p>

      <h2>Cookies</h2>
      <p>
        Snakr uses cookies to maintain sessions, improve performance, and analyze platform usage. You may disable cookies in your browser settings.
      </p>

      <hr />

      <h2>Changes to These Terms</h2>
      <p>
        Snakr may update these Terms of Use and Privacy Policy periodically. Any significant changes will be communicated through the platform.
      </p>

      <hr />

      <h1>Contact</h1>
      <h2>If you have any questions about these terms:</h2>
      <Link>
        <i className="fa-solid fa-headset" /> Contact Support
      </Link>
    </section>
  )
}

export default TermsPrivacy

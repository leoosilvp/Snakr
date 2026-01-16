import '../css/settings.css'
import { Link, Outlet } from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"

const Settings = () => {
    return (
        <main className="settings-main">
            <Header sub />

            <section className='settings-main-content'>
                <div className='settings-main-header'>
                    <h1>Settings</h1>
                </div>

                <hr />

                <section className='settings-main-area'>
                    <aside className='settings-main-nav'>
                        <ul>
                            <Link to='general'><i className='fa-solid fa-gear' /> General</Link>
                            <Link to='account'><i className='fa-regular fa-circle-user' /> Account</Link>
                            <Link to='notifications'><i className='fa-regular fa-bell' /> Notifications</Link>
                            <Link to='apparence'><i className='fa-solid fa-paintbrush' /> Apparence</Link>
                            <Link to='security'><i className='fa-solid fa-fingerprint' /> Security</Link>
                            <Link to='support'><i className='fa-regular fa-life-ring' /> Support</Link>
                            <Link to='accessibility'><i className='fa-solid fa-person' /> Accessibility</Link>
                            <Link to='terms and privacy'><i className='fa-regular fa-address-book' /> Terms and privacy</Link>
                        </ul>
                    </aside>

                    <section className='settings-area'>
                        <Outlet />
                    </section>
                </section>

            </section>

            <Footer />
        </main>
    )
}

export default Settings

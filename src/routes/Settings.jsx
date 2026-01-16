import '../css/settings.css'
import { NavLink, Outlet } from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"

const Settings = () => {
    return (
        <main className="settings-main">
            <Header />

            <section className='settings-main-content'>
                <div className='settings-main-header'>
                    <h1>Settings</h1>
                </div>

                <hr />

                <section className='settings-main-area'>
                    <aside className='settings-main-nav'>
                        <ul>
                            <NavLink to='general'><i className='fa-solid fa-gear' /> General</NavLink>
                            <NavLink to='account'><i className='fa-regular fa-circle-user' /> Account</NavLink>
                            <NavLink to='notifications'><i className='fa-regular fa-bell' /> Notifications</NavLink>
                            <NavLink to='apparence'><i className='fa-solid fa-paintbrush' /> Apparence</NavLink>
                            <NavLink to='security'><i className='fa-solid fa-fingerprint' /> Security</NavLink>
                            <NavLink to='support'><i className='fa-regular fa-life-ring' /> Support</NavLink>
                            <NavLink to='accessibility'><i className='fa-solid fa-person' /> Accessibility</NavLink>
                            <NavLink to='terms and privacy'><i className='fa-regular fa-address-book' /> Terms and privacy</NavLink>
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

import '../css/settings.css'
import { NavLink, Outlet } from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Bell, Book, LifeBuoy, Settings as Set, User,  } from '@geist-ui/icons'


const Settings = () => {
    return (
        <main className="settings-main">
            <Header />

            <section className='settings-main-content'>
                <div className='settings-main-header'>
                    <h1>Settings</h1>
                </div>

                <hr className='settings-header-line' />

                <section className='settings-main-area'>
                    <aside className='settings-main-nav'>
                        <ul>
                            <NavLink to='general'><Set size={16} /> General</NavLink>
                            <NavLink to='account'><User size={16}/> Account</NavLink>
                            <NavLink to='notifications'><Bell size={16}/> Notifications</NavLink>
                            <NavLink to='steam'><i className='fa-brands fa-steam-symbol' /> Steam</NavLink>
                            <NavLink to='security'><i className='fa-solid fa-fingerprint' /> Security</NavLink>
                            <NavLink to='support'><LifeBuoy size={16}/> Support</NavLink>
                            <NavLink to='terms and privacy'><Book size={16}/> Terms and privacy</NavLink>
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

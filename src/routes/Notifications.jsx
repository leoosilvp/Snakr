import '../css/notifications-page.css'
import Header from "../components/Header"
import Footer from "../components/Footer"


const Notifications = () => {

    return (
        <main className='notifications-main'>
            <Header />
            <section className='notifications-content'>
                <header className='notifications-content-header'>
                    <section className='notifications-content-header-left'>
                        <button className='active'>All</button>
                        <button>Unread <span>0</span></button>
                    </section>
                    <section className='notifications-content-header-right'>
                        <button>Mark all as read</button>
                        <button>Clear all</button>
                    </section>
                </header>
            </section>
            <Footer />
        </main>
    )
}

export default Notifications
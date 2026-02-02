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
                <section className='notifications-grid'>
                    <article className='notification'>
                        <section className='notification-left'>
                            <div />
                            <section className='notification-left-content'>
                                <section className='notification-left-icon'>
                                    <i className='fa-regular fa-bell' />
                                </section>
                                <section>
                                    <h1>Versão 3.8.1 disponivel</h1>
                                    <h2>Aproveite o que o Snakr tem de melhor para oferecer.</h2>
                                    <p><i className='fa-regular fa-clock' />3 dias</p>
                                </section>
                            </section>
                        </section>
                        <section className='notification-right'>
                            <button><i className='fa-solid fa-xmark' /></button>
                        </section>
                    </article>

                    <article className='notification read'>
                        <section className='notification-left'>
                            <div />
                            <section className='notification-left-content'>
                                <section className='notification-left-icon'>
                                    <i className='fa-regular fa-bell' />
                                </section>
                                <section>
                                    <h1>🎉 Bem-vindo ao Snakr!</h1>
                                    <h2>Olá user! Sua conta foi criada com sucesso. Explore a plataforma e aproveite!</h2>
                                    <p><i className='fa-regular fa-clock' />5 dias</p>
                                </section>
                            </section>
                        </section>
                        <section className='notification-right'>
                            <button><i className='fa-solid fa-xmark' /></button>
                        </section>
                    </article>
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default Notifications
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../css/gifts.css'

const Gifts = () => {
    return (
        <main className='gifts-main'>
            <Header />
            <section className='gifts-main-content'>
                <header className='gifts-main-content-header'>
                    <button>PC</button>
                    <button>Steam</button>
                    <button>Epic Games Store</button>
                    <button>GOG</button>
                    <button>Xbox</button>
                    <button>Playstation</button>
                    <button>Nitendo</button>
                    <button>Android</button>
                    <button>iOS</button>
                </header>
                <section className='gifts-main-cards'>
                    <article className='gift-card'>

                    </article>
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default Gifts

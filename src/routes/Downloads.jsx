import '../css/download.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Downloads = () => {
    return (
        <main className="download-main">
            <Header />
            <section className='download-content'>
                <header className='download-content-header'>
                    <h1>Downloads</h1>
                    <h1>0</h1>
                    <hr />
                </header>
            </section>
            <Footer />
        </main>
    )
}

export default Downloads

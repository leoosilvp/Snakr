import '../css/download.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Download } from '@geist-ui/icons'

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

                <section className='download-content-grid'>
                    <div className='no-downloads'>
                        <Download size={25} />
                        <p>No downloads in progress.</p>
                    </div>
                </section>
            </section>
            <Footer />
        </main>
    )
}

export default Downloads

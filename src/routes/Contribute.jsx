import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/contribute.css'

const Contribute = () => {
    const pixKey = ''

    const copyPix = async () => {
        await navigator.clipboard.writeText(pixKey)
    }

    return (
        <main className="contribute">
            <Header />

            <section className="contribute-container">

                <section className="contribute-hero">
                    <h1>Contribution to Snakr</h1>
                    <p>Snakr is an independent project developed with a focus on performance, user experience, and continuous improvement. Financial contributions allow the project to continue growing sustainably.</p>
                </section>


                <section className="contribute-section">
                    <h2>Why contribute?</h2>
                    <hr />
                    <p>Unlike commercial platforms, Snakr does not rely on intrusive advertising or the sale of data. Community support is essential to maintaining the project's quality, stability, and innovation.</p>
                </section>


                <section className="contribute-section">
                    <h2>How are the resources used?</h2>
                    <hr />

                    <div className="contribute-grid">
                        <div>
                            <h3>Infrastructure</h3>
                            <p>Costs of servers, storage, CDN, and services needed to keep the platform available and fast.</p>
                        </div>

                        <div>
                            <h3>Development</h3>
                            <p>Implementation of new features, refactoring, optimizations, and bug fixes.</p>
                        </div>

                        <div>
                            <h3>Maintenance</h3>
                            <p>Monitoring, security, technical updates, and continuous improvements to the system's foundation.</p>
                        </div>
                    </div>
                </section>


                <section className="contribute-section">
                    <h2>Contribute via PIX</h2>
                    <hr />

                    <div className="contribute-payment">
                        <img src='' alt="QR Code PIX" />

                        <div className="contribute-payment-info">
                            <span>PIX key</span>
                            <code>{pixKey}</code>

                            <button onClick={copyPix}>Copy PIX key</button>

                            <p>After payment, there is no need to send proof of payment. Your contribution is already part of the ongoing support for the project.</p>
                            <div>
                                <span>Account holder</span>
                                <p>Leonardo Silva - BTG Bank</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contribute-footer-note">
                    <p>Thank you for your interest in supporting Snakr. Every contribution is used responsibly and with a focus on the project's progress.</p>
                </section>

            </section>

            <Footer />
        </main>
    )
}

export default Contribute

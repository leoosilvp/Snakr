import { Link } from "react-router-dom"
import '../css/ads.css'

const Ads = () => {
    return (
        <article className="ads">
            <video src="https://anonymousai-hub.github.io/DB/video/upd-1.5.mp4" controls />
            <div className="ads-content">
                <h1>Bem-vindo Graham 1.5</h1>
                <p>Sua mais nova plataforma de inteligência artificial!</p>
                <Link>Saiba mais</Link>
            </div>
        </article>
    )
}

export default Ads

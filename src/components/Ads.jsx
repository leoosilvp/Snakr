import { useAds } from '../hooks/useAds'
import { Link } from "react-router-dom"
import '../css/ads.css'

const Ads = () => {

    const { ads, loading, error } = useAds()

    if (loading) {
        return <div className='ad-loading' />
    }

    if (error) {
        return <div className='ad-erro'>Erro: {error}</div>
    }

    if (!ads.length) {
        return <div className='ad-erro'>Nenhum anúncio disponível</div>
    }

    return (
        ads.map(ad => (
            <article className="ads">
                {ad.videoUrl && (
                    <video src={ad.videoUrl} controls preload='metadata' />
                )}
                {ad.imgUrl && (
                    <img src={ad.imgUrl} />
                )}
                <div className="ads-content">
                    <h1>{ad.title}</h1>
                    <p>{ad.description}</p>
                    <Link>Saiba mais</Link>
                </div>
            </article>
        ))
    )
}

export default Ads

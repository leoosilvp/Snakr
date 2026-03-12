import { ArrowRight } from "@geist-ui/icons"
import { Link } from "react-router-dom"
import logo from '../../assets/svg/logo.svg'

const FooterHome = () => {
    return (
        <footer className="home-footer">
            <img src={logo} />
            <h1>Looking for something specific?</h1>
            <p>Browse the full catalog with advanced filters by genre, platform, developer and more.</p>
            <Link to="/catalog" className="home-footer-btn">
                Explore Catalog
                <ArrowRight size={16} />
            </Link>
        </footer>
    )
}

export default FooterHome

import '../css/profile.css'
import Header from "../components/Header"
import Footer from "../components/Footer"
import background from '../assets/img/background-default.png'
import { useUser } from '../hooks/useUser'


const Profile = () => {

  const { user } = useUser();

  return (
    <main className="profile-main" style={{'--background-img' : `url(${user?.background || background})`}}> 
      <Header />

      <section className='profile-content'>

      </section>
      
      <Footer />
    </main>
  )
}

export default Profile

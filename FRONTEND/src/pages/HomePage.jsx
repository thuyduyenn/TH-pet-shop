
import HomeMain from "../components/homeComponent/homeSection/HomeMain"
import Services from "../components/homeComponent/ServicesSection/services"
import About from "../components/homeComponent/AboutSection/About"
import Contact from "../components/homeComponent/ContactSection/Contact"
import Footer from "../components/homeComponent/FooterSection/Footer"

const HomePage = () => {
     
    return ( 
        <div className="home-page">
              <HomeMain/>
              <Services/>
              <About/>
              <Contact/>
              <Footer/>
        </div>
     );
}
 
export default HomePage;
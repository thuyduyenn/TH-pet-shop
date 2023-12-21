import Navbar from "./Navbar"
import Introduce from "./Introduce"
const HomeMain = () => {
    return ( 
    <section className="home-section">
         <div className="home-div">
              <Navbar/>
              <Introduce/>
         </div>
    </section> 
    );
}
 
export default HomeMain;
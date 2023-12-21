import {AiFillHome} from "react-icons/ai"
import { FaFacebookSquare,FaTelegramPlane,FaLinkedin } from "react-icons/fa"
import {AiFillInstagram } from "react-icons/ai"
import {SiZalo } from "react-icons/si"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
const Footer = () => {
     const {initialData} = useContext(AuthContext)
    return ( 
        <section className="footer-section" >
               <ul>
                   <li>
                       <h2> Let's<span> Connect</span> there</h2>
                       <div className="homeBtn">
                           <div><AiFillHome /></div>
                           <div>Trang chủ</div>
                       </div>
                   </li>
                   <li>
                   </li>
                   <li>
                        <div className="logo-and-contact">
                             <div className="logo-footer">
                                  <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1699429697/initialDataPetShop/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2023-11-08_lu%CC%81c_14.45.49-removebg-preview_hioimb.png" alt="logo"></img>
                             </div>
                             <div className="social">
                                  <div><a href={initialData?.Facebook} style={{color:"#fff"}}><FaFacebookSquare /></a></div>
                                  <div><a href={initialData?.Instagram} style={{color:"#fff"}}><AiFillInstagram /></a></div>
                                  <div><a href={initialData?.Telegram} style={{color:"#fff"}}><FaTelegramPlane /></a></div>
                                  <div><a href={initialData?.Zalo} style={{color:"#fff"}}><SiZalo /></a></div>
                                  <div><a href={initialData?.Linkedin} style={{color:"#fff"}}><FaLinkedin /></a></div>
                             </div>
                        </div>
                           
                      <div className="navbar-footer">
                           <div className="label">Navigate</div>
                           <div>home</div>
                           <div>services</div>
                           <div>about us</div>
                           <div>contact</div>
                      </div>
                      <div className="connect-footer">
                            <div className="label">Connect</div>
                            <div>086 687 0204</div>
                            <div>thuyduyen090204@gmail.com</div>
                            <div>example</div>
                            <div>1E 182 Lã Xuân Oai,Q9</div>
                      </div>
                   </li>
                   <li></li>
                   <li>le thi thuy duyen</li>
               </ul>
        </section>
     );
}
 
export default Footer;
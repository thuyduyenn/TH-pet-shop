import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {BsTelephoneInboundFill} from "react-icons/bs"
import {FaShopify} from "react-icons/fa"
import {Link} from "react-router-dom"
const Services = () => {
    const {initialData} = useContext(AuthContext)
    return ( 
        <section className="services-section">
              <div className="mark-services">
                   <div>
                       <div></div>
                       <h3>Services</h3>
                   </div>
                   <h1>SERVICES</h1>
                   <h2>My <span>Services</span></h2>
              </div>
              <div className="top">
                   <div className="left">
                        <div>
                               <img src={initialData?.imageCutService.url} alt=""></img>
                        </div>
                   </div>
                   <div className="right">
                        <h1>Cắt tỉa</h1>
                        <div className="text-intro">{initialData?.textCutService}</div>
                        <div className="price">
                             <div>
                             <ul>
                                   <li>
                                        <h5>15 - 20 ks</h5>
                                        <div></div>
                                        <h6>600 - 700</h6>
                                   </li>
                                   <li>
                                        <h5>20 - 30 kg</h5>
                                        <div></div>
                                        <h6>700 - 750</h6>
                                   </li>
                                   <li>
                                        <h5>30 kg</h5>
                                        <div></div>
                                        <h6>750 - 1000</h6>
                                   </li>
                              </ul>
                              <div className="contactBtn">
                                    <div><BsTelephoneInboundFill/></div>
                                    <div> Liên hệ ngay </div>
                              </div>
                             </div>
                              
                        </div>
                   </div>
              </div>
              <div className="bottom">
                    <div className="left">
                            <div></div>
                            <div>
                                <div>
                                    <h1>Phẩu thuật</h1>
                                    <div className="text-intro">{initialData?.textSurgeryService}</div>
                                    <div className="contactBtn">
                                        <div><BsTelephoneInboundFill/></div>
                                        <div> Liên hệ ngay </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="right">
                          <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1699425293/initialDataPetShop/xuaolwcax0hlxw8317dj.png" alt=""/>
                    </div>
              </div>
              <div className="end">
                    <h1>Thức ăn <span>Ngon</span></h1>
                    <div>
                         <div className="left">
                            <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1699425294/initialDataPetShop/kzqgwqrqiyxqxxzottvo.png" alt=""/>
                         </div>
                        
                         <div className="bottom">
                              <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1699425297/initialDataPetShop/f42auxd4fddlmhi7c6s9.png" alt=""></img>
                           
                         </div>
                         <div className="right">
                                   <div className="text-intro">{initialData?.textFoodService}</div>
                                   <Link to="/shop" style={{color:"#001830"}}>
                                   <div className="shopBtn">
                                          <div><FaShopify/></div>
                                          <div>Shop now</div>
                                   </div>
                                   </Link>
                           </div>
                    </div>
              </div>
        </section>
     );
}
 
export default Services;
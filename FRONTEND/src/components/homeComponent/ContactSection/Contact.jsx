import {MdPhoneInTalk,MdEmail  } from "react-icons/md"
import {GrSkype} from "react-icons/gr"
import {FaMapMarkerAlt} from "react-icons/fa"
import {BsFillSendFill} from "react-icons/bs"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"

const Contact = () => {
     const {handleChangeContactInfo,contactInfo,handlePressContact,loadingContact,errorContact} = useContext(AuthContext)
    return ( 
        <section className="contact-section" >
                 <div className="contact-left">
                            <div className="mark-contact">
                                    <div>
                                        <div></div>
                                        <h3>Contact us</h3>
                                    </div>
                                    <h1>CONTACT</h1>
                                    <h2>Hãy <span> Kết Nối</span>  &<br></br> <span>Sẻ Chia</span> </h2>
                            </div>
                            <div className="text-intro">
                                 Nếu có yêu cầu hay góp ý gì bạn cứ nói nhé
                            </div>
                            <ul className="contact-info">
                                 <li>
                                 <MdPhoneInTalk id="icon"/> 086 687 0204
                                 </li>
                                 <li>
                                 <MdEmail id="icon"/> thuyduyen090204@gmail.com
                                 </li>
                                 <li>
                                 <GrSkype  id="icon"/> 086 687 0204
                                 </li>
                                 <li>
                                 <FaMapMarkerAlt id="icon"/> 1E 182 Lã Xuân Oai, Tăng Nhơn Phú A, Q9
                                 </li>

                            </ul>
                 </div>
                 <div className="contact-right">
                         <form>
                               <div className="contact-full-name">
                                    <input type="text" placeholder="First name*" onChange={(e)=>handleChangeContactInfo({
                                         ...contactInfo,
                                         firstName:e.target.value
                                    })} value={contactInfo?.firstName}></input>
                                    <input type="text" placeholder="Last name*" onChange={(e)=>handleChangeContactInfo({
                                         ...contactInfo,
                                         lastName:e.target.value
                                    })} value={contactInfo?.lastName}></input>
                               </div>
                               <div className="email-and-phone">
                                    <input type="text" placeholder="Email" onChange={(e)=>handleChangeContactInfo({
                                         ...contactInfo,
                                         email:e.target.value
                                    })} value={contactInfo?.email}></input>
                                    <input type="text" placeholder="Phone Number*" onChange={(e)=>handleChangeContactInfo({
                                         ...contactInfo,
                                         phone:e.target.value
                                    })} value={contactInfo?.phone}></input>
                               </div>
                               <input type="text" placeholder="Address" onChange={(e)=>handleChangeContactInfo({
                                         ...contactInfo,
                                         address:e.target.value
                                    })} value={contactInfo?.address}></input>
                               <textarea placeholder="Message*" onChange={(e)=>handleChangeContactInfo({
                                         ...contactInfo,
                                         message:e.target.value
                                    })} value={contactInfo?.message}></textarea>
                                    <div className="error">{errorContact?.message}</div>
                               <div className="contactBtn" onClick={()=>handlePressContact()}>
                                      <div>
                                          <BsFillSendFill />
                                      </div>
                                      <div>
                                            {loadingContact ? "loading" : "Send Message"}
                                      </div>
                               </div>
                         </form>

                 </div>
        </section>
     );
}
 
export default Contact;
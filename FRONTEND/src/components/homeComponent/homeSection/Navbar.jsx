import Register from "./Register"
import SignIn from "./SignIn"
import Profile from "./Profile"
import { useContext, useEffect, useState} from "react"
import { AuthContext } from "../../../context/AuthContext"
import {jwtDecode} from 'jwt-decode'
import {Link} from "react-router-dom"
import {TiThMenu} from "react-icons/ti"
import {FaTimes} from "react-icons/fa"
import {  Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
const Navbar = () => {
    const {dispatchReducerNavUserMain,user,handleLogout, handleCheckAdmin,isAdmin} = useContext(AuthContext)
     useEffect(()=> {
         const checkAdmin = ()=> {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
            if(token){
                   let date = new Date()
                   const tokenDecode = jwtDecode(token)
                   if(tokenDecode?.exp > (date.getTime()/1000)){
                       handleCheckAdmin()
                   } 
            }
         }
         checkAdmin()
     },[user])
     const [isMenu,setIsMenu] = useState(true)
     const handleMenu = () => {
        const ul = document.querySelector(".home-section .home-div .nav-bar ul")
        ul.classList.toggle("see")
        setIsMenu(!isMenu)
     }
     const scrollToTop = () => {
        scroll.scrollToTop();
      };
     const scrollToBottom = () => {
        scroll.scrollToBottom();
      };
      const scrollTo = (number) => {
        scroll.scrollTo(number); // Scrolling to 100px from the top of the page.
      };
     const li = document.querySelectorAll(".nav-bar .navigate li")
     const handleNavbar = (e)=> {
            li?.forEach((item)=> {
                   item.classList.remove("tick")
            })
            e.target.classList.add("tick")
     }
    return ( 
        <div className="nav-bar">
            <div className="logo-menu">
            <div className="logo">
                <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1699429698/initialDataPetShop/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2023-11-08_lu%CC%81c_14.46.29-removebg-preview_segnhm.png" alt="logo"/>  
            </div>
            <div className="menu" onClick={()=>handleMenu()}>{isMenu ? <TiThMenu /> : <FaTimes/>}</div>
            </div>
          
            <ul className="navigate">
                <li className="tick" onClick={(e)=> {
                    scrollToTop(),
                    handleNavbar(e)}}>Home</li>
                <li onClick={(e)=>{

                 scrollTo(630),
                 handleNavbar (e)}}> Services</li>
                <li onClick={(e)=>{

                scrollTo(2020),
                handleNavbar (e)}}>About us</li>
                <li onClick={(e)=>{

                scrollToBottom(),
                handleNavbar (e)}}>Contact</li>
                {isAdmin && <li><Link to="/dashboard" style={{color:"#001830"}}>Dashboard</Link></li> }
            </ul>
            <div className="auth">
                 {
                    user ? (
                        <div className="auth-sign-ed">
                              <button className="logOutBtn" onClick={()=>handleLogout()}>Log out</button>
                              <div className="avatar-user" onClick={()=>dispatchReducerNavUserMain("Profile")}>
                                     <img src={user?.avatar.url} alt="avatar"/>
                              </div>
                        </div>
                        )
                        :  
                        (
                            <div className="auth-sign">
                               <button className="signInBtn" onClick={()=>dispatchReducerNavUserMain("Login")}>Log in</button>
                               <button className="signUpBtn" onClick={()=>dispatchReducerNavUserMain("SignUp")}>Sign up</button>
                            </div>
                         )
                 }
                
            </div>
            <Register/>
            <SignIn/>
            <Profile/>
           
        </div>
     );
}
 
export default Navbar;
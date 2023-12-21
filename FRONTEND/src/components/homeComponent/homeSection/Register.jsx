import {FaTimes,FaHandPointUp} from "react-icons/fa"
import {IoMdEyeOff,IoMdEye } from "react-icons/io"
import {ImFilePicture} from "react-icons/im"
import { useContext,useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
const RegisterUser = () => {
    const {initialNavUserMain,dispatchReducerNavUserMain,handleChangeInfoSignUp, infoSignUp, pressSignUp, errorSignUp,loadingSignUp} = useContext(AuthContext)
    const [nameAvatar,setNameAvatar] = useState({
          name:""
    })
    const [isText,setIsText] = useState(false)// thấy được password
    
    const handleTransformFileImage = (e) => {
        const file = e.target.files[0]
        setNameAvatar({
            ...nameAvatar,
            name:e.target.files[0].name
        })
        const reader = new FileReader();
        if(file){
           reader.readAsDataURL(file)
           reader.onloadend = () => {
             handleChangeInfoSignUp({
                  ...infoSignUp,
                  avatar:reader.result
             })
           }
        }
   }
    return (
        <div className={initialNavUserMain.isSignUp == true ? "sign-up see" : "sign-up"}>
        <div className="sign-up-container">
               <div className="top">
                     <div className="mark-sign-up">
                           <div></div>
                           <div>Sign up</div>
                     </div>
                     <div className="closeBtn" onClick={()=>dispatchReducerNavUserMain("closeSignUp")}>
                         <FaTimes />
                     </div>
               </div>
               <h2>Hãy cùng nhau đồng hành nhé</h2>
               <div className="text-mark">SIGN UP</div>
               <form>
                   <div className="full-name">
                       <input type="text" placeholder="First name" onChange={(e)=> handleChangeInfoSignUp({
                           ...infoSignUp,
                           firstname:e.target.value
                       })} value={infoSignUp?.firstname}></input>
                       <input type="text" placeholder="Last name" onChange={(e)=> handleChangeInfoSignUp({
                           ...infoSignUp,
                           lastname:e.target.value
                       })} value={infoSignUp?.lastname}></input>
                   </div>
                   <input type="text" placeholder="Email" onChange={(e)=> handleChangeInfoSignUp({
                           ...infoSignUp,
                           email:e.target.value
                       })} value={infoSignUp?.email}></input>
                   <input type="text" placeholder="Phone number" onChange={(e)=> handleChangeInfoSignUp({
                           ...infoSignUp,
                           phone:e.target.value
                       })} value={infoSignUp?.phone}></input>
                   <div className="password">
                         <input type={isText ? "text" : "password"} placeholder="password" onChange={(e)=> handleChangeInfoSignUp({
                           ...infoSignUp,
                           password:e.target.value
                       })} value={infoSignUp?.password}></input>
                         <div>{isText ? <IoMdEye onClick={()=>setIsText(false)}/> : <IoMdEyeOff onClick={()=>setIsText(true)}/> }</div>
                   </div>
                   <input type="text" placeholder="Thông tin xác nhận" onChange={(e)=> handleChangeInfoSignUp({
                           ...infoSignUp,
                           valid:e.target.value
                       })} value={infoSignUp?.valid}></input>
                   <input type="file" id="avatar" accept="/image" hidden onChange={(e)=>handleTransformFileImage(e)}></input>
                   <label htmlFor="avatar" className="avatar">
                         <div>{nameAvatar?.name !== "" ? nameAvatar?.name : "Chọn ảnh đại diện"}</div>
                         <div><ImFilePicture /></div>
                   </label>
                   <div>{errorSignUp?.message}</div>
                   <div className="signupBtn" onClick={(e)=>pressSignUp(e)}>
                        <div><FaHandPointUp /></div>
                        <div>{loadingSignUp ? "loading" : "Sign up"}</div>
                   </div>
               </form>
             
        </div>
 </div>
    ) 
}
 
export default RegisterUser;
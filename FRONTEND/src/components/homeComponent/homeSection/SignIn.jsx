import {MdLogin} from "react-icons/md"
import {FaTimes} from "react-icons/fa"
import {BsSendFill} from "react-icons/bs"
import { useContext} from "react"
import { AuthContext } from "../../../context/AuthContext"
const SignIn = () => {
    const {initialNavUserMain,dispatchReducerNavUserMain, handleChangeInfoPassword,infoSignIn, loginUser, loginLoading,loginError,handleChangeForgotPassword,forgotInfo,handlePressForgotPassword,isValidUser,isForgotPassword,handleChangeIsForgotPassword,handlePasswordNotSignIn,passwordNotSignIn,handlePressChangePasswordNotSignIn,passwordNotSignInError,passwordNotSignInLoading,forgotPasswordLoading,forgotPasswordError} = useContext(AuthContext)
    
    return ( 
        <div className={initialNavUserMain.isLogin == true ? "sign-in see" : "sign-in"}>
             <div className="sign-in-container"  style={{display:isForgotPassword ? "none" : "flex"}}>
                    <div className="top">
                               <div className="mark-sign-in">
                                     <div></div>
                                     <div>Sign in</div>
                               </div>
                               <div className="closeBtn" onClick={()=>dispatchReducerNavUserMain("closeLogin")}>
                                  <FaTimes />
                               </div>
                    </div>
                    <div className="text-intro">
                          Chào mừng bạn quay trở lại
                    </div>
                    <form>
                        <input type="text" placeholder="Email" onChange={(e)=> handleChangeInfoPassword({
                               ...infoSignIn,
                               email:e.target.value
                        })} value={infoSignIn?.email}></input>
                        <input type="password" placeholder="Password" onChange={(e)=> handleChangeInfoPassword({
                               ...infoSignIn,
                               password:e.target.value
                        })} value={infoSignIn?.password}></input>
                        <div>{loginError?.message}</div>
                        <div id="forget-password" onClick={()=>handleChangeIsForgotPassword(true)}> Forget your password</div>
                        <div className="signinBtn" onClick={()=> loginUser()}>
                              <div><MdLogin /></div>
                              <div>{loginLoading ? "loading..." : "Sign in"}</div>
                        </div>
                    </form>
             </div>
             
             <div className="forget-container" style={{display:isForgotPassword ? "flex" : "none"}}>
                    <div className="top">
                               <div className="mark-forget">
                                     <div></div>
                                     <div>Get Password</div>
                               </div>
                               <div className="closeBtn" onClick={()=>handleChangeIsForgotPassword(false)}>
                                  <FaTimes />
                               </div>
                    </div>
                    <div className="text-intro">
                          Vui lòng xác nhận lại một số thông tin
                    </div>
                    {
                        isValidUser.isValid ? (
                              <div className="verified">
                                   <strong>Nhập mật khẩu mới</strong>
                                   <input type="password" placeholder="typing" onChange={(e)=>handlePasswordNotSignIn({
                                       ...passwordNotSignIn,
                                       newPassword:e.target.value
                                   })} value={passwordNotSignIn?.newPassword}/>
                                   <strong>Nhập lại mật khẩu mới</strong>
                                   <input type="password" placeholder="typing"  onChange={(e)=>handlePasswordNotSignIn({
                                       ...passwordNotSignIn,
                                       newPasswordVer:e.target.value
                                   })} value={passwordNotSignIn?.newPasswordVer}/>
                                   <div className="error">{passwordNotSignInError?.message}</div>
                                   <button onClick={(e)=>handlePressChangePasswordNotSignIn(e)}>{passwordNotSignInLoading ? "sending" : "send"}</button>
                              </div> 
                        ) : (
                              <form>          
                                         <input type="text" placeholder="Email" onChange={(e)=>handleChangeForgotPassword({
                                               ...forgotInfo,
                                              email:e.target.value
                                               })} value={forgotInfo?.email}></input>
                                          <input type="text" placeholder="Phone number" onChange={(e)=>handleChangeForgotPassword({
                                                 ...forgotInfo,
                                                phone:e.target.value
                                          })} value={forgotInfo?.phone}></input>
                                           <input type="text" placeholder="Thông tin xác thực" onChange={(e)=>handleChangeForgotPassword({
                                               ...forgotInfo,
                                               valid:e.target.value
                                           })} value={forgotInfo?.valid}></input>
                                           <div className="error">{forgotPasswordError?.message}</div>
                                         <div className="forgetBtn" onClick={(e)=>handlePressForgotPassword(e)}>
                                               <div><BsSendFill /> </div>
                                               <div>{forgotPasswordLoading ? "sending" : "send"}</div>
                                             </div>
                                       
                            
                    </form>
                        )
                    }
                    
                   
             </div>
            
        </div>

     );
}
 
export default SignIn;
import {FaPlus,FaTimes}  from "react-icons/fa"
import {ImFilePicture} from "react-icons/im"
import {TbHandClick} from "react-icons/tb"
import { useContext, useEffect, useReducer,useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import moment from "moment"
const Profile = () => {
     const {initialNavUserMain,dispatchReducerNavUserMain,user,handleChangeUserInfo,changeUserInfo,changePassword,handleChangePassword,handlePressChangeUser,handleCheckOldPassword,handleNewPassword,navPassword ,allOrders,updateInfoUserLoading,updateInfoUserError, checkOldPasswordLoading,checkOldPasswordError,newPasswordError,newPasswordLoading} = useContext(AuthContext)
     const profileNav = {
          isProfile:true,
          isProfileIng:false,
          isProfileEd:false
     }

     const reducerProfileNav = (state,action)=> {
              switch(action.type){
                  case "Profile": 
                    return {
                         ...state,
                         isProfile:true,
                         isProfileIng:false,
                         isProfileEd:false,
                         isEditProfile:false
                    }
                    case "ProfileIng": 
                    return {
                         ...state,
                         isProfile:false,
                         isProfileIng:true,
                         isProfileEd:false,
                         isEditProfile:false
                    }
                    case "ProfileEd": 
                    return {
                         ...state,
                         isProfile:false,
                         isProfileIng:false,
                         isProfileEd:true,
                         isEditProfile:false
                    }
                    case "EditProfile": 
                    return {
                         ...state,
                         isProfile:false,
                         isProfileIng:false,
                         isProfileEd:false,
                         isEditProfile:true
                    }
              }
     }
     const [profileNavMain,dispatchProfileNavMain] = useReducer(reducerProfileNav,profileNav)
     const handleDispatchProfileNavMain = (info)=> {
          dispatchProfileNavMain({
               type:info
          })
     }
     const [nameImage,setNameImage] = useState({
           name:null
     })

     const handleImageProfile = (e) => {
             const image = e.target.files[0]
             setNameImage({
               ...nameImage,
               name:e.target.files[0].name
             })
             const reader = new FileReader();
             if(image){
                     reader.readAsDataURL(image)
                     reader.onloadend = () => {
                         handleChangeUserInfo({
                               ...changeUserInfo,
                               avatar:reader.result
                         })
                     }
             }
     }  
     const [ordersWaitingAndProcessingOfUser,setOrdersWaitingAndProcessingOfUser] = useState([])
     const [ordersProcessed,setOrdersProcessed] = useState([])
          useEffect(()=> {
             if(allOrders.length > 0){
                const dataWaiting = []
                const dataProcessed = []
                for(let i = 0; i < allOrders.length; i++){
                      if(allOrders[i].userId === user?._id){
                            if(allOrders[i].status === "Đợi" || allOrders[i].status === "Đang"){
                              for(let j = 0 ; j < allOrders[i].orders?.length; j++){
                                   dataWaiting.push(allOrders[i].orders[j])
                              }
                            }else {
                              for(let j = 0 ; j < allOrders[i].orders?.length; j++){
                                   dataProcessed.push(allOrders[i].orders[j])
                              }
                            }
                            

                      }
                }
                setOrdersWaitingAndProcessingOfUser([
                    ...dataWaiting
                ])
                setOrdersProcessed([
                    ...dataProcessed
                ])
             }
     },[allOrders,user])


     
    return ( 
        <div className={initialNavUserMain.isProfile == true ? "profile see" : "profile"}>
               <div className="profile-container" style={{display:profileNavMain.isProfile ? "" : "none"}}>
                       <div className="closeBtn" onClick={()=> dispatchReducerNavUserMain("closeProfile")}>
                          <FaTimes />
                       </div>
                       <div className="top">
                             <div className="background"></div>
                             <div className="avatar">
                                  <div className="img">
                                       <img src={user?.avatar.url} alt="avatar"/>
                                       <div id="plus" onClick={()=>handleDispatchProfileNavMain("EditProfile")}><FaPlus /></div>
                                  </div>
                                 
                                  
                                  
                             </div>
                       </div>
                       <div className="info">
                             <div id="name">{user?.name}</div>
                             <div id="email">{user?.email}</div>
                       </div>
                       <div className="his">
                            <div onClick={()=>handleDispatchProfileNavMain("ProfileIng")}>Đang giao </div>
                            <div onClick={()=>handleDispatchProfileNavMain("ProfileEd")}>Đã mua</div>
                       </div>
                       <div className="line"></div>
                       <h3>Thú cưng bạn đang cần gì ???</h3>
               </div>
               <div className="profile-container-ing" style={{display:profileNavMain.isProfileIng ? "flex" : "none"}}>
                    <div className="close" onClick={()=>handleDispatchProfileNavMain("Profile")}><FaTimes/></div>
                    <div className="table">
                            <table>
                                <thead>
                                   <tr>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Hình ảnh</th>
                                        <th>SL</th>
                                        <th>Tổng tiền</th>
                                        <th>Ngày đặt</th>
                                 
                                   </tr>
                                </thead>
                                <tbody>
                                {
                                   ordersWaitingAndProcessingOfUser?.map((item,index)=> {
                                       
                                                       return (
                                                       <tr key={index}>
                                                           <td>{index+1}</td>
                                                           <td>{item.nameProduct}</td>
                                                           <td>
                                                                <img src={item.imageProduct.url} alt="product"/>
                                                           </td>
                                                           <td>{item.SL}</td>
                                                           <td>{item.SL * item.price}k</td>
                                                           <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                                                       
                                                        </tr>   
                                                    )
                                                    
                                                   
                                               
                                        
                                   })
                                }
                                  
                                </tbody>
                            </table>
                    </div>
               </div>
               <div className="profile-container-ed" style={{display:profileNavMain.isProfileEd ? "flex" : "none"}}>
                    <div className="close" onClick={()=>handleDispatchProfileNavMain("Profile")} ><FaTimes/></div>
                    <div className="table">
                            <table>
                                <thead>
                                   <tr>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Hình ảnh</th>
                                        <th>SL</th>
                                        <th>Tổng tiền</th>
                                        <th>Ngày đặt</th>
                                  
                                   </tr>
                                </thead>
                                <tbody>
                                       {
                                        ordersProcessed?.map((item,index)=> {
                                             return (
                                                  <tr key={index}>
                                                           <td>{index+1}</td>
                                                           <td>{item.nameProduct}</td>
                                                           <td>
                                                                <img src={item.imageProduct.url} alt="product"/>
                                                           </td>
                                                           <td>{item.SL}</td>
                                                           <td>{item.SL * item.price}k</td>
                                                           <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                                                          
                                                        </tr>   
                                             )
                                        })
                                       }
                           
                                        
                             
                                </tbody>
                            </table>
                    </div>
               </div>
               <div className="edit-user" style={{display:profileNavMain.isEditProfile ? "" : "none"}}>
                       <div className="close" onClick={()=>handleDispatchProfileNavMain("Profile")}><FaTimes/></div>
                       <form>
                               <div className="fullName">
                                    <input type="text" placeholder="first name" onChange={(e)=>handleChangeUserInfo({
                                        ...changeUserInfo,
                                        firstName:e.target.value
                                    })} value={changeUserInfo?.firstName}/>
                                    <input type="text" placeholder="last name"  onChange={(e)=>handleChangeUserInfo({
                                        ...changeUserInfo,
                                        lastName:e.target.value
                                    })} value={changeUserInfo?.lastName}/>
                               </div>
                               <input type="email" name="email" placeholder="nhập email mới" onChange={(e)=>handleChangeUserInfo({
                                        ...changeUserInfo,
                                        email:e.target.value
                                    })} value={changeUserInfo?.email}></input>
                               <input type="text" name="phone" placeholder="nhập SDT mới"  onChange={(e)=>handleChangeUserInfo({
                                        ...changeUserInfo,
                                        phone:e.target.value
                                    })} value={changeUserInfo?.phone}></input>
                               <div className="edit-password">
                               {
                                   navPassword ? (
                                        <div className="new-password">
                                        <strong>Nhập mật khẩu mới</strong>
                                        <div>
                                             <input type="password" name="new-password" onChange={(e)=>handleChangePassword({
                                                  ...changePassword,
                                                  newPassword:e.target.value
                                             })} value={changePassword?.newPassword}></input>
                                             <button onClick={(e)=>handleNewPassword(e)}>{newPasswordLoading ? "sending" : "send"}</button>
                                        </div>
                                        <div className="error" style={{display:newPasswordError !== null ? "flex" : "none"}}>{newPasswordError?.message}</div>
                                        </div>
                                   ) : (
                                        <div className="old-password">
                                        <strong>Nhập mật khẩu cũ</strong>
                                        <div>
                                             <input type="password" name="old-password" onChange={(e)=>handleChangePassword({
                                                  ...changePassword,
                                                  oldPassword:e.target.value
                                             })} value={changePassword?.oldPassword}></input>
                                          
                                             <button onClick={(e)=>handleCheckOldPassword(e)}>{ checkOldPasswordLoading ? "loading" : "send"}</button>
                                        </div>
                                        <div className="error" style={{display:checkOldPasswordError !== null ? "flex" : "none"}}>{checkOldPasswordError?.message}</div>
                                     
                                        </div>
                                   )
                               }
                                   
                                   

                               </div>
                             
                               <input type="text" name="xác minh" placeholder="nhập thông tin xác nhận mới" onChange={(e)=>handleChangeUserInfo({
                                        ...changeUserInfo,
                                        valid:e.target.value
                                    })} value={changeUserInfo?.valid}></input>
                               <input type="file" accept="/image" hidden id="avatar-edit" onChange={(e)=>handleImageProfile(e)}/>
                               <label htmlFor="avatar-edit" className="avatar-edit">
                                    <div>{nameImage?.name !== null ? nameImage?.name : "Chọn ảnh đại diện"}</div>
                                    <div><ImFilePicture /></div>
                               </label>
                               <div className="error">{updateInfoUserError?.message}</div>
                               <div className="editBtn" onClick={()=>handlePressChangeUser()}>
                                     <div><TbHandClick /></div>
                                     <div>{updateInfoUserLoading ? "sending" : "send"}</div>
                               </div>
                            
                       </form>
               </div>

        </div>
     );
}
 
export default Profile;
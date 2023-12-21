import {createContext,useState,useCallback, useEffect,useReducer} from 'react';
import {postRequest,getRequest,baseUrl} from "../../utils/services"
import Swal from 'sweetalert2'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{
    window.addEventListener('scroll',function(){
       const navbar = document.querySelector(".nav-bar")
       navbar.classList.toggle("sticky",window.scrollY > 0)
    })
let axiosJWT = axios.create()

//--------User start-------------//
const [isAdmin,setIsAdmin] = useState(false)
const [flatUpdateInfoUser,setFlatUpdateInfoUser] = useState(false)// > user start 3.
const initialNavUser = {// lưu dữ liệu cho việc chuyển hướng user
       isLogin:false,
       isSignUp:false,
       isProfile:false
}
const reducerNavUser = (state,action) => {//hàm  xử lí dữ liệu cho việc chuyển hướng user
       switch (action.type){
          case "Login": 
            return {
                ...state,
                isLogin:true,
                isSignUp:false,
                isProfile:false
            }
            case "SignUp": 
            return {
                ...state,
                isSignUp:true,
                isLogin:false,
                isProfile:false

            }

            case "Profile": 
            return {
                ...state,
                isProfile:true,
                isLogin:false,
                isSignUp:false
              
            }
            case "closeLogin":
                return {
                ...state,
               isLogin:false
            }
            case "closeSignUp":
                return {
                ...state,
               isSignUp:false
            }
            case "closeProfile":
                return {
                ...state,
               isProfile:false
            }
            case "closeAll":
                return {
                    ...state,
                   isProfile:false,
                   isLogin:false,
                   isSignUp:false,
               }
       }
}

const [initialNavUserMain,reducerNavUserMain] = useReducer(reducerNavUser,initialNavUser)
const dispatchReducerNavUserMain = (info) =>{
    reducerNavUserMain({type:info})
}

const [users,setUsers] = useState(null)// get all user in db
const [user,setUser] = useState(null)// current user
const [tokens,setTokens] = useState(null)// state for get all tokens in db
const checkToken = (token) => {// check token is valid or not
    let date = new Date()
    const decodeToken = jwtDecode(token)
    if(decodeToken?.exp < (date.getTime()/1000)){//true is not valid 
          return true
    }else {
          return false
    }
}




useEffect(()=> {
 const getAllTokens = async() => {//get all toke in db
     const tokens = await getRequest(`${baseUrl}/user/get-all-token`)
     if(!tokens.error){
        let token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null 
        if(token !== null){
            const users = await getRequest(`${baseUrl}/user`)
            // setUsers(users)
            const getRefreshOfToken = tokens.filter((item)=> item.token === token)
            if(getRefreshOfToken.length > 0){
                const flat = checkToken(token)
                if(flat){
                   //console.log("Phiên làm việc của bạn đã hết vui lòng đăng nhập lại")
                   const data = await postRequest(`${baseUrl}/user/refresh`,JSON.stringify({token:token}))
                   const decodeToken = jwtDecode(data?.token)
                   const decodeId = decodeToken?._id
                   const user  = users.find(({_id})=> _id === decodeId)
                   if(user){
                         const {valid,password,isAdmin,...others} = user
                         setUser(others)
                   }else {
                        //console.log("ko tồn tại tài khoản")
                   }
                   const tokenUpdate = {
                    idUser:decodeId,
                    token:data?.token
                    }
                     localStorage.setItem("token",JSON.stringify(data?.token))
                     await postRequest(`${baseUrl}/user/updateToken`,JSON.stringify(tokenUpdate))

                }else {  
                   const decodeToken = jwtDecode(token)
                   const decodeId = decodeToken?._id
                   const user  = users.find(({_id})=> _id === decodeId)
                   if(user){
                    const {valid,password,isAdmin,...others} = user
                    setUser(others)
                   }else {
                        //console.log("ko tồn tại tài khoản")
                   }
                }
            }
           
        }else {
            //alert("Bạn cần đăng nhập")
        }
   
     }
     }
     
 getAllTokens()


},[flatUpdateInfoUser])

//1. login user start
const [loginError,setLoginError] = useState(null)
const [loginLoading,setLoginLoading] = useState(false)
const [infoSignIn,setInfoSignIn] = useState({
    email:"",
    password:""
})
const handleChangeInfoPassword = (info) => {
    setInfoSignIn(info)
}

const loginUser = useCallback(async()=> {//function login
      setLoginLoading(true)
      setLoginError(null)
     const response = await postRequest(`${baseUrl}/user/login`,JSON.stringify(infoSignIn))
     setLoginLoading(false)
     if(response.error){
        return setLoginError(response)
     }
     dispatchReducerNavUserMain("closeAll")
     setInfoSignIn({
        email:"",
        password:""
     })
     Swal.fire("Đăng nhập thành công");
     localStorage.setItem("token",JSON.stringify(response.token))
     setUser(response)
    


},[infoSignIn])

axiosJWT.interceptors.request.use(
    async(config)=> {
          let date = new Date()
          const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
          const decodeToken = jwtDecode(user?.token)
          if(decodeToken.exp < (date.getTime()/1000)){
                const data = await postRequest(`${baseUrl}/user/refresh`,JSON.stringify({token:token}))
                const refreshUser = {
                    ...user,
                    token:data.token
                }
                setUser(refreshUser)
                config.headers["token"]= "Bearer " + data.token
                const tokenUpdate = {
                      idUser:user._id,
                      token:data.token
                }
                await postRequest(`${baseUrl}/user/updateToken`,JSON.stringify(tokenUpdate))
          }
       
       return config
    },(err)=> {
        console.log(err)
    }

)
const deleteUser = useCallback(async() => {
    const deleteId = user?._id
    const token = user?.token
    const res  = await axiosJWT.get(`${baseUrl}/user/delete/${deleteId}`, {
        headers: {token: `Bearer ${token}`}
    })


},[user])
//1. login user end
//2. sign up user start
const [loadingSignUp,setLoadingSignUp] = useState(false)
const [errorSignUp,setErrorSignUp] = useState(null)

const [infoSignUp,setInfoSignUp] = useState({
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    password:"",
    valid:"",
    avatar:""
})

const handleChangeInfoSignUp  = (info) => {
     setInfoSignUp(info)
}
const pressSignUp = useCallback(async(e)=> {
     e.preventDefault();
     const data= {
        name:infoSignUp.firstname + " " + infoSignUp.lastname,
        email:infoSignUp.email,
        phone:infoSignUp.phone,
        password:infoSignUp.password,
        valid:infoSignUp.valid,
        avatar:infoSignUp.avatar
     }
     setLoadingSignUp(true)
    const res = await postRequest(`${baseUrl}/user/registerUser`,JSON.stringify(data))
    setLoadingSignUp(false)
    if(res.error){
       return setErrorSignUp(res)
    }
    setInfoSignUp({
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        password:"",
        valid:"",
        avatar:""
    })
    Swal.fire("Đăng ký thành công");
    dispatchReducerNavUserMain("closeAll")
    localStorage.setItem("token",JSON.stringify(res.token))
    const {valid,password,isAdmin,...others} = res
    setUser(others)
     
},[infoSignUp])
const handleLogout = () => {
      localStorage.removeItem("token")
      Swal.fire("Đăng xuất thành công");
      setUser(null)
      dispatchReducerNavUserMain("closeAll")
      setIsAdmin(false)
}


//2. sign up user end
//3. change info user start
const SignInAgain = useCallback(()=> {
    localStorage.removeItem("token")
    setUser(null)
    dispatchReducerNavUserMain("closeAll")
})
const [navPassword,setNavPassword] = useState(false)
const [updateInfoUserError,setUpdateInfoUserError] = useState(null)
const [updateInfoUserLoading,setUpdateInfoUserLoading] = useState(false)
const [changeUserInfo,setChangeUserInfo] = useState({
       firstName:"",
       lastName:"",
       email:"",
       phone:"",
       valid:"",
       avatar:""
})
const [changePassword,setChangePassword] = useState({
    oldPassword:"",
    newPassword:""
})
const handleChangeUserInfo = (info) => {
    setChangeUserInfo(info)
}
const handleChangePassword = (info)=> {
    setChangePassword(info)
}
const handlePressChangeUser = useCallback(async()=> {
    setUpdateInfoUserLoading(true)
     const data = {
         fullName:changeUserInfo?.firstName + " " + changeUserInfo?.lastName,
         email:changeUserInfo?.email,
         phone:changeUserInfo?.phone,
         valid:changeUserInfo?.valid,
         avatar:changeUserInfo?.avatar,
         token:JSON.parse(localStorage.getItem("token"))
     }
     const response = await postRequest(`${baseUrl}/user/update-info`,JSON.stringify(data))
     setUpdateInfoUserLoading(false)
     if(response.error){
        setUpdateInfoUserLoading(false)
        setChangeUserInfo({
            firstName:"",
            lastName:"",
            email:"",
            phone:"",
            valid:"",
            avatar:""
         })  
         alert("Có lỗi ở đâu đó.Xin hãy làm lại")
         SignInAgain()

        return setUpdateInfoUserError(response)
     }

     SignInAgain()
     setFlatUpdateInfoUser(!flatUpdateInfoUser)
     setChangeUserInfo({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        valid:"",
        avatar:""
     })  
     alert("Đã thay đổi thành công.Bây giờ bạn cần đăng nhập lại")
},[changeUserInfo])
const [checkOldPasswordLoading,setCheckOldPasswordLoading] = useState(false)
const [checkOldPasswordError,setCheckOldPasswordError] = useState(null)
const handleCheckOldPassword = async(e)=> {
       setCheckOldPasswordLoading(true)
       e.preventDefault();
       const data = {
           token:JSON.parse(localStorage.getItem("token")),
           oldPassword:changePassword?.oldPassword
       }
       const flat = await postRequest(`${baseUrl}/user/check-old-password`,JSON.stringify(data))
       setCheckOldPasswordLoading(false)
       if(flat?.message === "Bạn cần đăng nhập lại"){
               alert("Bạn cần đăng nhập lại")
              return SignInAgain();
       }

       if(flat !== true){
            setCheckOldPasswordError(flat)
       }else {
            setNavPassword(flat)
            setChangePassword({
                ...changePassword,
                oldPassword:""
            })
       }
}
const [newPasswordLoading,setNewPasswordLoading] = useState(false)
const [newPasswordError,setNewPasswordError] = useState(null)
const handleNewPassword = async(e)=> {
     e.preventDefault();
     setNewPasswordLoading(true)
     if(navPassword){
        const data = {
            token:JSON.parse(localStorage.getItem("token")),
            newPassword:changePassword?.newPassword
        }
        const response = await postRequest(`${baseUrl}/user/update-password`,JSON.stringify(data))
        setNewPasswordLoading(false)
        if(response.error){
            return setNewPasswordError(response)
         }
        setChangePassword({
            ...changePassword,
            newPassword:""
        })
        
         SignInAgain();
         alert("Đã thay đổi thành công.Bây giờ bạn cần đăng nhập lại")
        

      
     }
   
}
//3. change info user end
//4. forgot password start
const [isForgotPassword,setIsForgotPassword] = useState(false)//hien thị form nhập thông tin xác nhận khi click vào forgot password
const handleChangeIsForgotPassword = (info) => {
    setIsForgotPassword(info)
}
const [forgotPasswordLoading,setForgotPasswordLoading] = useState(false)
const [forgotPasswordError,setForgotPasswordError] = useState(null)
const [forgotInfo,setForgotInfo] = useState({
      email:"",
      phone:"",
      valid:""

})
const [isValidUser,setIsValidUser] = useState({
    isValid:false,
    token:""
})
const handleChangeForgotPassword = (info) => {
    setForgotInfo(info)
}
const handlePressForgotPassword = useCallback(async(e)=> {
    
      e.preventDefault();
      setForgotPasswordLoading(true)
      const response = await postRequest(`${baseUrl}/user/forgot-password`,JSON.stringify(forgotInfo))
      setForgotPasswordLoading(false)
      if(response.error){
         return setForgotPasswordError(response)
      }
           setForgotInfo({
            email:"",
            phone:"",
            valid:""
           })
           return setIsValidUser({
              ...isValidUser,
              isValid:response.isValid,
              token:response.token
           })
         
},[forgotInfo])
const [passwordNotSignIn,setPasswordNotSignIn] =  useState({
    newPassword:"",
    newPasswordVer:""
})

const [passwordNotSignInError,setPasswordNotSignInError] = useState(null)
const [passwordNotSignInLoading,setPasswordNotSignInLoading] = useState(false)
const handlePasswordNotSignIn =  (info) => {
     setPasswordNotSignIn(info)
}
const handlePressChangePasswordNotSignIn = useCallback(async(e)=> {
      e.preventDefault()
      const data = {
        token:isValidUser?.token,
        ...passwordNotSignIn
      }
      setPasswordNotSignInLoading(true)
      const response = await postRequest(`${baseUrl}/user/change-password-not-signin`,JSON.stringify(data))
      if(response.error){
        return setPasswordNotSignInError(response)
         
      }
      setPasswordNotSignInLoading(false)
      setIsForgotPassword(false)
      setIsValidUser({
          isValid:false,
          token:""
      })
    
      alert("Bây giờ bạn có thể đăng nhập lại với mật khẩu mới")

},[isValidUser,passwordNotSignIn])

//4. forgot password end

//--------User end-------------//
//----------Dashboard Page start-------//
//1. handle upload product for list product on Shop page start
const [dataUploadProduct,setDataUploadProduct] = useState([])
const [copyDataUploadProduct,setCopyDataUploadProduct] = useState([])
const [ErrorUploadProduct,setErrorUploadProduct] = useState(null)
const [loadingUploadProduct,setLoadingUploadProduct] = useState(false)
useEffect(()=> {
      const getAllProduct = async() => {
         
           const res = await getRequest(`${baseUrl}/upload/get-all`)
           if(!res.error){
              setDataUploadProduct([
                ...res
              ])
              setCopyDataUploadProduct([ 
                ...res
            ])
    
    
           }
           
      }
      getAllProduct();

},[])
const [uploadProductInfo,setUploadProductInfo] = useState({
       imageProduct:"",
       nameProduct:"",
       price:"",
       count:"",
       sales:"",
       news:"",
       commend:""
})
const handleChangeUploadProductInfo = async(info) => {
    setUploadProductInfo(info) 
}

const handlePressUploadProduct = useCallback(async(e) => {
        e.preventDefault();
        setLoadingUploadProduct(true)
        const response = await postRequest(`${baseUrl}/upload/uploadProduct`,JSON.stringify(uploadProductInfo))
        setLoadingUploadProduct(false)
        if(response.error){
          return  setErrorUploadProduct(response)
        }
        setUploadProductInfo({
            imageProduct:"",
            nameProduct:"",
            price:"",
            count:"",
            sales:"",
            news:"",
            commend:""
        })
        Swal.fire("Upload sản phẩm thành công");
        setDataUploadProduct([
            ...dataUploadProduct,
            response
        ])
        setCopyDataUploadProduct([
            ...copyDataUploadProduct,
            response
        ])

},[uploadProductInfo])
const [flatDeleteProduct,setFlatDeleteProduct] = useState({
      isFlat:false,
      _id:""
})
const deleteProductDashboard = useCallback(async(_id)=>{
      setDataUploadProduct((oldState)=> {
            setFlatDeleteProduct({
                ...flatDeleteProduct,
                isFlat:true,
                _id:_id
            })
            const productIndex = oldState?.findIndex((item)=> item._id === _id)
            if(productIndex !== -1){
                oldState.splice(productIndex,1)
            }
            return [...oldState]
      })
})
useEffect(()=> {
     const deleteProduct = async()=> {
         if(flatDeleteProduct?.isFlat === true && flatDeleteProduct?._id !== ""){
                 await postRequest(`${baseUrl}/upload/delete`,JSON.stringify(flatDeleteProduct))
                 setFlatDeleteProduct({
                    ...flatDeleteProduct,
                    isFlat:false,
                    _id:""
                })
         }
     }
     deleteProduct()
},[flatDeleteProduct])


//1. handle upload product for list product on Shop page end
//2. put initial data for main page start
const [initialDataInfo,setInitialDataInfo] = useState({
    imageHome:"",
    textHome:"",
    imageCutService:"",
    imageSurgeryService:"",
    imageFoodLeftService:"",
    imageFoodRightService:"",
    textCutService:"",
    textSurgeryService:"",
    textFoodService:"",
    Facebook:"",
    Zalo:"",
    Instagram:"",
    Linkedin:"",
    Telegram:"",
    Email:"",
    Phone:"",
    Skype:"",
    address: ""  
     
})
const handleChangePutInitialDataInfo = async(info)=> {
setInitialDataInfo(info)
}
const handlePressPutInitialDataInfo = useCallback(async(e)=> {
    e.preventDefault();
    const response = await postRequest(`${baseUrl}/initial/put-initial-data`,JSON.stringify(initialDataInfo))
},[initialDataInfo])
const handleUpdateInitialInfo = useCallback(async(e)=> {
        e.preventDefault();    
        const response = await postRequest(`${baseUrl}/initial/update`,JSON.stringify(initialDataInfo))
       console.log(response)
},[initialDataInfo])

//2. put initial data for main page end


//3. get initial data start//

const [initialData,setInitialData] = useState(null)//save info cho home page
useEffect(() => {
      const getInitialData = async()=> {
            const response = await getRequest(`${baseUrl}/initial/get-all`)
            if(!response.error){
                setInitialData(response[0])
            }

      }
      getInitialData()
},[])

//3. get initial data end//
//4. nav dashboard start
const initialDashboardNav = {
    isOption:"Order"
}
const reducerDashboardNav = (state,action) => {
        switch (action.type){
            case "Income":
                return {
                    ...state,
                    isOption:"Income"
                }
            case "Order": 
               return {
                ...state,
                isOption:"Order"
               }  
            case "Products":
                 return {
                    ...state,
                    isOption:"Products"
                 }  
             case "Contact":
             return {
                 ...state,
                 isOption:"Contact"
             }  
             case "InitialData":
             return {
                 ...state,
                 isOption:"InitialData"
             }  
        }
}
const [initialDashboardNavMain,reducerDashboardNavMain] = useReducer(reducerDashboardNav,initialDashboardNav)
const dispatchReducerDashboardNavMain = (info)=> {
    reducerDashboardNavMain({
          type:info
    })
}
const navOnOrder = {
    isWhatOrder:"OrderWait"
}
const reducerNavOnOrder = (state,action) => {
   switch(action.type){
        case "OrderWait":
               return {
                ...state,
                isWhatOrder:"OrderWait"
            }
        case "OrderProcessing":
            return {
                ...state,
                isWhatOrder:"OrderProcessing"
            }
        case "OrderProcessed":
            return {
                ...state,
                isWhatOrder:"OrderProcessed"
            }
   }
}
const [navOnOrderMain,reducerNavOnOrderMain] = useReducer(reducerNavOnOrder,navOnOrder)
const dispatchNavOnOrderMain = (info) => {
    reducerNavOnOrderMain({
        type:info
    })
}
//4. nav dashboard end

//5. income add customer start
const [incomeList,setIncomeList] = useState([])//income for every day 

const [incomeListInData,setIncomeListInData] = useState([])
const [copyIncomeListData,setCopyIncomeListData] = useState([])
useEffect(()=> {
    const data = localStorage.getItem("income") ? JSON.parse(localStorage.getItem("income")) : []
    setIncomeList(data)
     const getIncome = async()=> {
       
        const response = await getRequest(`${baseUrl}/income/get-all-income`)
        if(!response.error){
            setIncomeListInData(response)
            setCopyIncomeListData(response)
        }
     }
    
     getIncome()
},[])
const [infoAddCustomer,setInfoAddCustomer] = useState({
       id:"",
       nameCustomer:"",
       typeService:"",
       total:null

})
const handleChangeInfoAddCustomer = (info) => {
    setInfoAddCustomer(info)
}
const handlePressAddInfoAddCustomer = useCallback(async(e)=> {
      e.preventDefault()
      if(infoAddCustomer.nameCustomer !== "" &&  infoAddCustomer.typeService !==  "" &&   infoAddCustomer.total  !== ""){
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let id =  Math.floor(Math.random() * 10001)
        const data = [
              ...incomeList,
            {
               ...infoAddCustomer,
               id:id,
               date 
             }]
          setIncomeList(data)   
         localStorage.setItem("income",JSON.stringify(data))
      }  
},[infoAddCustomer,incomeList])
const [ofDayLoading,setOfDayLoading] = useState(false)
const pressOffDay = useCallback(async() => {
       if(incomeList?.length > 0){
              const data = {
                 everyDay:incomeList
              }
              setOfDayLoading(true)
              const response  = await postRequest(`${baseUrl}/income`,JSON.stringify(data))
              setOfDayLoading(false)
              if(response.error){
                   return alert(response.message)
              }
              setIncomeListInData([
                ...incomeListInData,
                response
              ])

              Swal.fire("Đã kết thúc ngày hôm nay");
              setCopyIncomeListData([
                ...copyIncomeListData,
                response
              ])
              localStorage.removeItem("income")

       }else {
          return alert("Không có bất cứ sản phẩm nào")
       }
},[incomeList,incomeListInData,copyIncomeListData])

//5. income add customer end

//6. nav in income start
const navIncome = {
    Today:true,
    ListHis:false,
    Detail:false
}
const reducerNavIncome = (state,action) => {
      switch(action.type){
             case "Today": 
              return {
                ...state,
                Today:true,
                ListHis:false,
                Detail:false
              }
              case "ListHis": 
              return {
                ...state,
                Today:false,
                ListHis:true,
                Detail:false
              }
              case "Detail": 
              return {
                ...state,
                Today:false,
                ListHis:false,
                Detail:true
              }
             
      }
}
const [navIncomeMain,dispatchNavIncomeMain] = useReducer(reducerNavIncome,navIncome)

const handlePressDispatchNavIncomeMain = (info) => {
    dispatchNavIncomeMain(info)
}
//6. nav in income end
//7. income search start
const handleSearchIncome = useCallback((e)=> {
     const text = convertText((e.target.value).trim().toLowerCase())
     
     if(text !== ""){
            let listId = []
            copyIncomeListData?.map((item)=>{
                const everyDay = item.everyDay
                
                everyDay?.map((item1)=> {
                       const name = item1.nameCustomer
                       const itemFilter = convertText(name.trim().toLowerCase())
                       const isVid = itemFilter.includes(text)
                       if(isVid){
                              const isHave = listId.filter((item2)=> item2._id === item._id)
                              if(isHave.length === 0){
                                listId.push(item)
                              }
                       }

                })
                 setIncomeListInData(listId)
                 
                
            })
           
     }else {
            setIncomeListInData(copyIncomeListData)
     }
},[copyIncomeListData])
//7. income search end

//8. update and delete detail start
const [flatChangeDetail,setFlatChangeDetail] = useState({
    _id:"",
    isFlat:false
})//flat whenever delete or update info customer

const deleteDetail = useCallback((_id,deleteId)=> {
       setFlatChangeDetail({
             ...flatChangeDetail,
             _id:_id,
             isFlat:true
       })
        setIncomeListInData((oldState)=> {
            let incomeIndex = oldState.findIndex((item)=> item._id === _id)
            if(incomeIndex !== -1){
                  const everyDay = oldState[incomeIndex].everyDay
                  const deleteIndex = everyDay?.findIndex((element)=> element.id === deleteId)
                  if(deleteIndex !== -1){
                    everyDay?.splice(deleteIndex,1)
                  }
                  oldState[incomeIndex].everyDay = everyDay
                  return [...oldState]
            }
    })
},[flatChangeDetail])
useEffect(()=> {
    const updateDetail = async()=> {
   
        if(flatChangeDetail?.isFlat === true && flatChangeDetail?._id !== ""){
            setFlatChangeDetail(false)
 
            const income = incomeListInData?.find((item)=> item._id === flatChangeDetail?._id)
            const everyDay = income?.everyDay
            const data = {
                    _id: flatChangeDetail?._id,
                    everyDay:everyDay
            }
            await postRequest(`${baseUrl}/income/update`,JSON.stringify(data))
           
        }
    }
    updateDetail()
},[flatChangeDetail,incomeListInData])

//8. update àn delete detail end

//9. orders start
const [allOrders,setAllOrders] = useState([])
useEffect(()=> {
    const getAllOrders = async() => {
         const response = await getRequest(`${baseUrl}/orders/get-all-orders`)
         setAllOrders(response)
    }
    getAllOrders()
},[])
const [orderType,setOrderType] = useState({
       orderWaiting:"",
       orderProcessed:"",
       orderProcessing:""
})

useEffect(()=> {
    let orderWaiting = []
    let orderProcessed = []
    let orderProcessing = []
    allOrders?.map((item)=> {
         if(item.status == "Đợi"){
            orderWaiting.push(item)
        
         }else if(item.status == "Đang"){
            orderProcessing.push(item)
           
         }else {
            orderProcessed.push(item)
            
         }
         setOrderType({
            ...orderType,
            orderProcessed:orderProcessed,
            orderWaiting:orderWaiting,
            orderProcessing:orderProcessing
        })
    })
},[allOrders])
const [status,setStatus] = useState({
    data:null,
    _id:null
})// change status
const handleChangeSelect = (e,_id) => {
    setStatus({
        ...status,
        data:e.target.value,
        _id:_id
    })
}
const handlePressUpdateStatus =  useCallback(async()=> {
       if(status.data !== null && status._id !== null){
        setAllOrders((oldState)=> {
                const orderIndex = oldState?.findIndex((item)=> item._id == status._id)
                if(orderIndex !== -1){
                    oldState[orderIndex].status = status.data

                }
                return [...oldState]
        })
        await postRequest(`${baseUrl}/orders/update`,JSON.stringify(status))
        Swal.fire("Update thành công");
        setStatus({
            ...status,
            data:null,
            _id:null
        })
       }
},[status])


//9. orders end
//10. contact dashboard start
const [errorContact,setErrorContact] = useState(null)
const [loadingContact,setLoadingContact] = useState(false)
const [dataContact,setDataContact] = useState([])
const [contactInfo,setContactInfo] = useState({
     firstName:"",
     lastName:"",
     email:"",
     phone:"",
     address:"",
     message:""
})
const handleChangeContactInfo = useCallback((info)=> {
    setContactInfo(info)
})
const handlePressContact = useCallback(async()=> {
             const data = {
                   fullName:contactInfo?.firstName + " " + contactInfo?.lastName ,
                   email:contactInfo?.email !== "" ? contactInfo?.email : "",
                   phone:contactInfo?.phone,
                   address:contactInfo?.address !== "" ? contactInfo?.address : "",
                   message:contactInfo?.message
             }
             setLoadingContact(true)
             setErrorContact(null)
             const response = await postRequest(`${baseUrl}/contact`,JSON.stringify(data))
             setLoadingContact(false)
             if(response.error){
                return setErrorContact(response)
             }
             setContactInfo({
                firstName:"",
                lastName:"",
                email:"",
                phone:"",
                address:"",
                message:""
             })
             Swal.fire("Gửi lời nhắn thành công");
             setDataContact([
                ...dataContact,
                response
             ])
},[contactInfo])
useEffect(()=> {
    const getAllContact = async()=> {
          const response = await getRequest(`${baseUrl}/contact/get-all-message`)
          setDataContact(response)
    }
    getAllContact()
},[])
const deleteMessage = useCallback(async(_id)=> {
        setDataContact((oldState)=> {
                const messageIndex = oldState.findIndex((item)=> item._id === _id)
                if(messageIndex !== -1){
                      oldState.splice(messageIndex,1)
                }
               return [...oldState]
        })
})
const deleteMessageOnDatabase = useCallback(async(_id)=> {
        await postRequest(`${baseUrl}/contact/delete`,JSON.stringify({_id}))
}) 
//10. contact dashboard end
//11. admin start

const handleCheckAdmin = useCallback(async()=> {
        const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
        if(token){
              const info = {
                  token
              }
              setIsAdmin(false)
              const response = await postRequest(`${baseUrl}/user/admin`,JSON.stringify(info))
              if(response.error){
                    alert("Bạn cần đăng nhập lại")
                    localStorage.removeItem("token")
                    setUser(null)
                  return  dispatchReducerNavUserMain("closeAll")
              }
              setIsAdmin(response)
        }
},[])

//11. admin end
//12. update detail dashboard start
const [flatUpdateDetailDashboard,setFlatUpdateDetailDashboard] = useState(false)
const handleFlatUpdateDetailDashboard = (flat) => {
    setFlatUpdateDetailDashboard(flat)
}

const [updateDetailDashboard,setUpdateDetailDashboard] = useState({
    nameCustomer:"",
    typeService:"",
    total:"",
    _id:"",
    _idIn:""

})
const handleUpdateDetailDashboard = (info) => {
    setUpdateDetailDashboard(info)
}
const handleItemDetailNeedUpdate = useCallback((item)=> {
    setUpdateDetailDashboard({
        ...updateDetailDashboard,
        _id:item._id,
        nameCustomer:item?.item.nameCustomer,
        typeService:item?.item.typeService,
        total:item?.item.total,
        _idIn:item?.item.id
    })
})
const [flatChanged,setFlatChanged] = useState(false)
const handlePressUpdateDetailDashboard = useCallback(async() =>{
    setIncomeListInData((oldState)=>{
            const data = {
                nameCustomer:updateDetailDashboard?.nameCustomer,
                typeService:updateDetailDashboard?.typeService,
                total:updateDetailDashboard?.total,
                id:updateDetailDashboard?._idIn
            }
            const indexIncome = oldState.findIndex((item)=> item._id === updateDetailDashboard?._id)
            if(indexIncome !== -1){
                const indexIn = oldState[indexIncome].everyDay.findIndex((item)=> item.id === updateDetailDashboard?._idIn)
                if(indexIn  !== -1){
                    oldState[indexIncome].everyDay[indexIn] = data
                }
            }
            return [...oldState]

            
    })
    setFlatChanged(true)
},[updateDetailDashboard])
useEffect(()=> {
     const  updateDashboardToDB = async() => {
        if(flatChanged){
            const  data = {
              _id:updateDetailDashboard?._id,
              dataUpdate: incomeListInData
            }
            await postRequest(`${baseUrl}/income/update-detail-after`,JSON.stringify(data))
     }
     }
     updateDashboardToDB()
   
},[flatChanged,incomeListInData])


//12 update detail dashboard end

//----------Dashboard Page end-------//


//----------Shop Page end-------//
//1.nav cart shop start
const initialCartShop = {
      isCartShop:false
}
const reducerCartShop = (state,action) => {
      switch (action.type){
         case "CartShop":
            return {
                ...state,
                isCartShop:true
            }
          case "closeCartShop":
            return {
                ...state,
                isCartShop:false
            }  
      }
}
const [initialCartShopMain,reducerCartShopMain] = useReducer(reducerCartShop,initialCartShop)
const dispatchCartShopMain = (info) => {
    reducerCartShopMain({
        type:info
    })
}
//1.nav cart shop end

//2. search on shop page start



const handleSearchOnShop = useCallback((e)=>{
      const text = convertText((e.target.value).trim().toLowerCase())
      if(text !== ""){
        const data = copyDataUploadProduct?.map((item)=> {
            const itemName = item.nameProduct
            const itemNameFilter = convertText(itemName?.trim().toLowerCase())
            const dataVil = itemNameFilter.includes(text)
            if(dataVil) {
                return item
            }else {
                return null
            }
        })

        const dataList = data?.filter((item)=> item !== null)
        setDataUploadProduct(dataList)
      }else {
          setDataUploadProduct([
            ...copyDataUploadProduct
          ])
      }  
},[copyDataUploadProduct])

const convertText = (str)=> {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");

    return str
}
//2. search on shop page end

//3. add product to shop start
const [dataOfProductOnCart,setDataOfProductOnCart] = useState([])
const handleAddProductOnCart = useCallback((item) => {
        const isHave = dataOfProductOnCart?.filter((element)=>element._id === item._id)
        if(isHave?.length == 0){
            setDataOfProductOnCart([
                ...dataOfProductOnCart,
               {
                ...item,
                SL:1
               }
             ])
           const data = [
                 ...dataOfProductOnCart,
                 {
                    ...item,
                    SL:1
                 }
           ]
           localStorage.setItem("products",JSON.stringify(data))
        }
},[dataOfProductOnCart])
useEffect(()=> {
     let data = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
     setDataOfProductOnCart(data)
},[])


//3. add product to shop end

//4. +1 and -1 start
const addFunc = useCallback((_id) => {

      setDataOfProductOnCart((oldState)=> {
          const productIndex = oldState.findIndex((item)=> item._id === _id)
   
          if(productIndex !== -1){
              oldState[productIndex].SL = oldState[productIndex].SL+ 1;
          }
          localStorage.setItem("products",JSON.stringify([...oldState]))
          return [...oldState]
      })
},[dataOfProductOnCart])
const subtractFunc = useCallback((_id) => {
     setDataOfProductOnCart((oldState)=> {
        const productIndex = oldState.findIndex((item)=> item._id === _id)
        if(productIndex !== -1){
            if(oldState[productIndex].SL > 1){
                oldState[productIndex].SL = oldState[productIndex].SL - 1;
            }else {
                oldState.splice(productIndex,1)
            }
        }
        if([...oldState].length === 0){
            localStorage.removeItem("products")
        }else {
            localStorage.setItem("products",JSON.stringify([...oldState]))
        }
        
        return [...oldState]
    })
},[dataOfProductOnCart])
const deleteFunc = useCallback((_id)=> {
    setDataOfProductOnCart((oldState)=> {
        const productIndex = oldState.findIndex((item)=> item._id === _id)
        if(productIndex !== -1){
                oldState.splice(productIndex,1)   
        }
        if([...oldState].length === 0){
             localStorage.removeItem("products")
        }else {
            localStorage.setItem("products",JSON.stringify([...oldState]))
        }
        return [...oldState]
    })
},[dataOfProductOnCart])


//4. +1 and -1 end
//5. info customer start
const navigate = useNavigate()
const [errorOrder,setErrorOrder] = useState(null)
const [loadingOrder,setLoadingOrder] = useState(false)
const [infoCustomer,setInfoCustomer] = useState({
     nameCustomer:"",
     phoneCustomer:"",
     addressCustomer:"",
     commend:""
})
const [dataBuyNow,setDataBuyNow] = useState(null)//data whenever customer click buy now button
const handleChangeInfoCustomer = (info) => {
    setInfoCustomer(info)
}
const handlePressOrder = useCallback(async(e)=> {
      e.preventDefault()
      if(user){
        if(infoCustomer.nameCustomer !== "" && infoCustomer.phoneCustomer !== "" && infoCustomer.addressCustomer !== ""){
            setLoadingOrder(true)
            setErrorOrder(null)
            const data = {
                ...infoCustomer,
                orders:dataBuyNow !== null ? dataBuyNow : dataOfProductOnCart,
                userId:user._id
            } 
       
            Object.keys(data).forEach(key => data[key] == "" && delete data[key]); 
            const response = await postRequest(`${baseUrl}/orders`,JSON.stringify(data))
            if(response.error){
                 setLoadingOrder(false)
                 return setErrorOrder(response)
            }
            const userForEmail = {
                 userEmail:user?.email,
                 ...infoCustomer
            }
            await postRequest(`${baseUrl}/mail/send`,JSON.stringify({...userForEmail,orders:data?.orders}))
            Swal.fire("Mua hàng thành công. Vui lòng kiểm tra email");
            setLoadingOrder(false)
            dispatchCartShopMain("closeCartShop")
           
            if(dataBuyNow == null){
                localStorage.removeItem("products")
                setDataOfProductOnCart([])
            } 
        }
      }else {
       
         alert("Bạn cần đăng nhập")
         return  navigate("/")
      }
      
},[infoCustomer,dataOfProductOnCart,user,dataBuyNow])
const [isOrder,setIsOrder] = useState(false)
const handleChangeIsOrder = (info)=> {
    setIsOrder(info)
}
const pressBuyNow = useCallback((item)=> {
    dispatchCartShopMain("CartShop")
    
    if(item){
        setDataBuyNow([
            {
                ...item,
                SL:1
            }
         ])
        handleChangeIsOrder(true)
    }else {
        setDataBuyNow(null)
    }
    

})
const addBuyNow = useCallback(()=> {
      setDataBuyNow((oldState)=> {
         oldState[0].SL = oldState[0].SL + 0.5
         return [...oldState]
      })
      
})
const subtractBuyNow = useCallback(()=> {
    setDataBuyNow((oldState)=> {
        oldState[0].SL = oldState[0].SL === 1 ? 1 : oldState[0].SL - 0.5
        return [...oldState]
    })
})
//5. info customer end
//----------Shop Page end-------//
//----------main page start-----------//
//1. comment about start
const [dataAbout,setDataAbout] = useState([])
const [isFormAbout,setIsFormAbout] = useState(false)//nav for form comment
const handleIsFormAbout = (flat) => {
    setIsFormAbout(flat)
}
const [commentInfo,setCommentInfo] = useState({
       text:"",
       rating:null
})
const handleChangeCommentInfo = (info) => {
    setCommentInfo(info)
}
const [commentError,setCommentError] = useState(null)
const [commentLoading,setCommentLoading] = useState(false)

const handlePressComment = useCallback(async()=> {
    setCommentLoading(true)
    setCommentError(null)
    const data = {
        ...commentInfo,
        idUser:user?._id
    }
    const response = await postRequest(`${baseUrl}/about/put-data-about`,JSON.stringify(data))
    if(response.error){    
        setCommentLoading(false)  
       return setCommentError(response)
    }
    setCommentLoading(false)
    setDataAbout([
        ...dataAbout,
        response
    ])
      handleIsFormAbout(false)
     Swal.fire("Cảm ơn vì góp ý của bạn")
},[commentInfo])
useEffect(()=> {
      const getDataAbout =  async()=> {
           const response = await getRequest(`${baseUrl}/about/get-all-data-about`)
           setDataAbout(response)
      }
      getDataAbout()
},[])

//2. comment about end
//----------main page end-----------//

    return ( 
    <AuthContext.Provider value={{
        //Dashboard start
              
             //1. upload product start
                uploadProductInfo,
                handleChangeUploadProductInfo,
                 handlePressUploadProduct,
                 dataUploadProduct,
                 deleteProductDashboard,
                 ErrorUploadProduct,
                 loadingUploadProduct,
              //1. upload product end

              //2. put initial data start
                 initialDataInfo,
                 handleChangePutInitialDataInfo,
                 handlePressPutInitialDataInfo,
                 initialData,
                 handleUpdateInitialInfo,
              //2. put initial data end
              //3. dashboard nav start
              dispatchReducerDashboardNavMain,
              initialDashboardNavMain,
               //3. dashboard nav end
               //4. order nav start
               dispatchNavOnOrderMain,
               navOnOrderMain,
               //4. order nav end
               //5. income customer add product start
               handlePressAddInfoAddCustomer,
               handleChangeInfoAddCustomer,
               infoAddCustomer,
               pressOffDay,
               ofDayLoading,
               incomeListInData,
               incomeList,
                //5. income customer add product end
                //6. income nav start
                handlePressDispatchNavIncomeMain,
                navIncomeMain,
                //6. income nav end
                //7 search income start
                handleSearchIncome,
                //7 search income end
                //8 update and delete start
                deleteDetail,
                //8.update and delate end
                //9. order start
                allOrders,
                orderType,
                handleChangeSelect,
                handlePressUpdateStatus,
                errorOrder,
                loadingOrder,
                //9. order end

                //10. buy now start
                dataBuyNow,
                pressBuyNow,
                isOrder,
                handleChangeIsOrder,
                addBuyNow,
                subtractBuyNow,
                //10. buy now end
                //11 contact dashboard start
                handleChangeContactInfo,
                contactInfo,
                handlePressContact,
                loadingContact,
                errorContact,
                dataContact,
                deleteMessage,
                deleteMessageOnDatabase,
                //11 contact dashboard end
                //12 admin start
                handleCheckAdmin,
                isAdmin,
                //12 admin end
                //13 update detail dashboard start
                updateDetailDashboard,
                handleUpdateDetailDashboard,
                handleItemDetailNeedUpdate,
                handleFlatUpdateDetailDashboard,
                flatUpdateDetailDashboard,
                handlePressUpdateDetailDashboard,
                //13 update detail dashboard end
        //Dashboard end
        //user start
                user,
           //1. login user start
                handleChangeInfoPassword,
                infoSignIn,
                loginUser,
                deleteUser,
                handleLogout,
                loginLoading,
                loginError,
           //1 login user end

           //2 sign up start
               handleChangeInfoSignUp,
               infoSignUp,
               pressSignUp,
               errorSignUp,
               loadingSignUp,
           //2 sign uo end
             //3. nav user start
                 dispatchReducerNavUserMain,
                 initialNavUserMain,
              //3. nav user end

              //4 change user start
              handleChangeUserInfo,
              changeUserInfo,
              changePassword,
              handleChangePassword,
              handlePressChangeUser,
              handleCheckOldPassword ,
              navPassword,
              handleNewPassword,
              updateInfoUserLoading,
              updateInfoUserError,
              checkOldPasswordLoading,
              checkOldPasswordError,
              newPasswordError,
              newPasswordLoading,
              //4 change user end
              //5 forgot password start
              handleChangeForgotPassword,
              forgotInfo,
              handlePressForgotPassword,
              isValidUser,
              isForgotPassword,
              handlePasswordNotSignIn,
              passwordNotSignIn,
              handlePressChangePasswordNotSignIn,
              handleChangeIsForgotPassword,
              //5 forgot password end
              //6. forgot password not sign in start
              passwordNotSignInError,
              passwordNotSignInLoading,
              forgotPasswordLoading,
              forgotPasswordError,
              //6. forgot password not sign in end


        //user end

        //shop start
        //1. nav cart shop start
        initialCartShopMain,
        dispatchCartShopMain,
        //1. nav cart shop end
        //2. search  start
        handleSearchOnShop,

        //2.search end
        //3. add product to shop start
        handleAddProductOnCart,
        dataOfProductOnCart,
        //3. add product to shop end
        //4. +1 and -1 start
        addFunc,
        subtractFunc,
        deleteFunc,
        //4. +1 and -1 end


        //5. info customer start
        handleChangeInfoCustomer,
        infoCustomer,
        handlePressOrder,
        //5. info customer end
        //shop end
        //main page start
        handleChangeCommentInfo,
        commentInfo,
        handlePressComment,
        handleIsFormAbout,
        isFormAbout,
        commentError,
        commentLoading,
        dataAbout

        //main page end
        
    }}>
        {children}
    </AuthContext.Provider>
    
    )
}
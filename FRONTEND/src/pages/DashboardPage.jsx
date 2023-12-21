import ShopMain from "../components/dashboardComponent/ShopMain"
import {useNavigate} from "react-router-dom"
import {  useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
const DashboardPage = () => {
    const {user,isAdmin} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=> {
              
               if(user && isAdmin === true){
                    navigate("/dashboard")
                }else {
                  navigate("/")
                  alert("Bạn không có quyên truy cập")
                 }
    },[navigate,user,isAdmin])
    return ( 
       <div className="dashboard" style={{display: isAdmin ? "flex" : "none"}}>
               <ShopMain/>
       </div>
     );
}
 
export default DashboardPage;
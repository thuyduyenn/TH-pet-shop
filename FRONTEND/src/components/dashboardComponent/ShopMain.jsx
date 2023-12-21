
import Products from "./Products"
import Income from "./Income"
import Order from "./Order"
import Contact from "./Contact"
import PutInitialData from "./PutInitialData"
import { useCallback, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"


const ShopMain = () => {
     const {dispatchReducerDashboardNavMain,initialDashboardNavMain} = useContext(AuthContext)
     const ul = document.querySelectorAll(".dashboard-nav li")
     const clickLi = useCallback((e)=> {
             ul?.forEach((item)=>{
                   item.classList.remove("mark-border")

             })
             e.target.classList.add("mark-border")

     },[ul])
     
    return ( 
        <div className="dashboard-container">
             <div className="dashboard-nav">
                  <div className="logo">
                        <div>
                            <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1699429697/initialDataPetShop/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2023-11-08_lu%CC%81c_14.45.49-removebg-preview_hioimb.png" alt="logo"/>
                        </div>
                  </div>
                  <ul>
                      <li className="mark-border" onClick={(e)=>{
                      dispatchReducerDashboardNavMain("Order"),
                      clickLi(e)
                      }}>Đơn hàng </li>
                      <li onClick={(e)=>{

                      dispatchReducerDashboardNavMain("Products"),
                      clickLi(e)
                      }}>Sản phẩm</li>
                      <li onClick={(e)=>{

                      dispatchReducerDashboardNavMain("Income"),
                      clickLi(e)
                      }}>Doanh thu</li>
                      <li onClick={(e)=>{
                       dispatchReducerDashboardNavMain("Contact"),
                       clickLi(e)
                       }}>Liên hệ</li>
                        <li onClick={(e)=>{
                       dispatchReducerDashboardNavMain("InitialData"),
                       clickLi(e)
                       }}>DL Ban đầu</li>
                      <li> <Link to="/">Trang chủ</Link></li>
                  </ul>
             </div>
             <div className="dashboard-main">
                  <div className="label">
                      Dashboard
                  </div>
                  <div className="line-hor"></div>
                  <div className="constructor">
                       <div className="constructor-container">
                              {initialDashboardNavMain?.isOption === "Income" && (<Income/>) || initialDashboardNavMain?.isOption === "Products" && (<Products/>) || initialDashboardNavMain?.isOption === "Order" && (<Order/>) || initialDashboardNavMain?.isOption === "Contact" && (<Contact/>) || initialDashboardNavMain?.isOption === "InitialData" && (<PutInitialData/>)}     
                       </div>
                  </div>
             </div>
        </div>
     );
}
 
export default ShopMain;
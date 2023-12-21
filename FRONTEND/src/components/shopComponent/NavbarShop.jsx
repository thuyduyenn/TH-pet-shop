import {FaSearch} from "react-icons/fa"
import {GiShoppingCart} from "react-icons/gi"
import { useCallback, useContext,useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import {IoHome} from "react-icons/io5"
import {Link} from "react-router-dom"
const ShopNavbar = () => {
     const {dispatchCartShopMain,handleSearchOnShop,dataOfProductOnCart} = useContext(AuthContext)
      const handleSearchTool = useCallback(()=> {
          const searchTool = document.querySelector(".search-tool")
          searchTool.classList.toggle("see")
      },[])
     
 
    return ( 
        <section className="navbar-shop-section">
                <div className="navbar-shop-container">
                    <div className="logo">
                         <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1699429698/initialDataPetShop/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2023-11-08_lu%CC%81c_14.46.29-removebg-preview_segnhm.png" alt="logo"/>  
                    </div>
                    <div className="search-tool">
                           <input type="text" placeholder="bạn cần mua loại gì ???" onChange={(e)=>handleSearchOnShop(e)}/>
                           <div><FaSearch /></div>
                    </div>
                    <div className="navigate">
                           <div className="search-icon" style={{display:"none"}} onClick={()=>  handleSearchTool()}>
                               <FaSearch />
                           </div>
                           <div className="backBtn">
                                <Link to="/">  
                                     Trang chủ
                                </Link>
                                
                           </div>
                           <div className="home-icon" style={{display:"none"}}>
                                <Link to="/">
                                     <IoHome />
                                </Link>
                               
                           </div>

                           <div className="cart" onClick={() => dispatchCartShopMain("CartShop")}>
                                <GiShoppingCart />
                                <div>{dataOfProductOnCart?.length}</div>
                           </div>
                    </div>
                </div>
               

        </section>
     );
}
 
export default ShopNavbar;
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {FaShopify} from "react-icons/fa"
import { Link } from "react-router-dom"
const Introduce = () => {
    const {initialData} = useContext(AuthContext)
    return ( 
        <div className="introduce">
             <div className="introduce-left">
                   <div className="mark-section">
                         <div></div>
                         <h3>Home</h3>
                   </div>
                   <h2>I'm Hạnh</h2>
                   <h1>Được đào tạo <br/> Chuyên sâu</h1>
                   <div className="text-intro">{initialData?.textHome}</div>
                   <Link to="/shop">
                   <div className="shopBtn">
                       <div>
                             <FaShopify/>
                       </div>
                       <div>
                            Shop now
                       </div>
                   </div>
                   </Link>
                   
             </div>
             <div className="introduce-right">
                    <h1>HANH</h1>
                    <div className="wall">
                        <div>
                            <img src={initialData?.imageHome.url} alt="shopper"></img>
                        </div>
                    </div>
                  
             </div>
        </div>
     );
}
 
export default Introduce;
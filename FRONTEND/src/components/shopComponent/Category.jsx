import { useContext } from "react";
import {GiShoppingCart} from "react-icons/gi"
import { AuthContext } from "../../context/AuthContext";
import Cart from "./Cart"
const Category = () => {
      const { dataUploadProduct,handleAddProductOnCart,pressBuyNow } = useContext(AuthContext)
    return ( 
        <section className="category-section">
               <div className="mark-section">
                    <div></div>
                    <h3>Shop now</h3>
               </div>
               <div className="category-section-container">
                       <div className="category-left">
                            <div className="list-product">
                                    { dataUploadProduct?.length === 0 && 
                                         <div>
                                              Không có sản phẩm nào
                                         </div>
                                    }
                                    {
                                                dataUploadProduct.map((item,index)=> {
                                                return (
                                                      <div className="product" key={index} >
                                                               <div className="image-pro">
                                                                       <img src={item.imageProduct.url} alt="product"/>
                                                               </div>
                                                               <h3>{item.nameProduct}</h3>
                                                               <div className="box">
                                                                     <h6>{item.commend}</h6>
                                                               </div>
                                                              
                                                               <div className="price-pro">
                                                                     <span>{item.price}k</span> / 1 bịch
                                                               </div>
                                                               <div className="buyBtn" onClick={()=>pressBuyNow(item)}>
                                                                    Mua ngay
                                                               </div>
                                                               <div className="add-cart">
                                                                     Thêm vào giỏ hàng <GiShoppingCart id="cart" onClick={()=>handleAddProductOnCart(item)}/>
                                                               </div>

                                                     </div>
                                                )
                                          })
                                    }
                                   
                            </div>
                            <div className="scroll">
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                            </div>
                       </div>
                       <div className="line-ver">

                       </div>
                       <div className="category-right">
                                   {
                                          dataUploadProduct?.map((item,index)=> {
                                                if(item.news !== "0" || item.sales !== "0"){
                                                       return (
                                                            <div className="product" key={index}>
                                                                         <div className="image-pro">
                                                                                 <img src={item.imageProduct.url} alt="product"/>
                                                                         </div>
                                                                         <h3>{item.nameProduct}</h3>
                                                                         <div className="box">
                                                                            <h6>{item.commend}</h6>
                                                                         </div>
                                                                    
                                                                         <div className="price-pro">
                                                                               <span>{item.price} K</span> / 1 bịch
                                                                         </div>
                                                                         <div className="buyBtn" onClick={()=>pressBuyNow(item)}>
                                                                              Mua ngay
                                                                          </div>
                                             
                                                                             <ul>
                                                                                <div>
                                                                                     <li style={{visibility: item.news !== "0" ? "visible" : "hidden"}}>New</li>
                                                                                     <li style={{visibility: item.sales !== "0" ? "visible" : "hidden"}}>Sales: {item.sales}%</li>
                                                                                 </div>
                                                                                 <li><GiShoppingCart onClick={()=>handleAddProductOnCart(item)}/></li>

                                                                             </ul>      

                                                                </div>
                                                       )
                                             
                                                   } 
                                          })
                                    }
                                   
                                    
                       </div>
               </div>
               <Cart/>
        </section>
     );
}
 
export default Category;
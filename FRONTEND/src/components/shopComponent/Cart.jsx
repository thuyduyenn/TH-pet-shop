import {MdDelete } from "react-icons/md"
import {FaTimes,FaMapSigns  } from "react-icons/fa"
import {RiFileUserFill} from "react-icons/ri"
import {BsPhoneFill } from "react-icons/bs"
import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../../context/AuthContext"

const Cart = () => {
    const {initialCartShopMain,dispatchCartShopMain,dataOfProductOnCart,addFunc,subtractFunc,deleteFunc, handleChangeInfoCustomer,infoCustomer,handlePressOrder,pressBuyNow ,isOrder,handleChangeIsOrder,dataBuyNow,addBuyNow,subtractBuyNow,  errorOrder,loadingOrder} = useContext(AuthContext)
    
    const [total,setTotal] = useState(0)
    useEffect(()=> {
         let sum = 0;
        const totalFunc = ()=> {
             for(let i = 0;i < dataOfProductOnCart.length;i++){
                   sum +=  dataOfProductOnCart[i].price * dataOfProductOnCart[i].SL
             }
             setTotal(sum)
        }
        totalFunc()
    },[dataOfProductOnCart])
    return ( 
        <div className={initialCartShopMain?.isCartShop ? "cart-shop see" : "cart-shop"}>
             <div className="cart-shop-container"  style={{display: isOrder ? "none" : "flex"}}>
                  
                     <div className="closeBtn" onClick={()=>dispatchCartShopMain("closeCartShop")}>
                          <FaTimes/>
                     </div>
                    <div className="mark-container">
                      <div className="mark-cart">
                            <div></div>
                            <div>Your Cart</div>
                        </div>
                    </div>
                    <div className="table">
                    <table>
                        <thead>
                          <tr>
                              <th>Sản phẩm</th>
                              <th>Giá</th>
                              <th>Số lượng</th>
                              <th>Thành tiền</th>
                              <th>Xoá</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                            dataOfProductOnCart?.length === 0 && 
                              (<tr>
                                  <td>
                                     Bạn vẫn chưa mua sản phẩm nào
                                  </td>
                                </tr>)
                        }
                        {
                            
                            dataOfProductOnCart?.length !== 0 &&  dataOfProductOnCart.map((item,index)=>{
                             
                                return (
                                         <tr className="info" key={index}> 
                                           <td>
                                               <img src={item.imageProduct.url} alt="product"/>
                                           </td>
                                            <td>{item.price} K</td>
                                            <td>
                                           <div id="change">
                                                     <div id="subtract" onClick={()=>subtractFunc(item._id)}>-</div>
                                                     <div id="number">{item.SL}</div>
                                                     <div id="add" onClick={()=>addFunc(item._id)}>+</div>
                                                 </div>
                                 
                                           </td>
                                          <td>{item.price * item.SL}K</td>
                                           <td><MdDelete id="delete-icon" onClick={()=>deleteFunc(item._id)}/></td>
                                       </tr>
                                )
                            })
                            
                          
                        }
                           
                        </tbody>
                        </table>
                    </div>     
                       {
                        dataOfProductOnCart?.length !== 0 &&  (
                            <div className="total">
                                    <div className="total-box">
                                        <div>Tổng tiền: <span>  {total} </span>k</div>
                                        <div onClick={()=>handleChangeIsOrder(true)}>Mua ngay</div>
                                    </div>
                           
                                </div>
                        )
                       }
                              
                        
             </div>
             <div className="order-shop" style={{display: isOrder ? "flex" : "none"}}>
                    <div className="closeBtn" onClick={()=>{
                        handleChangeIsOrder(false),
                        pressBuyNow(null)
                        }}>
                          <FaTimes/>
                     </div>
                    <div className="mark-container">
                      <div className="mark-cart">
                            <div></div>
                            <div>Your Orders</div>
                        </div>
                    </div>
                
                <div className="order-main">
                       <div className="order-box">
                            <div className="order-info">
                                  <h3>Thông tin nhận hàng</h3>
                                  <form>
                                       <div className="name">
                                          <RiFileUserFill id="icon"/>
                                          <input type="text" placeholder="tên người nhận hàng" onChange={(e)=>handleChangeInfoCustomer({
                                              ...infoCustomer,
                                              nameCustomer:e.target.value
                                          })}/>
                                       </div>
                                       <div className="phone">
                                          <BsPhoneFill id="icon"/>
                                          <input type="text" placeholder="số điện thoại liên lạc" onChange={(e)=>handleChangeInfoCustomer({
                                              ...infoCustomer,
                                              phoneCustomer:e.target.value
                                          })}/>
                                       </div>
                                       <div className="address">
                                          <FaMapSigns id="icon"/>
                                          <input type="text" placeholder="địa chỉ nhận hàng" onChange={(e)=>handleChangeInfoCustomer({
                                              ...infoCustomer,
                                              addressCustomer:e.target.value
                                          })}/>
                                       </div>
                                       <textarea placeholder="chú thích" onChange={(e)=>handleChangeInfoCustomer({
                                              ...infoCustomer,
                                              commend:e.target.value
                                          })}></textarea>
                                          <div>{errorOrder?.message}</div>
                                  </form>
                                  <div className="sendBtn">
                                         <div className="sendBtn-container" onClick={(e)=>handlePressOrder(e)}>
                                               {loadingOrder ? "loading" : "Xác nhận"}
                                         </div>
                                  </div>
                            </div>
                            <div className="line-ver">
                                <div></div>
                            </div>
                            <div className="product-order" style={{display: dataBuyNow !== null ? "none" : "flex"}}>
                                  <h3>Sản phẩm</h3>
                                  <div className="product-order-container">
                                      {
                                        dataOfProductOnCart?.length !== 0 &&  dataOfProductOnCart.map((item,index)=>{
                                            return (
                                                <div className="order-item " key={index}>
                                             <div className="image">
                                                <img src={item.imageProduct.url} alt="product"/>
                                             </div>
                                             <div className="order-info">
                                                   <h5>Tên: {item.nameProduct}</h5>
                                                   <h4>SL: {item.SL}</h4>
                                                   <h3>Tổng tiền: {item.price * item.SL} k</h3>
                                             </div>
                                            </div>
                                            )
                                        })
                                      }
                                  </div>
                                  <div className="total">
                                       <div className="total-container">
                                              Tổng tiền:  <span>{total}</span>k
                                       </div>
                                  </div>

                            </div>
                            <div className="product-order" style={{display: dataBuyNow !== null ? "flex" : "none"}}>
                                  <h3>Sản phẩm</h3>
                                  <div className="product-order-container">
                                      {
                                        dataBuyNow?.length !== 0 &&  dataBuyNow?.map((item,index)=>{
                                            return (
                                                <div className="order-item " key={index}>
                                             <div className="image">
                                                <img src={item.imageProduct.url} alt="product"/>
                                             </div>
                                             <div className="order-info">
                                                   <h5>Tên: {item.nameProduct}</h5>
                                                   <h4 className="changeNumberInBuyNow">SL: <span onClick={()=>subtractBuyNow()}>-</span> <span>{item.SL} </span><span onClick={()=>addBuyNow()}>+</span> </h4>
                                                   <h3>Tổng tiền: {item.price * item.SL} k</h3>
                                             </div>
                                            </div>
                                            )
                                        })
                                      }
                                  </div>
                                  

                            </div>
                       </div>
                </div>
             </div>
        </div>
     );
}
 
export default Cart;
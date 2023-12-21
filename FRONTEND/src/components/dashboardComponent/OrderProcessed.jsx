import {ImArrowLeft} from "react-icons/im"
import { AuthContext } from "../../context/AuthContext";
import { useContext,useEffect,useState } from "react";
import moment from "moment"
const OrderProcessed = () => {
     const { dispatchNavOnOrderMain,orderType,handleChangeSelect,handlePressUpdateStatus} = useContext(AuthContext)
     const [orderProcessed,setOrderProcessed] = useState(null)
     const [detail,setDetail] = useState({
          isFlat:false,
          data:null,
          orders:null
      })
     useEffect(()=> {
          setOrderProcessed(orderType?.orderProcessed)
     },[orderType])
     const handleDetail = (item) => {
          setDetail({
               ...detail,
               isFlat:true,
               data:item,
               orders:item.orders
          })
     } 
     const handleCloseDetail = () => {
          setDetail({
               ...detail,
               isFlat:false,
               data:null,
               orders:null
          })
     }
    return ( 
     <div className="order-waiting">
     <div className="order-waiting-container">
            <div className="order-waiting-list">
                 <div className="order-waiting-box"  style={{display:detail?.isFlat ? "none" : "flex"}}>
                     <div className="order-waiting-box-label">
                          Đã giao
                     </div>
                     <div className="box">
                            <table>
                                <tr>
                                     <th>Sản phẩm</th>
                                     <th>Tên</th>
                                     <th>Số lượng</th>
                                     <th>Ngày đặt</th>
                                </tr>
                                        {
                                             orderProcessed?.length === 0 && (
                                                  <tr>
                                                       <td>Không có đơn hàng nào</td>
                                                  </tr>
                                             )
                                          }
                                          {
                                             orderProcessed?.length !== 0 &&  orderProcessed?.map((item,index)=> {
                                                  return (
                                                       <tr key={index} onClick={()=>handleDetail(item)}>
                                                               <td>{index + 1}</td>
                                                               <td>{item.nameCustomer}</td>
                                                               <td>{item.orders.length}</td>
                                                               <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                                                     </tr>
                                                  )
                                             })
                                          }
                            </table>
                     </div>
                 </div>
                 <div className="detail" style={{display:detail?.isFlat ? "flex" : "none"}}>
                      <div className="backBtn" onClick={handleCloseDetail}><ImArrowLeft /></div>
                      <div className="detail-label">
                              Chi tiết đơn hàng
                      </div>
                      <div className="detail-item">
                               <ul className="top-container">
                                       {
                                             detail?.orders?.map((item,index)=> {
                                                  return (
                                                       <div className="top" key={index}>
                                                              <div className="image">
                                                                   <img src={item.imageProduct.url} alt=""/>
                                                              </div>
                                                              <ul className="info">
                                                                    <li>{item.nameProduct}</li>
                                                                    <li>SL: {item.SL}</li>
                                                                    <li>Giá : {item.price * item.SL}k</li>
                                                              </ul>
                                                       </div>
                                                  )
                                             })
                                        }
                                        
                                         </ul>
                                         <ul className="between">
                                               <li>Tên người nhận: <span>{detail?.data?.nameCustomer}</span></li>
                                               <li> Số điện thoại: <span>{detail?.data?.phoneCustomer}</span></li>
                                               <li> Địa chỉ: <span>{detail?.data?.addressCustomer}</span></li>
                                         </ul>
                                         {
                                               detail?.isFlat === true && (
                                                  <div className="bottom">
                                                  <div className="select">
                                                  <select defaultValue={detail?.data?.status} onChange={(e)=>handleChangeSelect(e,detail?.data?._id)}>
                                                       <option value="Đợi">Đợi xử lí</option>
                                                       <option value="Đang">Đang xử lí</option>
                                                       <option value="Đã">Đã xử lí</option>
                                                  </select>

                                                   </div>
                                                      <div className="updateBtn" onClick={()=>handlePressUpdateStatus()}>
                                                            update
                                                      </div>
                                                     </div>
                                               )
                                                }
                      </div>
                 </div>
            </div>
            <div className="order-waiting-nav">
                 <div className="top"  onClick={()=>dispatchNavOnOrderMain("OrderWait")}>
                      <div>Đợi xử lí </div>
                      <div><span>{orderType?.orderWaiting?.length}</span> đơn</div>
                 </div>
                 <div className="bottom"  onClick={()=>dispatchNavOnOrderMain("OrderProcessing")}>
                      <div> Đang giao</div>
                      <div><span>{orderType?.orderProcessing?.length}</span> đơn</div>
                 </div>
            </div>
     </div>
  </div>
     );
}
 
export default OrderProcessed;
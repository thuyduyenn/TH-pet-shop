import {FaRegPlusSquare,FaSearch,FaTimes} from "react-icons/fa"
import {MdDelete,MdBackspace} from "react-icons/md"
import {CgArrowsExchangeAlt} from "react-icons/cg"
import {TiArrowBack} from "react-icons/ti"
import {BiSolidSave } from "react-icons/bi"
import { useCallback, useContext,useEffect,useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import moment from "moment"

const Income = () => {
    const {handlePressAddInfoAddCustomer,handleChangeInfoAddCustomer,infoAddCustomer,pressOffDay,ofDayLoading,incomeListInData,handlePressDispatchNavIncomeMain,navIncomeMain ,incomeList,handleSearchIncome,deleteDetail,updateDetailDashboard,handleUpdateDetailDashboard, handleItemDetailNeedUpdate,handleFlatUpdateDetailDashboard,flatUpdateDetailDashboard,handlePressUpdateDetailDashboard} = useContext(AuthContext)
    const [addCustomer,setAddCustomer] = useState(false)
    const [detail,setDetail] = useState(null)
    const [incomeIndex,setIncomeIndex] = useState(null)
    const [deleteId,setDeleteId] = useState(null)
    const [nowDate,setNowDate] = useState(null)
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    useEffect(()=> {
        var today = new Date(),
        date = today.getDate()  + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        setNowDate(date)
    },[])
    const handleClickDelete = useCallback(()=> {
        handleClose()
        deleteDetail(incomeIndex,deleteId)
    },[incomeIndex,deleteId])
  
    return (  
        <div className="income">
              <div className={ show == true ? "confirm see" : "confirm"}>
                         <div className="top">
                            <div>Delete</div>
                            <div className="closeBtn" onClick={handleClose}><FaTimes/></div>
                         </div>
                         <div className="body" >Bạn có chắc chắn là xoá không ???</div>
                         <div className="footer">
                             <div onClick={handleClickDelete}>Chắc chắn</div>
                             <div onClick={handleClose}>Quay lại</div>
                         </div>
              </div>
              <div className={navIncomeMain?.Today ? "income-container see" : "income-container"} >
                      
                      <ul >
                           <li>
                              <div></div>
                              <div>Hôm nay</div>
                           </li>
                           <li>
                               <div onClick={()=>pressOffDay()}>{ofDayLoading ? "loading" : "Kết thúc ngày"}</div>
                               <div onClick={()=>setAddCustomer(true)}><FaRegPlusSquare  /></div>
                           </li>
                      </ul>
                       <div className="table">
                             <table>
                                 <thead>
                                 <tr>
                                       <th>Tên</th>
                                       <th>Loại dịch vụ</th>
                                       <th>Tổng tiền</th>
                                       <th>Ngày tháng</th>
                                       <th>Xoá</th>
                                  </tr>
                                 </thead>
                                 
                                 <tbody>
                                 <tr id="add-product-dashboard" style={{display:addCustomer ? "" : "none"}}>
                                       <td id="name"> 
                                        <input type="text" placeholder="Tên khách hàng" onChange={(e)=>handleChangeInfoAddCustomer({
                                            ...infoAddCustomer,
                                            nameCustomer:e.target.value
                                       })}/></td>
                                       <td >
                                       <input type="text" placeholder="Loại dịch vụ" onChange={(e)=>handleChangeInfoAddCustomer({
                                            ...infoAddCustomer,
                                            typeService:e.target.value
                                       })}/></td>
                                       <td > 
                                       <input type="text" placeholder="Tổng tiền" onChange={(e)=>handleChangeInfoAddCustomer({
                                            ...infoAddCustomer,
                                            total:e.target.value
                                       })}/>
                                      </td>
                                       <td>{nowDate}</td>
                                       <td id="save"><BiSolidSave id="icon" onClick={(e)=>handlePressAddInfoAddCustomer(e)}/><MdBackspace id="icon" onClick={()=>setAddCustomer(false)}/></td>
                                  </tr>
                                  {
                                    incomeList?.length === 0 && (
                                        <tr>
                                            <td>Chưa có khách hàng nào</td>
                                         </tr>            
                                    )
                                  }
                                  {
                                    incomeList?.length > 0 && incomeList.map((item,index)=> {
                                          return (
                                            <tr key={index}>
                                                     <td>{item.nameCustomer}</td>
                                                     <td>{item.typeService}</td>
                                                     <td>{item.total}k</td>
                                                     <td>{item.date}</td>
                                                     <td><MdDelete /></td>
                                            </tr>
                                          )
                                    })
                                  }
                                
                                  
                                 </tbody>
                                 

                             </table>
                        </div>
                        
                       <ul className="list-cus">
                           <li>
                               
                                {
                                    incomeListInData?.map((item,index)=>{
                                        let total = 0;
                                        let totalDebt = 0;
                                        for(let i = 0; i < item.everyDay?.length; i++){
                                                let number = +item.everyDay[i].total 
                                                total += Math.abs(number)
                                                if(number  < 0){
                                                    totalDebt += number
                                                }        
                                        }
                                        return (
                                            <div className="abstract" key={index} onClick={()=>{
                                                handlePressDispatchNavIncomeMain({
                                                      type:"Detail"
                                                }),
                                                setDetail(item.everyDay),
                                                setIncomeIndex(item._id)
                                            }}>
                                                     <div>
                                                         <h5>Ngày</h5>
                                                         <h4>{moment(item.createdAt).format("DD/MM/YYYY")}</h4>
                                                     </div>
                                                     <div>
                                                         <h5>Tổng đơn</h5>
                                                         <h4>{item.everyDay.length}</h4>
                                                     </div>
                                                     <div>
                                                         <h5>Tổng tiền</h5>
                                                         <h4>{total} k</h4>
                                                     </div>
                                                     <div>
                                                         <h5>Tiền nợ</h5>
                                                         <h4>{totalDebt}k</h4>
                                                     </div>
                                                     <div className="updateBtn">
                                                          update
                                                     </div>
                                            </div>
                                        )
                                         
                                    })
                                }
                               
                              
                           </li>
                           <li onClick={()=>handlePressDispatchNavIncomeMain({
                                    type:"ListHis"
                                })}><FaSearch /></li>
                           
                           <li onClick={()=>handlePressDispatchNavIncomeMain({
                                type:"ListHis"
                           })}>ALL</li>
                       </ul>


              </div>
              <ul className={navIncomeMain?.ListHis ? "income-his see" : "income-his"}>
                    <li>
                                   {
                                    incomeListInData?.map((item,index)=>{
                                     
                                        let total = 0;
                                        let totalDebt = 0;
                                        for(let i = 0; i < item.everyDay.length; i++){
                                                let number = +item.everyDay[i].total 
                                                total += Math.abs(number)
                                                if(number  < 0){
                                                    totalDebt += number
                                                }        
                                        }
                                        return (
                                            <div className="income-his-item" key={index} onClick={()=>
                                                   {
                                                    handlePressDispatchNavIncomeMain({
                                                      type:"Detail"
                                                     }),
                                                     setDetail(item.everyDay),
                                                     setIncomeIndex(item._id)
                                                     }}>
                                                     <div >
                                                         <h5>Ngày</h5>
                                                         <h4>{moment(item.createdAt).format("DD/MM/YYYY")}</h4>
                                                     </div>
                                                     <div>
                                                         <h5>Tổng đơn</h5>
                                                         <h4>{item.everyDay.length}</h4>
                                                     </div>
                                                     <div>
                                                         <h5>Tổng tiền</h5>
                                                         <h4>{total} k</h4>
                                                     </div>
                                                     <div>
                                                         <h5>Tiền nợ</h5>
                                                         <h4>{totalDebt}k</h4>
                                                     </div>
                                                     <div className="updateBtn">
                                                          update
                                                     </div>
                                            </div>
                                        )
                                         
                                    })
                                }
                     
                       
                        
                    </li>
                    <li>
                          <div className="search-tool">
                               <input type="text" placeholder="typing" onChange={(e)=>handleSearchIncome(e)}/>
                          </div>
                          <div onClick={()=>handlePressDispatchNavIncomeMain({
                                    type:"Today"
                                 })}><FaTimes/></div>
                          <div>ALL</div>
                    </li>
              </ul>
              <ul className={navIncomeMain?.Detail ? "detail-cus see" : "detail-cus"} >
                   <li>
                          <table>
                             <thead>
                             <tr>
                                     <th>Tên</th>
                                     <th>Loại dịch vụ</th>
                                     <th>Tổng tiền</th>
                                     <th>Ngày tháng</th>
                                     <th>Tác vụ</th>
                              </tr>
                             </thead> 
                              <tbody>
                              {
                                detail?.length > 0 && detail.map((item,index)=> {
                
                                    return (
                                    <tr key={index}>
                                    <td>{item.nameCustomer}</td>
                                    <td>{item.typeService}</td>
                                    <td>{item.total}k</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <div onClick={()=>{
                                        setDeleteId(item.id),
                                        handleShow()
                                        }}><MdDelete/></div>
                                        <div onClick={()=> {
                                        handleFlatUpdateDetailDashboard(true),
                                        handleItemDetailNeedUpdate({
                                            item:item,
                                            _id:incomeIndex
                                        })
                                        }
                                        }><CgArrowsExchangeAlt /></div>
                                    </td>
                                    </tr>
                                    )
                                })
                              }
                             
                             
                             
                              </tbody>
                                
                          </table>
                   </li>
                   <li onClick={()=>handlePressDispatchNavIncomeMain({
                            type:"Today"
                         })}>
                       <TiArrowBack />
                    </li>
              </ul>
              <div className="update-detail" style={{display: flatUpdateDetailDashboard ? "flex" : "none"}}>
                 <div className="update-detail-container">
                 <div className="closeBtn" onClick={()=>handleFlatUpdateDetailDashboard(false)}><FaTimes/></div>
                 <div className="form">
                    <h2>Thay đổi thông tin khách hàng</h2>
                     <strong>Tên khách hàng</strong>
                     <input type="text" placeholder="nhập tên khách hàng" onChange={(e)=>handleUpdateDetailDashboard({
                          ...updateDetailDashboard,
                          nameCustomer:e.target.value
                     })} value={updateDetailDashboard?.nameCustomer}></input>
                     <strong>Loại dịch vụ</strong>
                     <input type="text" placeholder="nhập tên loại dịch vụ" onChange={(e)=>handleUpdateDetailDashboard({
                          ...updateDetailDashboard,
                           typeService:e.target.value
                     })} value={updateDetailDashboard?.typeService}></input>
                     <strong>Tổng tiền</strong>
                     <input type="text" placeholder="nhập tổng tiền" onChange={(e)=>handleUpdateDetailDashboard({
                          ...updateDetailDashboard,
                           total:e.target.value
                     })}  value={updateDetailDashboard?.total}></input>
                     <div className="updateBtn" onClick={()=>handlePressUpdateDetailDashboard()}>
                           <div><CgArrowsExchangeAlt /></div>
                           <div>update</div>
                     </div>
                </div>
                 </div>
                 
                    
              </div>
             
        </div>
     );
}
 
export default Income;
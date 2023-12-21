import { useContext,useState,useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import {MdDelete} from "react-icons/md"
import {FaTimes} from "react-icons/fa"
import moment from "moment"
const Contact = () => {
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    const [idMessage,setIdMessage] = useState(null)
     const {dataContact,deleteMessage,deleteMessageOnDatabase}  = useContext(AuthContext)
     const handleClickDelete = useCallback(()=> {
        handleClose()
        deleteMessage(idMessage)
        deleteMessageOnDatabase(idMessage)
    },[idMessage])
    return ( 
        <div className="contact-dashboard">
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
                     <table>
                           <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>email</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>message</th>
                                    <th>DateTime</th>
                                    <th>Xoá</th>
                                </tr>
                           </thead>
                           <tbody>
                               {
                                dataContact?.length === 0 && (
                                    <tr>
                                        <td>Không có tin nhắn nào</td>
                                    </tr>
                                )
                               }
                               {
                                dataContact?.length >  0 && dataContact?.map((item,index)=> {
                                    return(
                                        <tr key={index}>
                                               <td>{index + 1}</td>
                                               <td>{item.fullName}</td>
                                               <td>{item.email}</td>
                                               <td>{item.phone}</td>
                                               <td>{item.address}</td>
                                               <td>{item.message}</td>
                                               <td>{moment(item.createdAd).format("DD/MM/YYYY HH:mm:ss")}</td>
                                               <td><MdDelete  id="icon" onClick={()=> {
                                                    handleShow(),
                                                    setIdMessage(item._id)
                                               }}/></td>
                                       </tr>
                                    )
                                })
                               }
                                 
                           </tbody>
                     </table>
          
        </div>
     );
}
 
export default Contact;
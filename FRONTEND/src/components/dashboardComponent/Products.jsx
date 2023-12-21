import {FaPlus,FaSearch,FaTimes} from "react-icons/fa"
import {MdDelete } from "react-icons/md"
import {GiShoppingCart} from "react-icons/gi"
import {ImFilePicture,ImArrowLeft} from "react-icons/im"
import {IoMdCloudUpload} from "react-icons/io"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import moment from "moment"
const Products = () => {
    const {handleChangeUploadProductInfo,uploadProductInfo,handlePressUploadProduct,dataUploadProduct,handleSearchOnShop,deleteProductDashboard,ErrorUploadProduct,loadingUploadProduct} = useContext(AuthContext)
    const [deleteId,setDeleteId] = useState(null)
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    const handleClickDelete = ()=> {
        handleClose()
        deleteProductDashboard(deleteId)
    }
    const [nameImage,setNameImage] = useState({
        nameImage:""
    })
    const handleTransformFileImage = (e) => {
        const file = e.target.files[0]
        setNameImage({
            ...nameImage,
            nameImage:e.target.files[0].name
        })
        const reader = new FileReader();
        if(file){
           reader.readAsDataURL(file)
           reader.onloadend = () => {
            handleChangeUploadProductInfo({
                  ...uploadProductInfo,
                  imageProduct:reader.result
             })
           }
        }
   }
    const [isListProduct,setIsListProduct] = useState(true)
  
    return ( 
        <div className="product-dashboard">
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
               <div className="product-dashboard-container" style={{display:isListProduct ? "flex" : "none"}}>
                    <div className="product-label">
                         Tất cả sản phẩm
                    </div>
                    <div className="table">
                       <table> 
                           <thead>
                           <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Ảnh sp</th>
                                <th>Giá/sp</th>
                                <th>Số lượng</th>
                                <th>Tồn</th>
                                <th>Ngày nhập</th>
                                <th>Xoá</th>
                             </tr>
                           </thead>
                            <tbody>
                            {
                                dataUploadProduct?.length === 0 && (
                                    <tr>
                                    Không có sẵn sản phẩm
                                    </tr>
                                )
                            }
                            {
                                dataUploadProduct.map((item,index)=> {
                                      return (
                                           
                                             <tr key={index}>
                                             <td>{index + 1}</td>
                                             <td>{item.nameProduct}</td>
                                             <td>
                                                 <img src={item.imageProduct.url} alt="product"/>
                                             </td>
                                             <td>{item.price}k</td>
                                             <td>{item.count}</td>
                                             <td>0</td>
                                             <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                                             <td onClick={()=> {
                                                setDeleteId(item._id),
                                                handleShow()
                                             }}><MdDelete /></td>
                                             
                                              </tr>
                                            
                                      )  
                                  
                                      }
                                )
                             }
                        
                            
                            </tbody>
                           
                            
                        </table>
                    </div>
                    <div className="search-add">
                          <div className="search">
                                  <div>
                                        <input type="text" placeholder="Sản phẩm cần tìm" onChange={(e)=>handleSearchOnShop(e)}/>
                                        <div><FaSearch /></div>
                                  </div>
                          </div>
                          <div className="add" onClick={()=>setIsListProduct(false)}>
                                  ADD <FaPlus />
                          </div>
                    </div>
               </div>
               <div className="add-product" style={{display:isListProduct ? "none" : "flex"}}>
                     <div className="backBtn" onClick={()=>setIsListProduct(true)}>
                        <ImArrowLeft />
                     </div>
                     <div className="add-product-box">
                     <div className="preview">
                            <div className="image-pro">
                                 <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1701062416/ProductPetShop/qhybwlvnosjocdmhnguy.png" alt="product"/>
                            </div>
                            <h3>all adult dogs</h3>
                            <h6>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</h6>
                            <div className="price-pro">
                                <span>50 K</span> / 1 bịch
                            </div>
                            <div className="buyBtn">
                                Mua ngay
                            </div>
                            <ul>
                                  
                                    <li>New</li>
                                    
                                    <li><GiShoppingCart/></li>
                            </ul>
                      </div>
                     <form>
                            <h4>Thêm sản phẩm mới</h4>
                            <input type="text" placeholder="Tên sản phẩm" onChange={(e)=> handleChangeUploadProductInfo({
                                    ...uploadProductInfo,
                                    nameProduct:e.target.value
                            })} value={uploadProductInfo?.nameProduct}/>
                            <div className="">
                                <input type="text" placeholder="Giá" onChange={(e)=> handleChangeUploadProductInfo({
                                    ...uploadProductInfo,
                                    price:e.target.value
                            })} value={uploadProductInfo?.price}/>
                                <input type="text" placeholder="Số lượng" onChange={(e)=> handleChangeUploadProductInfo({
                                    ...uploadProductInfo,
                                    count:e.target.value
                            })} value={uploadProductInfo?.count}/>
                            </div>
                            <div className="">
                                <input type="text" placeholder="Sale" onChange={(e)=> handleChangeUploadProductInfo({
                                    ...uploadProductInfo,
                                    sales:e.target.value
                            })}  value={uploadProductInfo?.sales}/>
                                <input type="text" placeholder="New" onChange={(e)=> handleChangeUploadProductInfo({
                                    ...uploadProductInfo,
                                    news:e.target.value
                            })} value={uploadProductInfo?.news}/>
                            </div>
                            <input type="file" accept="/image" hidden id="product-image" onChange={(e)=> handleTransformFileImage(e)}/>
                            <label htmlFor="product-image">
                                 <div>{nameImage?.nameImage}</div>
                                 <div><ImFilePicture /></div>
                            </label>
                            <textarea placeholder="Commend" onChange={(e)=> handleChangeUploadProductInfo({
                                    ...uploadProductInfo,
                                    commend:e.target.value
                            })} value={uploadProductInfo?.commend}></textarea>
                             <div className="error" style={{display:ErrorUploadProduct !== null ? "flex" : "none"}}>{ErrorUploadProduct?.message}</div>
                            <div className="addBtn" onClick={(e)=>handlePressUploadProduct(e)}>
                                 <ul>
                                    <li><IoMdCloudUpload /></li>
                                    <li>{loadingUploadProduct ? "Uploading" : "Upload"}</li>
                                 </ul>
                                   
                            </div>
                     </form>
                     </div>
                     
               </div>
        </div>
     );
}
 
export default Products;
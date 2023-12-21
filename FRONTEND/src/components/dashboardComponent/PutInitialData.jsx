import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PutInitialData = () => {
    const {initialDataInfo,handleChangePutInitialDataInfo,handlePressPutInitialDataInfo,handleUpdateInitialInfo } = useContext(AuthContext)
    const handleTransformFileImage = (name,e) => {
         const file = e.target.files[0]
         const reader = new FileReader();
         if(file){
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                handleChangePutInitialDataInfo({
                    ...initialDataInfo,
                    [name]:reader.result
                })
            }
         }
    }

    return ( 
        <div className="put-initial-data">
            
            <div className="home-section-ini">
                   <h1>Home Info</h1>
                   <input type="text" placeholder="text home page" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       textHome:e.target.value
                   })}></input>
                    <input type="file" placeholder="insert image for home page" name="imageHome" onChange={(e)=>handleTransformFileImage(e.target.name,e)} accept="/image"></input>
                   <button onClick={(e)=>handleUpdateInitialInfo (e)}>Send</button>
            </div>
            <div className="services-section-ini">
                  <h1>Service Info</h1>
                  <input type="text" placeholder="text cut service" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       textCutService:e.target.value
                   })}></input>
                   <input type="file" placeholder="insert  cut image  for service page" name="imageCutService" onChange={(e)=>handleTransformFileImage(e.target.name,e)} accept="/image"></input>

                   <input type="text" placeholder="text surgery service" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       textSurgeryService:e.target.value
                   })}></input>
                    <input type="file" placeholder="insert  surgery image for service page" name="imageSurgeryService" onChange={(e)=>handleTransformFileImage(e.target.name,e)} accept="/image"></input>

                   <input type="text" placeholder="text food service" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       textFoodService:e.target.value
                   })}></input>
                   <input type="file" placeholder="insert  food image for service page" name="imageFoodRightService" onChange={(e)=>handleTransformFileImage(e.target.name,e)} accept="/image"></input>
                   <button onClick={(e)=>handleUpdateInitialInfo(e)}>Send</button>
            </div>
            <div className="contact-section-ini">
                    <h1>Contact Info</h1>

                    <input type="text" placeholder="insert  email" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Email:e.target.value
                   })}></input>
                   <input type="text" placeholder="insert phone number" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Phone:e.target.value
                   })}></input>
                   <input type="text" placeholder="insert link skype" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Skype:e.target.value
                   })}></input>
                   <input type="text" placeholder="insert address" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       address:e.target.value
                   })}></input>
                   <button onClick={(e)=>handleUpdateInitialInfo(e)}>Send</button>
            </div>
            <div className="footer-section-ini">
                    <h1>Social</h1>
                    <div>
                    <input type="text" placeholder="insert link facebook" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Facebook:e.target.value
                   })}></input>
                   <input type="text" placeholder="insert link zalo" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Zalo:e.target.value
                   })}></input>
                  <input type="text" placeholder="insert link instagram" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Instagram:e.target.value
                   })}></input>
                   <input type="text" placeholder="insert link linkedin" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Linkedin:e.target.value
                   })}></input>
                   <input type="text" placeholder="insert link telegram" onChange={(e)=>handleChangePutInitialDataInfo({
                       ...initialDataInfo,
                       Telegram:e.target.value
                   })}></input>
                   </div>
                   <button onClick={(e)=>handleUpdateInitialInfo(e)}>Send</button>
            </div>
         
                   
                 
                   
                   
         
        </div>
       
     );
}
 
export default PutInitialData;
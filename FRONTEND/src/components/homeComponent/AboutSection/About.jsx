import {FaComments,FaStar,FaTimes} from "react-icons/fa"
import {BsSendFill} from "react-icons/bs"
import {CiStar} from "react-icons/ci"

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import moment from 'moment'
const About = () => {

   const {handleChangeCommentInfo,commentInfo,handlePressComment,handleIsFormAbout,isFormAbout,  commentError,commentLoading, dataAbout} = useContext(AuthContext)
    return (  
        <section className="about-section">
               <div className="comment-form" style={{display:isFormAbout ? "flex" : "none"}}>
                           <div className="comment-form-container">
                               <div className="label-and-close">
                                   <FaComments  className="commas"/>
                                   <div className="closeBtn" onClick={()=>handleIsFormAbout(false)}>
                                          <FaTimes/>
                                   </div>
                               </div>
                               <div className="comment-text-area">
                                      <textarea placeholder="Bạn có feedback gì cho shop không ??" onChange={(e)=>handleChangeCommentInfo({
                                          ...commentInfo,
                                          text:e.target.value
                                      })}></textarea>
                               </div>
                               <div className="comment-rating-container">
                                     <h2>Bạn nghĩ shop bao nhiêu điểm???</h2>
                                     {
                                      commentInfo?.rating === null && (
                                        <ul className="rating-click">
                                          <li value="1" onClick={()=>handleChangeCommentInfo({
                                          ...commentInfo,
                                          rating:1
                                      })}> <CiStar/></li>
                                          <li value="2" onClick={()=>handleChangeCommentInfo({
                                          ...commentInfo,
                                          rating:2
                                      })}> <CiStar/></li>
                                          <li value="3" onClick={()=>handleChangeCommentInfo({
                                          ...commentInfo,
                                          rating:3
                                      })}> <CiStar/></li>
                                          <li value="4" onClick={()=>handleChangeCommentInfo({
                                          ...commentInfo,
                                          rating:4
                                      })}> <CiStar/></li>
                                          <li value="5" onClick={()=>handleChangeCommentInfo({
                                          ...commentInfo,
                                          rating:5
                                      })}> <CiStar/></li>
                                     </ul>
                                      )
                                     }
                                     {
                                      commentInfo?.rating !== null && (
                                         <ul className="rating-click">
                                          {
                                               [1,2,3,4,5].map((item)=> {
                                                   if(item <= commentInfo?.rating){
                                                         return (
                                                          <li value={item} onClick={()=>handleChangeCommentInfo({
                                                          ...commentInfo,
                                                          rating:item
                                                          })} key={item}> <FaStar/></li>
                                                         )
                                                   }else {
                                                       return (
                                                          <li value={item} onClick={()=>handleChangeCommentInfo({
                                                          ...commentInfo,
                                                          rating:item
                                                          })} key={item}> <CiStar/></li>
                                                         )
                                                   }
                                               })
                                                 
                                          }
                                         </ul>
                                      )

                                      
                                     }
                                     
                               </div>
                               <div className="error">{commentError?.message}</div>
                               <div className="sendBtn" onClick={()=>handlePressComment()}>
                                      <div><BsSendFill /></div>
                                      <div>{commentLoading ? "sending" : "send"}</div>
                               </div>
                           </div>
                              
                  </div>
             <div className="mark-about">
                         <div>
                             <div></div>
                             <h3>About us</h3>
                         </div>
                         <h1>ABOUT US</h1>
                         <h2> They said about <span>Us</span> <button onClick={()=>handleIsFormAbout(true)}>Comment now</button></h2>
              </div>
             <div className="list-about-container">
          
                   <div className="list-about-box" >
                          
                         {
                            dataAbout?.map((item,index)=> {
                                   return (
                                    <div className="list-about-item" key={index}>
                
                                          <FaComments  className="commas"/>
     
                                                   <div className="text-comment">
                                                     {item.text}
                                                    </div>
                                                     <div className="info">
                                                           <div className="avatar">
                                                              <img src={item.avatarComment} alt="avatar"/>
                                                          </div>
                                                           <div className="text-info-user">
                                                                   <div className="rating">
                                                                   {
                                                                       [1,2,3,4,5].map((index)=> {
                                                                         if(index <= item.rating){
                                                                              return <div key={index}><FaStar/></div>
                                                                         }else {
                                                                            return <div key={index}><CiStar/></div>
                                                                         }

                                                                         
                                                                    })
                                                                   }
                                                                    
                                                                   </div>
                                                                   <h3>{item.nameComment}</h3>
                                                                   <h4>{moment(item.createdAt).fromNow()}</h4>
                                                           </div>
                                                     </div>
                                           </div>
                                   )
                            })
                         }
                         
                         
                         
                   </div>
             </div>
             <div className="scroll">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
             </div>
        </section>
     );
}
 
export default About;
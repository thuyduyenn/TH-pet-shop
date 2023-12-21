const contactModel = require("../models/contact")
const postMessage = async(req,res)=> {
        const {fullName,email,phone,address,message} = req.body
        try {
                   if(fullName == "" || phone == ""  || message == "") return  res.status(400).json("Vui lòng điền đầy đủ thông tin bắt buộc")
                   const data = {
                    fullName,email,phone,address,message
                   }
                   Object.keys(data).forEach((key)=> {
                        if(data[key] === ""){
                               delete data[key]
                        }
                   })
                   dataContact = new contactModel({
                      ...data
                   })
                   await dataContact.save()
                   res.status(200).json(dataContact)
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
}
const getAllMessage = async(req,res)=> {
      try {
           const response = await contactModel.find()
           res.status(200).json(response)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
}
const deleteMessage = async(req,res) => {
       const {_id} = req.body
       try {
          if(!_id) return res.status(400).json("Some thing went wrong")
          await contactModel.findByIdAndDelete({_id})
       }catch(err){
          console.log(err)
          res.status(500).json(err)
       }
}
module.exports = {postMessage, getAllMessage,deleteMessage }
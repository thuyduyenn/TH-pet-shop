const initialModel = require("../models/initialDataPetShop")
const cloudinary = require("../utils/cloudinary")
const putInitialDataPetShop = async(req,res) => {
     const {imageHome,textHome,imageCutService,imageSurgeryService,imageFoodLeftService,imageFoodRightService,textCutService,textSurgeryService,textFoodService,Facebook,Zalo,Instagram,Linkedin,Telegram,Email,Phone,Skype,address} = req.body
     try {
        if(!imageHome || !textHome || !imageCutService || !imageFoodRightService || !imageSurgeryService || !imageFoodLeftService || !textCutService || !textSurgeryService || !textFoodService || !Facebook || !Email || !Phone || !address) return res.status(400).json("Please fill in all required information")
        
      const data = {
        imageHome:imageHome,
        imageCutService:imageCutService,
        imageSurgeryService:imageSurgeryService,
        imageFoodLeftService:imageFoodLeftService,
        imageFoodRightService:imageFoodRightService
      }

       
       for(const key of Object.keys(data)){
             const uploadInitialProduct = await cloudinary.uploader.upload(data[key],{
                upload_preset: "initialDataPetShop"
             })
             data[key] = uploadInitialProduct 
       }
        
       initialData = new initialModel({
             imageHome:data.imageHome,
             textHome,
             imageCutService:data.imageCutService,
             imageSurgeryService:data.imageSurgeryService,
             imageFoodLeftService:data.imageFoodLeftService,
             imageFoodRightService:data.imageFoodRightService,
             textCutService,
             textSurgeryService,
             textFoodService,
             Facebook,
             Zalo,
             Instagram:Instagram !== ""? Instagram : "",
             Linkedin:Linkedin  !== ""? Linkedin : "",
             Telegram:Telegram !== ""? Telegram : "",
             Email,
             Phone,
             Skype:Skype !== "" ? Skype : "",
             address: address 

       })
         await initialData.save();
         res.status(200).json(initialData)
     }catch(err){
          console.log(err)
          res.status(500).send(err)
     }
}
const getAll = async(req,res)=> {
      try {
          const response = await initialModel.find()
          res.status(200).json(response)
      }catch(err){
        console.log(err)
        res.status(500).send(err)
      }
}

const updateInitialInfo = async(req,res)=> {
      const {imageHome,textHome,imageCutService,imageSurgeryService,imageFoodLeftService,imageFoodRightService,textCutService,textSurgeryService,textFoodService,Facebook,Zalo,Instagram,Linkedin,Telegram,Email,Phone,Skype,address} = req.body
      try {
          const dataText = {
            textHome,
            textCutService,
            textSurgeryService,
            textFoodService,
            Facebook,
            Zalo,
            Instagram,
            Linkedin,
            Telegram,
            Email,
            Phone,
            Skype,
            address
          }
          const dataImage = {
            imageHome,
            imageCutService,
            imageSurgeryService,
            imageFoodLeftService,
            imageFoodRightService
          }
          const filter = {
              _id:"654b2c1468e129061411adc0"
          }
             await  Object.keys(dataText).forEach(key => {
             if (dataText[key] == "") {
                    delete dataText[key];
                  }  
             });
             await  Object.keys(dataImage).forEach(key => {
              if (dataImage[key] == "") {
                     delete dataImage[key];
                   }  
              });
             const oldData = await initialModel.findOne(filter)
             const imageList = {
                    imageHome:oldData.imageHome.public_id,
                    imageFoodLeftService:oldData.imageFoodLeftService.public_id,
                    imageFoodRightService:oldData.imageFoodRightService.public_id,
                    imageCutService:oldData.imageCutService.public_id,
                    imageSurgeryService:oldData.imageSurgeryService.public_id
             }
             
             let itemImageDelete = []
             await Object.keys(dataImage).forEach((key)=> {
                  for(let key1 of Object.keys(imageList)){
                       if(key1 === key){
                            itemImageDelete.push(imageList[key1])
                       }
                  }
             })
             for(let i of itemImageDelete) {
                 const uploadInitialProduct = await cloudinary.uploader.destroy(i)    
                 console.log(uploadInitialProduct) 
             }
          
            for(const key of Object.keys(dataImage)){
              const updateInitialProduct = await cloudinary.uploader.upload(dataImage[key],{
                 upload_preset: "initialDataPetShop"
              })
              dataImage[key] = updateInitialProduct
            }
             const dataUpdate = {
                  ...dataText,
                  ...dataImage
             }
            const responseUpdateText = await initialModel.findOneAndUpdate(filter,dataUpdate)
            const response = {
              imageHome:responseUpdateText.imageHome,
              textHome:responseUpdateText.textHome,
              imageCutService:responseUpdateText.imageCutService,
              imageSurgeryService:responseUpdateText.imageSurgeryService,
              imageFoodLeftService:responseUpdateText.imageFoodLeftService,
              imageFoodRightService:responseUpdateText.imageFoodRightService,
              textCutService:responseUpdateText.textCutService,
              textSurgeryService:responseUpdateText.textSurgeryService,
              textFoodService:responseUpdateText.textFoodService,
              Facebook:responseUpdateText.Facebook,
              Zalo:responseUpdateText.Zalo,
              Instagram:responseUpdateText.Instagram,
              Linkedin:responseUpdateText. Linkedin,
              Telegram:responseUpdateText.Telegram,
              Email:responseUpdateText.Email,
              Phone:responseUpdateText.Phone,
              Skype:responseUpdateText.Skype,
              address: responseUpdateText.address,
              ...dataUpdate
            }
            res.status(200).json(response)
      }catch(err){
        console.log(err)
        res.status(500).send(err)
      }
}
module.exports = {putInitialDataPetShop,getAll,updateInitialInfo}
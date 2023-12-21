
const productsModel = require("../models/products")
const cloudinary = require("../utils/cloudinary")
const uploadProduct = async(req,res)=>{
        const {imageProduct,nameProduct,price,count,sales,news,commend} = req.body
        try {
            if(!nameProduct || !price || !commend || !sales || !news || !count) return res.status(400).json("All fields are required");
            if(imageProduct){
                 const uploadProductRes = await cloudinary.uploader.upload(imageProduct, {
                    upload_preset: "ProductPetShop"
                 })
                createProduct = new productsModel({
                        imageProduct:uploadProductRes,
                        nameProduct,
                        price,
                        count,
                        sales,
                        news,
                        commend
                })
                await createProduct.save()
                res.status(200).json({
                    imageProduct:uploadProductRes,
                    nameProduct,
                    price,
                    count,
                    sales,
                    news,
                    commend,
                    idProduct:createProduct._id
                })
            }else {
                   res.status(400).json("Image is important. Please fill it")
            }
        }catch (err){
           console.log(err)
           res.status(500).send(err)
        }

        
}
const getAllProduct = async(req,res) => {
      try {
          const response = await productsModel.find()
          res.status(200).json(response)
      }catch(err){
        console.log(err)
        res.status(500).send(err)
      }
}
const deleteProduct = async(req,res) => {
   const {_id} = req.body
   try {
        await productsModel.findByIdAndDelete(_id)
   }catch(err){
       console.log(err)
       res.status(200).json(err)
   }
}
module.exports = {uploadProduct,getAllProduct,deleteProduct}
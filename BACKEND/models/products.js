const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
      imageProduct: {
          type:Object,
          required: true
      },
      nameProduct: {
          type:String,
          required:true,
          minlength:3,
          maxlength:1024
      },
      price: {
        type:String,
        required:true,
        minlength:1,
        maxlength:150
      },
      count: {
        type:String,
        required:true,
        minlength:1,
        maxlength:150
      },
      sales: {
        type:String,
        required:true,
        minlength:1,
        maxlength:150
      },
      news: {
        type:String,
        required:true,
        minlength:1,
        maxlength:150
      },
      commend: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1024
      }

}, 
{
    timestamps:true
})
const productsModel = mongoose.model("products",productsSchema)
module.exports = productsModel
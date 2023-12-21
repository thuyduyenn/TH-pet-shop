const mongoose = require("mongoose")
const ordersSchema = new mongoose.Schema({
      userId:{
          type:String,
          required:true,
      },
      nameCustomer: {
         type:String,
         required:true,
         minlength:1,
         maxlength:1024,

      },
      phoneCustomer: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1024,
        
     },
     addressCustomer: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1024,
        
     },
     commend: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1024,
        default:"no"
     },
     orders: {
        type:Array,
        required:true
     },
     status: {
      type:String,
      required:true,
      default:"Đợi"
     }

},{
    timestamps:true
})
const ordersModel = new mongoose.model("orders",ordersSchema)
module.exports = ordersModel
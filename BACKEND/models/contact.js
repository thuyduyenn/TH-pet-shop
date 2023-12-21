const mongoose  = require("mongoose")
const contactSchema = new mongoose.Schema({
     fullName: {
        type:String,
        required:true,
        minlength:2,
        maxlength:300
     },
     email: {
        type:String,
        required:false,
        minlength:2,
        maxlength:300
     },
     phone: {
        type:String,
        required:true,
        minlength:10,
        maxlength:11
     },
     address: {
        type:String,
        required:false,
        minlength:2,
        maxlength:300
     },
     message: {
        type:String,
        required:true,
        minlength:2,
        maxlength:1024
     }
},{
    timestamps:true
})
const contactModel = new mongoose.model("contact",contactSchema)
module.exports = contactModel
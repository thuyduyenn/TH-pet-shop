const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
       avatar: {
        type:Object,
        required:false
       }, 
       name:{
         type:String,
         required:true,
         minlength:3,
         maxlength:200
       },
       email: {
        type:String,
        required:true,
        minlength:3,
        maxlength:200
       },
       phone: {
        type:String,
        required:true,
        minlength:10,
        maxlength:11
       },
       password: {
        type:String,
        required:true,
        minlength:3,
        maxlength:200
       },
       isAdmin: {
        type:String,
        required:true,
        minlength:4,
        maxlength:5
       },
       valid: {
        type:String,
        required:true,
        minlength:1,
        maxlength:1024
       }


}, {
    timestamps:true
})
const userModel = new mongoose.model("user",userSchema)
module.exports = userModel

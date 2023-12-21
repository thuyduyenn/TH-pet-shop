const mongoose = require("mongoose")
const initialDataSchema = new mongoose.Schema({
       imageHome: {
          type:Object,
          required:true
       },
       textHome: {
        type:String,
        required:true,
        minlength:15,
        maxlenth:400
       },
       imageCutService: {
        type:Object,
        required:true
       },
       imageSurgeryService: {
        type:Object,
        required:true
       },
       imageFoodLeftService: {
        type:Object,
        required:true
       },
       imageFoodRightService: {
        type:Object,
        required:true
       },
       textCutService: {
        type:String,
        required:true,
        minlength:10,
        maxlenth:400
       },
       textSurgeryService: {
        type:String,
        required:true,
        minlength:10,
        maxlenth:400
       },
       textFoodService: {
        type:String,
        required:true,
        minlength:10,
        maxlenth:400
       },
       Facebook: {
        type:String,
        required:true,
        minlength:10,
        maxlenth:1024
       },
        Zalo: {
        type:String,
        required:false,
        minlength:5,
        maxlenth:1024
       },
       Instagram: {
        type:String,
        required:false,
        minlength:0,
        maxlenth:1024
       },
       
       Linkedin: {
        type:String,
        required:false,
        minlength:0,
        maxlenth:1024
       },
       Telegram: {
        type:String,
        required:false,
        minlength:0,
        maxlenth:1024
       },
       Email: {
        type:String,
        required:true,
        minlength:5,
        maxlenth:500
       },
       Phone: {
        type:String,
        required:true,
        minlength:10,
        maxlenth:15
       },
       Skype: {
        type:String,
        required:false,
        minlength:0,
        maxlenth:400
       },
       address: {
        type:String,
        required:true,
        minlength:5,
        maxlenth:1024
       }
},
{
  timestamps:true  
})
const initialModel = new mongoose.model("initialDataProduct",initialDataSchema)
module.exports = initialModel
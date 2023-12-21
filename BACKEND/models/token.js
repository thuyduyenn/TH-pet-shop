const mongoose = require("mongoose")
const tokenSchema = new mongoose.Schema({
        idUser: {
            type:String,
            required:true,
            minlength:5,
            maxlength:1024
        },
        token: {
            type:String,
            required:true,
            minlength:5,
            maxlength:1024
        },
        refreshToken: {
            type:String,
            required:true,
            minlength:5,
            maxlength:1024
        }
}, {
      timestamps:true
})
const tokenModel = new mongoose.model("token",tokenSchema)
module.exports = tokenModel
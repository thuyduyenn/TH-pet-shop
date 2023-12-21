const mongoose = require("mongoose")
const aboutCommentSchema = new mongoose.Schema({
      idUser: {
           type:String,
           required:true,
           minlength:1,
           maxlength:1024
      },
      text: {
           type:String,
           required:true,
           minlength:1,
           maxlength:1024
      },
     rating: {
          type:Number,
          required:true,
          minlength:0,
          maxlength:1
     },
})
const aboutCommentModel =new mongoose.model("rating",aboutCommentSchema)
module.exports = aboutCommentModel
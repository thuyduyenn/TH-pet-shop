const mongoose = require("mongoose")
const incomeSchema = new mongoose.Schema({
     everyDay: {
        type:Array,
        required:true
     }
},
{
    timestamps:true
})
const incomeModel = new mongoose.model("income",incomeSchema)
module.exports = incomeModel
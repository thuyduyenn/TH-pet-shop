const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const app = express();
const productRoute = require("./routes/productRouter")
const initialRoute = require("./routes/initialRouter")
const aboutRoute = require("./routes/aboutRoute")
const userRoute = require("./routes/userRoute")
const ordersRoute = require("./routes/ordersRoute")
const incomeRoute = require("./routes/incomeRoute")
const contactRouter = require("./routes/contactRouter")
const mailRoute = require("./routes/mailRoute")
require("dotenv").config();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors());


app.get("/",(req,res)=> {
      res.send("Api of pet shop connected in port 5400")

})
app.use("/upload",productRoute)
app.use("/initial",initialRoute)
app.use("/about",aboutRoute)
app.use("/user",userRoute)
app.use("/orders",ordersRoute)
app.use("/income",incomeRoute)
app.use("/contact",contactRouter)
app.use("/mail",mailRoute)
const port = process.env.PORT || 5400
const uri = process.env.DB_URL
app.listen(port,console.log(`Server running on port ${port}`))
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Kết nối thành công")).catch((err)=> console.log("Lỗi",err))
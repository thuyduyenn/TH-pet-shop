const ordersModel = require("../models/orders")
const orderProduct = async(req,res)=> {
    const {userId,nameCustomer,phoneCustomer,addressCustomer,commend,orders} = req.body
    try {
         if(!userId || !nameCustomer || !phoneCustomer || !addressCustomer || !orders) return res.status(400).json("Cần có đủ dữ liệu")
         data = new ordersModel({
             userId,
             nameCustomer,
             phoneCustomer,
             addressCustomer,
             commend,
             orders,
         })
         await data.save()
         res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
const getAllProduct = async(req,res)=> {
        try {
              const response = await ordersModel.find()
              res.status(200).json(response)
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
}
const orderUpdateStatus = async(req,res)=> {
    const {data,_id} = req.body
     try {
          const filter = {_id}
          const update = {
            status:data
          }
          await ordersModel.findOneAndUpdate(filter,update)

     }catch(err){
        console.log(err)
        res.status(500).json(err)
     }
}
module.exports = {orderProduct,getAllProduct,orderUpdateStatus}
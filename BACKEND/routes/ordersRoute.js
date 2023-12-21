const express = require("express")
const router = express.Router()
const {orderProduct,getAllProduct,orderUpdateStatus} = require("../controllers/ordersController")
router.post("/",orderProduct)
router.get("/get-all-orders",getAllProduct)
router.post("/update",orderUpdateStatus)
module.exports = router
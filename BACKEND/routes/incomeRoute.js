const express = require("express")
router = express.Router()
const {uploadIncome,getAllIncome,updateDetail,updateDetailAfter} = require("../controllers/incomeController")
router.post("/",uploadIncome)
router.get("/get-all-income",getAllIncome)
router.post("/update",updateDetail)
router.post("/update-detail-after",updateDetailAfter)
module.exports = router

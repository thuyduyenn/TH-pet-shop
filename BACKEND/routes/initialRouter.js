const express = require("express");
const router = express.Router()
const {putInitialDataPetShop,getAll,updateInitialInfo} = require("../controllers/putInitialDataController")
router.post("/put-initial-data",putInitialDataPetShop)
router.post("/update",updateInitialInfo)
router.get("/get-all",getAll)
module.exports = router
const express = require("express")
router = express.Router()
const {putDataAbout,getDataAbout} = require("../controllers/aboutController")
router.post("/put-data-about",putDataAbout)
router.get("/get-all-data-about",getDataAbout)
module.exports = router
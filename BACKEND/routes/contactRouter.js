const express = require("express")
router = express.Router()
const {postMessage, getAllMessage,deleteMessage} = require("../controllers/contactController")
router.post("/",postMessage)
router.post("/delete",deleteMessage)
router.get("/get-all-message",getAllMessage)
module.exports = router
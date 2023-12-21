const express = require("express");
const router = express.Router();
const  { uploadProduct,getAllProduct,deleteProduct } = require("../controllers/productController")
router.post("/uploadProduct",uploadProduct)
router.get("/get-all",getAllProduct)
router.post("/delete",deleteProduct)
module.exports = router
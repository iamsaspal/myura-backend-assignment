const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");

router.get("/",productController.getProducts);
router.post("/",productController.addProduct);
router.put("/:id/stock",productController.updateStock);

module.exports = router;
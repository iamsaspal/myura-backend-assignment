const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const productController = require("../controllers/productControllers");


router.post(
"/",[
body("product_name").notEmpty().withMessage("Product name required"),
body("price").isNumeric().withMessage("Price must be number"),
body("category").notEmpty(),
body("stock").isInt()
],
productController.addProduct
);


router.put(
"/:id/stock",[
body("stock").isInt().withMessage("Stock must be integer")
],
productController.updateStock
);

router.get("/",productController.getProducts);

router.post("/update-stock",productController.updateStockFromUI);

router.delete("/:id", productController.deleteProduct);



module.exports = router;
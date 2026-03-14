const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const auth = require("../middleware/auth")

const productController = require("../controllers/productControllers");


router.post(
"/",[
body("product_name").notEmpty().withMessage("Product name required"),
body("price").isNumeric().withMessage("Price must be number"),
body("category").notEmpty(),
body("stock").isInt()
], auth,
productController.addProduct
);


router.put(
"/:id/stock",[
body("stock").isInt().withMessage("Stock must be integer")
], auth,
productController.updateStock
);

router.get("/",productController.getProducts);

router.put("/update-stock",auth, productController.updateStockFromUI);

router.delete("/:id", auth, productController.deleteProduct);
router.put("/:id",auth, productController.updateProduct);
// router.post("/:id", productController.updateProduct);



module.exports = router;
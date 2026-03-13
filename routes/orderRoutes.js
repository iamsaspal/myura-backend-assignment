const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post(
"/",
[
body("customer_name").notEmpty(),
body("customer_email").isEmail()
],
orderController.placeOrder
);


router.get("/",orderController.getOrders);



module.exports = router;                        
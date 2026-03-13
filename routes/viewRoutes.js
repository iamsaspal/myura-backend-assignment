const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    res.render("index")
});

router.get("/add-product",(req,res)=>{
    res.render("addProduct")
});

router.get("/order",(req,res)=>{
    res.render("order")
});

router.get("/update-stock", async (req,res)=>{

const products = await product.findAll()

res.render("updateStock",{products})

});

module.exports = router;
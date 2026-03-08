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

module.exports = router;
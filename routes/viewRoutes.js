const express = require("express");
const router = express.Router();

const db = require("../models"); 
const Product = db.Product;

router.get("/", (req,res)=>{
    res.render("index");
});

router.get("/add-product",(req,res)=>{
    res.render("addProduct");
});

router.get("/order",(req,res)=>{
    res.render("order");
});

router.get("/update-stock", async (req,res)=>{

try{

const products = await Product.findAll();

res.render("updateStock",{products});

}catch(err){

console.log(err);
res.send("Error loading products");

}

});


router.get("/edit-product/:id", async(req,res)=>{

const id = req.params.id

const product = await Product.findByPk(id)

res.render("editProduct",{product})

});

module.exports = router;
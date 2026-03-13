const { Order, OrderItem, Product } = require("../models")

exports.placeOrder = async (req,res)=>{

try{

const {customer_name, customer_email, product_id, quantity} = req.body

// VALIDATION

if(!customer_name || !customer_email){
return res.send("Customer details required")
}

if(!product_id){
return res.send("Please select product")
}

if(!quantity || quantity <= 0){
return res.send("Quantity must be greater than 0")
}

// PRODUCT CHECK

const product = await Product.findByPk(product_id)

if(!product){
return res.send("Product not found")
}

// STOCK CHECK

if(product.stock < quantity){
return res.send("Insufficient stock")
}

// CREATE ORDER

const order = await Order.create({
customer_name,
customer_email
})

// CREATE ORDER ITEM

await OrderItem.create({
order_id: order.id,
product_id,
quantity
})

// REDUCE STOCK

product.stock = product.stock - quantity
await product.save()

res.redirect("/")

}catch(err){

console.log(err)

res.send("Order failed")

}

};


exports.getOrders = async (req,res)=>{

try{

const orders = await Order.findAll({

include:[

{

model: OrderItem,

include:[

{

model: Product,

attributes:["product_name"]

}

]

}

],

order:[["createdAt","DESC"]]

})

res.json(orders)

}catch(err){

res.status(500).json({message:"Server error"})

}

};
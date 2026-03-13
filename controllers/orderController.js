const { Order, OrderItem, Product } = require("../models")

exports.placeOrder = async (req,res)=>{

try{

const {customer_name,customer_email,items} = req.body

// STEP 1: STOCK CHECK

for(const item of items){

const product = await Product.findByPk(item.product_id)

if(!product){
return res.status(404).json({message:"Product not found"})
}

if(product.stock < item.quantity){
return res.status(400).json({
message:`Insufficient stock for ${product.product_name}`
})
}

}

// STEP 2: CREATE ORDER

const order = await Order.create({
customer_name,
customer_email
})

// STEP 3: REDUCE STOCK

for(const item of items){

const product = await Product.findByPk(item.product_id)

product.stock = product.stock - item.quantity

await product.save()

await OrderItem.create({
order_id: order.id,
product_id: item.product_id,
quantity: item.quantity
})

}

res.json({message:"Order placed successfully"})

}catch(err){

console.log(err)

res.status(500).json({message:"Order failed"})

}

};


exports.getOrders = async(req,res)=>{

try{

const orders = await Order.findAll({

order:[["createdAt","DESC"]]

})

res.json(orders)

}catch(err){

res.status(500).json({message:"Server error"})

}

};
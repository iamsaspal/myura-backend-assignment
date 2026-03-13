const { Order, OrderItem, Product } = require("../models")

exports.placeOrder = async (req,res)=>{

try{

const {customer_name,customer_email,items} = req.body

// stock check first

for(const item of items){

const product = await Product.findByPk(item.product_id)

if(!product){
return res.status(404).json({message:"Product not found"})
}

if(product.stock < item.quantity){
return res.status(400).json({
message: `Insufficient stock for ${product.product_name}`
})
}

}

// create order

const order = await Order.create({
customer_name,
customer_email
})

// reduce stock + create order items

for(const item of items){

const product = await Product.findByPk(item.product_id)

product.stock -= item.quantity

await product.save()

await OrderItem.create({
order_id: order.id,
product_id: item.product_id,
quantity: item.quantity
})

}

res.json({
message:"Order placed successfully"
})

}catch(err){

res.status(500).json({message:"Order failed"})

}

};
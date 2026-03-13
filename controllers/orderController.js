const { validationResult } = require("express-validator");
const { Order, OrderItem, Product, sequelize } = require("../models");

exports.placeOrder = async (req, res) => {

const t = await sequelize.transaction()

try {
const errors = validationResult(req)

if(!errors.isEmpty()){
return res.status(400).json({errors: errors.array()})
}

const { customer_name, customer_email, items } = req.body

const order = await Order.create({

customer_name,
customer_email

},{ transaction:t })


for (const item of items) {

const product = await Product.findByPk(item.product_id,{transaction:t})

if(!product || product.stock < item.quantity){

await t.rollback()

return res.status(400).json({
message:"Insufficient stock"
})

}

product.stock -= item.quantity

await product.save({transaction:t})

await OrderItem.create({

order_id:order.id,
product_id:item.product_id,
quantity:item.quantity

},{transaction:t})

}

await t.commit()

res.json({
message:"Order placed successfully"
})

} catch (err) {

await t.rollback()

res.status(500).json({
message:"Order failed"
})

}

};
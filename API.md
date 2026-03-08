# Product APIs

GET /api/products
Returns list of products.

POST /api/products
Create product.

Body:
{
 "product_name": "Protein",
 "price": 1200,
 "category": "Supplements",
 "stock": 10
}

PUT /api/products/:id/stock
Update stock.

Body:
{
 "stock": 50
}

# Order API

POST /api/orders

Body:

{
 "customer_name": "Rahul",
 "customer_email": "rahul@email.com",
 "items": [
   {
     "product_id": 1,
     "quantity": 2
   }
 ]
}
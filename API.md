# API Documentation

Base URL

http://localhost:3000/api

---

# Authentication API

## Login

POST /api/auth/login

Body

{
 "email": "admin@myura.com",
 "password": "admin123"
}

Response

{
 "token": "jwt_token_here"
}

This token must be sent in headers for protected APIs.

Example:

Authorization: <token>

---

# Product APIs

## Get All Products

GET /api/products

Returns list of all products.

Response

[
 {
  "id":1,
  "product_name":"Protein",
  "price":1200,
  "category":"Supplements",
  "stock":10
 }
]

---

## Add Product

POST /api/products

Body

{
 "product_name": "Protein",
 "price": 1200,
 "category": "Supplements",
 "stock": 10
}

---

## Update Product

PUT /api/products/:id

Body

{
 "product_name": "Whey Protein",
 "price": 1500,
 "category": "Supplements"
}

---

## Update Stock

PUT /api/products/:id/stock

Body

{
 "stock": 50
}

---

## Delete Product

DELETE /api/products/:id

Deletes product from database.

---

# Order APIs

## Place Order

POST /api/orders

Body

{
 "customer_name": "Rahul",
 "customer_email": "rahul@email.com",
 "product_id": 1,
 "quantity": 2
}

Behavior

- If stock available → order created
- If stock insufficient → request rejected

---

## Get Order History

GET /api/orders?page=1

Supports pagination.

Example Response

{
 "totalOrders": 50,
 "totalPages": 5,
 "currentPage": 1,
 "orders": []
}


# Myura Wellness Backend Assignment

This project implements a simple e-commerce backend using Node.js, Express, Sequelize, and MySQL.

## Features

- Product Management API
- Order Management API
- Stock validation
- Simple UI using EJS
- SQL database using MySQL

## Technologies

Node.js  
Express  
Sequelize ORM  
MySQL  
EJS  

## Setup

Install dependencies

npm install

Run server

nodemon app.js

## API Endpoints

GET /api/products  
POST /api/products  
PUT /api/products/:id/stock  
POST /api/orders

## Database

Tables:

products  
orders  
orderitems

## UI Pages

/ → product list  
/add-product → add product  
/order → place order
// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const supplierRoutes = require('./routes/supplierRoutes');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });


app.use('/api/suppliers', supplierRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



/*
npm install express mongoose axios dotenv
npm install --save-dev nodemon
nodemon index   (for automatic run code)
----------------
POST--- http://localhost:5000/api/suppliers

{
  "supplierId": "S001",
  "name": "Acme Corp",
  "email": "acme@example.com"
}
  ----response---
{
    "supplier": {
        "supplierId": "S001",
        "name": "Acme Corp",
        "email": "acme@example.com",
        "status": "active",
        "_id": "680700cd4f2be5f607461321",
        "__v": 0
    },
    "zoho": {
        "contact_name": "Acme Corp",
        "email": "acme@example.com",
        "id": 101
    }
}
==================================
GET--http://localhost:5000/api/suppliers
PUT---http://localhost:5000/api/suppliers/S001
{ "status": "inactive" }
DELETE---http://localhost:5000/api/suppliers/S001
===================================

Explanations
Circuit Breaker: The CircuitBreaker class (in circuitBreaker.js) tracks failures (max 3) and opens the circuit for 5 seconds after reaching the limit, preventing further calls. It’s used in createSupplier to protect mock Zoho API calls, mirroring PROCURE.QA’s integrations.
Supplier Model: The Mongoose schema (Supplier.js) defines supplierId, name, email, and status, aligning with PROCURE.QA’s supplier management.
Controllers: supplierController.js handles CRUD operations with error handling, using async/await for MongoDB and Axios for external calls, reflecting HMWSSB’s API work.
Routes: supplierRoutes.js organizes RESTful endpoints, keeping the code modular.
Index: index.js sets up Express, connects to MongoDB, and starts the server, ensuring a clean entry point.
====================================GIT=================

1] git init
2] git add .
3] git commit -m "Initial commit - Supplier Management API
4] create new repo 
5] git remote add origin https://github.com/krishnashukla1/supplier-api.git
6] git branch -M main
7] git push -u origin main
8] 
*/
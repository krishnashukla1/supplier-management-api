
#Supplier Management API with Circuit Breaker

A robust Node.js REST API for managing supplier data, integrated with MongoDB and protected by a custom 
circuit breaker for external API calls. Built with Express.js, Mongoose, and Axios, this project demonstrates 
scalable backend development, error handling, and resilience patterns, inspired by real-world procurement systems.

# Table of Contents

Project Overview
Features
Tech Stack
Installation
Configuration
Running the Project
API Endpoints
Testing


# Circuit Breaker Details
Contributing
License
Contact

# Project Overview

This project is a supplier management API designed to handle CRUD operations for supplier data, with a circuit
breaker to ensure resilience when integrating with external services (e.g., a mock Zoho Books API). It 
reflects my experience building procurement platforms like PROCURE.QA, where I developed supplier CRUD APIs 
and integrated third-party services, and HMWSSB, where I created robust Node.js APIs.

The circuit breaker prevents cascading failures by limiting repeated calls to a failing external API, making 
the system reliable under unstable conditions. This project showcases my skills in Node.js, MongoDB, and advanced
JavaScript patterns, addressing common interview topics like async programming and error handling.


#Features

CRUD Operations: Create, read, update, and delete supplier records in MongoDB.
Circuit Breaker: Protects external API calls, opening after 3 failures and resetting after 5 seconds.
Error Handling: Comprehensive error responses for robust API interactions.
MongoDB Integration: Stores supplier data with a clear schema using Mongoose.
Modular Design: Organized into controllers, models, and routes for scalability.

#Tech Stack

Node.js: Backend runtime environment.
Express.js: Web framework for API routing.
MongoDB: NoSQL database for supplier data storage.
Mongoose: ODM for MongoDB schema management.
Axios: HTTP client for external API calls.
Dotenv: Environment variable management.
Nodemon: Development tool for auto-restarting the server.

# Installation

Clone the Repository:

git clone https://github.com/krishnashuklal/supplier-api.git
cd supplier-api


# Install Dependencies:

npm install
Install MongoDB:
Local: Install and run MongoDB (mongod) on mongodb://localhost:27017.
Atlas: Create a MongoDB Atlas account and obtain a connection URI.

# Configuration

Create a .env file in the project root with the following variables:

MONGODB_URI=mongodb://localhost:27017/supplier_db
PORT=5000
ZOHO_API_URL=https://jsonplaceholder.typicode.com/posts
ZOHO_ACCESS_TOKEN=mock_token


where,
MONGODB_URI: Your MongoDB connection string (local or Atlas).
ZOHO_API_URL: A mock API for testing (replace with a real service URL if available).
ZOHO_ACCESS_TOKEN: A dummy token for mock API calls.

# Running the Project

Development Mode (with auto-restart): nodemon index.js
Production Mode:  npm start


# The API will be available at http://localhost:5000.

# API Endpoints
All endpoints are prefixed with /api/suppliers.

Method   Endpoint          Description                      Request Body/Example

POST      /               Create a new                     { "supplierId": "S001", "name": "Acme Corp", "email": "acme@example.com" }
                          supplier    

GET      /                Retrieve all suppliers            None

PUT     /:supplierId      Update a supplier by ID          { "status": "inactive" }

DELETE   /:supplierId      Delete a supplier by ID          None

# Example Response (POST):

{
  "supplier": {
    "_id": "12345",
    "supplierId": "S001",
    "name": "Acme Corp",
    "email": "acme@example.com",
    "status": "active"
  },
  "zoho": { "id": 1, "title": "Krishna Shukla response" }
}

# Testing

Use Postman to test the API:

1] Create Supplier:

POST--- http://localhost:5000/api/suppliers \
-H "Content-Type: application/json" \
-d '{"supplierId":"S001","name":"Acme Corp","email":"acme@example.com"}'

2] Get Suppliers:

GET---  http://localhost:5000/api/suppliers



# Simulate Circuit Breaker:

Use an invalid ZOHO_API_URL to trigger failures. After 3 failures, the circuit opens, returning 
{ "error": "Circuit is open, please try again later" }.

# Circuit Breaker Details

The circuit breaker (src/circuitBreaker.js) enhances API resilience:
Max Failures: 3 failed external API calls trigger the circuit to open.
Reset Timeout: After 5 seconds, the circuit resets, allowing new calls.


# Use Case: Protects calls to the mock Zoho API during supplier creation, preventing cascading failures
if the external service is down.

This pattern mirrors my work in PROCURE.QA, where I integrated third-party APIs with robust error handling.

# Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a pull request.

# License

This project is licensed under the Krishna Shukla.

# Contact
Name: Krishna Shukla
Email: krishnaprasad24795@gmail.com
LinkedIn: https://www.linkedin.com/in/krishna-shukla-2a634619a/
GitHub: https://github.com/krishnashukla1

Feel free to reach out for questions or collaboration!

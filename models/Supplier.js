// src/models/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Supplier', supplierSchema);


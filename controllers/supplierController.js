// src/controllers/supplierController.js
const Supplier = require('../models/Supplier');
const axios = require('axios');
const CircuitBreaker = require('../circuitBreaker');

const breaker = new CircuitBreaker(3, 5000); // 3 failures, 5s reset

// Create supplier and sync with mock Zoho API
exports.createSupplier = async (req, res) => {
    try {
      const { supplierId, name, email } = req.body;
      const supplier = new Supplier({ supplierId, name, email });
      await supplier.save();
  
      // Sync with mock Zoho API using circuit breaker
      const zohoSync = async () => {
        return await axios.post(
          process.env.ZOHO_API_URL,
          { contact_name: name, email },
          { headers: { Authorization: `Bearer ${process.env.ZOHO_ACCESS_TOKEN}` } }
        );
      };
  
      const zohoResult = await breaker.execute(zohoSync);
      res.status(201).json({ supplier, zoho: zohoResult.data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all suppliers
  exports.getSuppliers = async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update supplier
  exports.updateSupplier = async (req, res) => {
    try {
      const { supplierId } = req.params;
      const supplier = await Supplier.findOneAndUpdate(
        { supplierId },
        req.body,
        { new: true }
      );
      if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete supplier
  exports.deleteSupplier = async (req, res) => {
    try {
      const { supplierId } = req.params;
      const supplier = await Supplier.findOneAndDelete({ supplierId });
      if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
      res.json({ message: 'Supplier deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
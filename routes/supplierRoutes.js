// src/routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getSuppliers);
router.put('/:supplierId', supplierController.updateSupplier);
router.delete('/:supplierId', supplierController.deleteSupplier);

module.exports = router;
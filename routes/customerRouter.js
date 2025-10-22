const express = require("express");
const router = express.Router();
const {getAllCustomers,addCustomer, getCustomerById, updateCustomer, deleteCustomer} = require('../controllers/customerController')


// GET -> /api/customer
router.get('/', getAllCustomers);
// POST -> /api/customer
router.post('/', addCustomer);
// GET -> /api/customer/:id
router.get('/:id',  getCustomerById);
// PUT(update) -> /api/customer/:id
router.put('/:id',  updateCustomer);
// DELETE -> /api/customer/:id
router.delete('/:id', deleteCustomer);

module.exports = router;
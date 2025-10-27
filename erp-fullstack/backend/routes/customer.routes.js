const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customer.controller');
const auth = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { createCustomer, updateCustomer } = require('../validators/customer.validator');

// all protected
router.use(auth);

router.post('/', validate(createCustomer), customerCtrl.createCustomer);
router.get('/', customerCtrl.getCustomers);
router.get('/:id', customerCtrl.getCustomer);
router.put('/:id', validate(updateCustomer), customerCtrl.updateCustomer);
router.delete('/:id', customerCtrl.deleteCustomer);

module.exports = router;

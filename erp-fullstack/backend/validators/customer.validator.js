const Joi = require('joi');

const address = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().required()
});

const createCustomer = Joi.object({
  customerName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  businessType: Joi.string().valid('Retailer','Wholesaler','Distributor').required(),
  creditLimit: Joi.number().optional(),
  address: address.required(),
  gstNumber: Joi.string().optional(),
  status: Joi.string().valid('Active','Inactive').optional()
});

const updateCustomer = createCustomer; // same validation

module.exports = { createCustomer, updateCustomer };

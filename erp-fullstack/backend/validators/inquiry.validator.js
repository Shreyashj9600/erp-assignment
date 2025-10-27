const Joi = require('joi').extend(require('@joi/date'));

const lineItem = Joi.object({
  productName: Joi.string().required(),
  description: Joi.string().allow('', null),
  quantity: Joi.number().positive().required(),
  unit: Joi.string().valid('Pcs','Kg','Ltr','Mtr').required(),
  expectedUnitPrice: Joi.number().optional()
});

const createInquiry = Joi.object({
  customer: Joi.string().required(), // customer id
  inquiryDate: Joi.date().required(),
  expectedDeliveryDate: Joi.date().greater('now').required(),
  status: Joi.string().valid('Draft','Submitted','Quoted','Won','Lost').optional(),
  priority: Joi.string().valid('Low','Medium','High').optional(),
  remarks: Joi.string().allow('', null),
  lineItems: Joi.array().min(1).items(lineItem).required()
});

const updateInquiry = createInquiry; // same rules for simplicity

module.exports = { createInquiry, updateInquiry };

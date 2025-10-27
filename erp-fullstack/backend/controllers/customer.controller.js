const Customer = require('../models/Customer');
const { generateCustomerCode } = require('../utils/codeGenerator');
const createError = require('http-errors');

exports.createCustomer = async (req, res, next) => {
  try {
    // auto-generate code
    const code = await generateCustomerCode();
    const payload = { ...req.body, customerCode: code };
    const customer = new Customer(payload);
    await customer.save();
    res.status(201).json({ success: true, data: customer });
  } catch (err) { next(err); }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const { page=1, limit=10, search, businessType, status } = req.query;
    const q = { isDeleted: false };
    if (search) q.$or = [
      { customerName: new RegExp(search, 'i') },
      { customerCode: new RegExp(search, 'i') }
    ];
    if (businessType) q.businessType = businessType;
    if (status) q.status = status;
    const skip = (parseInt(page)-1) * parseInt(limit);
    const [data, total] = await Promise.all([
      Customer.find(q).sort({createdAt:-1}).skip(skip).limit(parseInt(limit)),
      Customer.countDocuments(q)
    ]);
    res.json({ success:true, data, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) { next(err); }
};

exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, isDeleted:false });
    if (!customer) throw createError(404, 'Customer not found');
    res.json({ success:true, data: customer });
  } catch (err) { next(err); }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const cust = await Customer.findById(req.params.id);
    if (!cust || cust.isDeleted) throw createError(404, 'Customer not found');
    Object.assign(cust, req.body);
    cust.modifiedAt = new Date();
    await cust.save();
    res.json({ success:true, data: cust });
  } catch (err) { next(err); }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const cust = await Customer.findById(req.params.id);
    if (!cust || cust.isDeleted) throw createError(404, 'Customer not found');
    cust.isDeleted = true;
    cust.deletedAt = new Date();
    await cust.save();
    res.json({ success:true, message:'Customer soft-deleted' });
  } catch (err) { next(err); }
};

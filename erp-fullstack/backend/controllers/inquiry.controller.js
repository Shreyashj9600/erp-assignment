const Inquiry = require('../models/Inquiry');
const Customer = require('../models/Customer');
const { generateInquiryNumber } = require('../utils/codeGenerator');
const createError = require('http-errors');

const allowedStatusFlow = {
  Draft: ['Submitted'],
  Submitted: ['Quoted'],
  Quoted: ['Won', 'Lost'],
  Won: [],
  Lost: []
};

exports.createInquiry = async (req, res, next) => {
  try {
    // check customer active
    const customer = await Customer.findOne({ _id: req.body.customer, isDeleted:false });
    if (!customer) throw createError(400, 'Customer not found');
    if (customer.status !== 'Active') throw createError(400, 'Inquiry can only be created for Active customers');

    // expected delivery date check done in validator but double-check
    if (new Date(req.body.expectedDeliveryDate) <= new Date()) throw createError(400, 'Expected delivery date must be future date');

    const number = await generateInquiryNumber();
    const inquiry = new Inquiry({
      ...req.body,
      inquiryNumber: number,
      createdBy: req.user.username || req.user.name || req.user._id
    });
    await inquiry.save();
    res.status(201).json({ success:true, data: inquiry });
  } catch (err) { next(err); }
};

exports.getInquiries = async (req, res, next) => {
  try {
    const { page=1, limit=10, customer, status, startDate, endDate } = req.query;
    const q = { isDeleted:false };
    if (customer) q.customer = customer;
    if (status) q.status = status;
    if (startDate || endDate) {
      q.inquiryDate = {};
      if (startDate) q.inquiryDate.$gte = new Date(startDate);
      if (endDate) q.inquiryDate.$lte = new Date(endDate);
    }
    const skip = (parseInt(page)-1) * parseInt(limit);
    const [data, total] = await Promise.all([
      Inquiry.find(q).populate('customer').sort({createdAt:-1}).skip(skip).limit(parseInt(limit)),
      Inquiry.countDocuments(q)
    ]);
    res.json({ success:true, data, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) { next(err); }
};

exports.getInquiry = async (req, res, next) => {
  try {
    const entry = await Inquiry.findOne({ _id: req.params.id, isDeleted:false }).populate('customer');
    if (!entry) throw createError(404, 'Inquiry not found');
    res.json({ success:true, data: entry });
  } catch (err) { next(err); }
};

exports.updateInquiry = async (req, res, next) => {
  try {
    const entry = await Inquiry.findById(req.params.id);
    if (!entry || entry.isDeleted) throw createError(404, 'Inquiry not found');

    // status change validation: only allowed transitions
    if (req.body.status && req.body.status !== entry.status) {
      const allowed = allowedStatusFlow[entry.status] || [];
      if (!allowed.includes(req.body.status)) {
        throw createError(400, `Invalid status change from ${entry.status} to ${req.body.status}`);
      }
    }

    // if status is Won or Lost, do not allow delete later; updates allowed but be cautious
    Object.assign(entry, req.body);
    entry.modifiedBy = req.user.username || req.user.name || req.user._id;
    await entry.save();
    res.json({ success:true, data: entry });
  } catch (err) { next(err); }
};

exports.deleteInquiry = async (req, res, next) => {
  try {
    const entry = await Inquiry.findById(req.params.id);
    if (!entry || entry.isDeleted) throw createError(404, 'Inquiry not found');
    if (['Won','Lost'].includes(entry.status)) throw createError(400, 'Cannot delete inquiry with status Won or Lost');
    entry.isDeleted = true;
    await entry.save();
    res.json({ success:true, message:'Inquiry soft-deleted' });
  } catch (err) { next(err); }
};

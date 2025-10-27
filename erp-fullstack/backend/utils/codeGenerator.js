// generates CUST-YYYY-0001 and INQ-YYYY-MM-0001 using Counter collection
const Counter = require('../models/Counter');

async function nextSequence(key, opts = {}) {
  // opts may have year and month
  const query = { key };
  if (opts.year) query.year = opts.year;
  if (opts.month !== undefined) query.month = opts.month;

  const update = { $inc: { seq: 1 } };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const counter = await Counter.findOneAndUpdate(query, update, options);
  return counter.seq;
}

async function generateCustomerCode() {
  const year = new Date().getFullYear();
  const seq = await nextSequence('customer-' + year, { year });
  return `CUST-${year}-${String(seq).padStart(4,'0')}`;
}

async function generateInquiryNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2,'0');
  const seq = await nextSequence(`inquiry-${year}-${month}`, { year, month });
  return `INQ-${year}-${month}-${String(seq).padStart(4,'0')}`;
}

module.exports = { generateCustomerCode, generateInquiryNumber };

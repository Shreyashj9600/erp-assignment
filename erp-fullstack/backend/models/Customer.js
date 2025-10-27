const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  pincode: String
}, {_id: false});

const customerSchema = new mongoose.Schema({
  customerCode: { type: String, unique: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  businessType: { type: String, enum: ['Retailer','Wholesaler','Distributor'], required: true },
  creditLimit: { type: Number, default: 50000 },
  address: addressSchema,
  gstNumber: String,
  status: { type: String, enum: ['Active','Inactive'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
});

customerSchema.pre('save', function(next){
  this.modifiedAt = new Date();
  next();
});

module.exports = mongoose.model('Customer', customerSchema);

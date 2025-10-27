const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: String,
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ['Pcs','Kg','Ltr','Mtr'], required: true },
  expectedUnitPrice: Number
}, {_id: false});

const inquirySchema = new mongoose.Schema({
  inquiryNumber: { type: String, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  inquiryDate: { type: Date, required: true },
  expectedDeliveryDate: { type: Date, required: true },
  status: { type: String, enum: ['Draft','Submitted','Quoted','Won','Lost'], default: 'Draft' },
  priority: { type: String, enum: ['Low','Medium','High'], default: 'Medium' },
  totalItemsCount: { type: Number, default: 0 },
  remarks: String,
  lineItems: [lineItemSchema],
  createdBy: String,
  modifiedBy: String,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
});

inquirySchema.pre('save', function(next){
  this.modifiedAt = new Date();
  this.totalItemsCount = (this.lineItems || []).reduce((acc, li)=> acc + (li.quantity || 0), 0);
  next();
});

module.exports = mongoose.model('Inquiry', inquirySchema);

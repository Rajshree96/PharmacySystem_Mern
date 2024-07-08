// models/ManufacturerLedger.js

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ManufacturerLedgerSchema = new Schema({
    manufacturerName:{
        type:String,
        required:true
    },
  dateFrom: {
    type: Date,
    required: true,
    
  },
  dateTo: {
    type: Date,
    required: true,
    
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    
  },
  voucherType: {
    type: String,
    required: true
  },
  voucherNo: {
    type: String,
    required: true
  },
  debit: {
    type: Number,
    required: true
  },
  credit: {
    type: Number,
    required: true
  },
  closingBalance: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const manufacturerLedgerModel = mongoose.model('ManufacturerLedger', ManufacturerLedgerSchema);
export default  manufacturerLedgerModel;

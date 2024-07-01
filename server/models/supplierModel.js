import mongoose from "mongoose"
const Schema = mongoose.Schema;


const BankingDetailsSchema = new Schema({
  bankName: {
    type: String,
    required: true,
  },
  bankAddress: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
});


const StatutoryDetailsSchema = new Schema({
  registrationType: {
    type: String,
    enum: ['Regular', 'Composition'],
    required: true,
  },
  gstin: {
    type: String,
    required: true,
  },
});


const OpeningBalanceSchema = new Schema({
  asOnFirstDayOfFinancialYear: {
    type: Number,
    required: true,
  },
});


const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  website: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+\..+/, 'Please fill a valid website URL'],
  },
  bankingDetails: {
    type: BankingDetailsSchema,
    required: true,
  },
  statutoryDetails: {
    type: StatutoryDetailsSchema,
    required: true,
  },
  openingBalance: {
    type: OpeningBalanceSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});



const supplierModel = mongoose.model('Supplier', supplierSchema);

export default  supplierModel ;

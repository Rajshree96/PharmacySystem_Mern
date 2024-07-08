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


const ManufacturerSchema = new Schema({
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
   
  },
  website: {
    type: String,
    required: true,
   
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



const manufacturerModel = mongoose.model('Manufacturer', ManufacturerSchema);

export default  manufacturerModel ;

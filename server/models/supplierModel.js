import mongoose from "mongoose"
const Schema = mongoose.Schema;


const BankingDetailsSchema = new Schema({
  bankName: {
    type: String,
    
  },
  bankAddress: {
    type: String,
    
  },
  ifscCode: {
    type: String,
    
  },
  accountHolderName: {
    type: String,
    
  },
  accountNumber: {
    type: String,
    
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
    
  },
});


const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    
  },
  country: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    
  },
  email: {
    type: String,
   
    
  },
  website: {
    type: String,
    
    
  },
  bankingDetails: {
    type: BankingDetailsSchema,
   
  },
  statutoryDetails: {
    type: StatutoryDetailsSchema,
    required: true,
  },
  openingBalance: {
    type: OpeningBalanceSchema,
    
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

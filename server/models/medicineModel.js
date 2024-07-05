import mongoose from "mongoose"


const PriceDetailsSchema = new mongoose.Schema({
  purchasePrice: {
    type: Number,
    required: true,
  },
  landingCost: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  retailDiscount: {
    type: Number,
    required: true,
  },
  retailPrice: {
    type: Number,
    required: true,
  },
  retailMargin: {
    type: Number,
    required: true,
  },
  wholesalerDiscount: {
    type: Number,
    required: true,
  },
  wholesalerPrice: {
    type: Number,
    required: true,
  },
  wholesalerMargin: {
    type: Number,
    required: true,
  },
  minimumStock: {
    type: Number,
    required: true,
  },
});

// Define sub-schema for Opening Balance
const OpeningBalanceSchema = new mongoose.Schema({
  particular: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Define the main schema for Medicine
const MedicineSchema = new mongoose.Schema({
  itemCode: {
    type: String,
    required: true,
    unique: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  medicineCategory: {
    type: String,
    required: true,
  },
  medicineType: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  gstRate: {
    type: String,
    required: true,
  },
  purchaseTaxIncluded: {
    type: Boolean,
    required: true,
  },
  salesTaxIncluded: {
    type: Boolean,
    required: true,
  },
  productPhotos: {
    type: [String], 
    validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
  },
  description: {
    type: String,
    required: true,
  },
  batchNo: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  ingredients: {
    type: [String], 
    required: true,
  },
  priceDetails: {
    type: PriceDetailsSchema,
    required: true,
  },
  openingBalance: {
    type: OpeningBalanceSchema,
    required: true,
  },
  
},{timestamps:true});

function arrayLimit(val) {
  return val.length <= 4;
}



const medicineModel = mongoose.model('Medicine', MedicineSchema);

export default medicineModel;



    


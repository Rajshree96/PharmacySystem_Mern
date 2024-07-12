import mongoose from 'mongoose';
import Supplier from '../models/supplierModel.js';
import Medicine from '../models/medicineModel.js';

// Add a new supplier
export const addSupplier = async (req, res) => {
  try {
    const { name, address, state, pincode, country, contact, email, website, bankingDetails, statutoryDetails, openingBalance, placeOfSupply } = req.body;

    // Validate references
    if (!mongoose.Types.ObjectId.isValid(placeOfSupply)) {
      return res.status(400).json({ error: 'Invalid place of supply reference' });
    }

    const supplier = new Supplier({
      name,
      address,
      state,
      pincode,
      country,
      contact,
      email,
      website,
      bankingDetails,
      statutoryDetails,
      openingBalance,
      placeOfSupply,
    });

    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new medicine
export const addMedicine = async (req, res) => {
  try {
    const { itemCode, medicineName, medicineCategory, medicineType, manufacturer, brand, unit, gstRate, purchaseTaxIncluded, salesTaxIncluded, productPhotos, description, batchNo, expiryDate, ingredients, priceDetails, openingBalance } = req.body;

    const medicine = new Medicine({
      itemCode,
      medicineName,
      medicineCategory,
      medicineType,
      manufacturer,
      brand,
      unit,
      gstRate,
      purchaseTaxIncluded,
      salesTaxIncluded,
      productPhotos,
      description,
      batchNo,
      expiryDate,
      ingredients,
      priceDetails,
      openingBalance,
    });

    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { addSupplier, addMedicine };

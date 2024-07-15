import medicineModel from "../models/medicineModel.js";
import manufacturerModel from "../models/manufacturerModel.js";
import supplierModel from "../models/supplierModel.js";
import manufacturerLedgerModel from "../models/manufacturerLedgerModel.js";
import supplierLedgerModel from "../models/supplierLedgerModel.js";
import Category from "../models/categoryModel.js";
import Brand from "../models/BrandModal.js";
import Unit from "../models/unitsModel.js"
import MedicineType from "../models/medicineTypeModel.js";
import mongoose from "mongoose";
import { error,success } from "../utills/responseWrapper.js";


export async function addMedicineController(req, res) {
    try {
      const {
        itemCode,
        medicineName,
        medicineCategory,
        medicineType,
        manufacturer,
        brand,
        unit,
        gstRate,
        purchaseTaxIncluded,
        productPhotos,
        description,
        netWeight,
        batchNo,
        expiryDate,
        ingredients,
        priceDetails,
        openingBalance,
      } = req.body;
  

      if (
        !itemCode || !medicineName || !medicineCategory || !medicineType ||
        !manufacturer || !brand || !unit || !gstRate  ||
        !purchaseTaxIncluded  || 
        !productPhotos || !description || !batchNo || !expiryDate ||
        !ingredients || !priceDetails || !openingBalance
    ) {
        return res.send(error(400, "All fields are required."));
    }

    
  
      // Create new medicine
      const newMedicine =  medicineModel({
        itemCode,
        medicineName,
        medicineCategory: medicineCategory,
        medicineType: medicineType,
        manufacturer: manufacturer,
        brand: brand,
        unit: unit,
        gstRate,
        purchaseTaxIncluded,
        productPhotos,
        description,
        netWeight,
        batchNo,
        expiryDate,
        ingredients,
        priceDetails,
        openingBalance,
      });
  
      // Save to database
      const savedMedicine = await newMedicine.save();
  
      return res.send(success(201, "Medicine added successfully"));
    } catch (err) {
        return res.send(error(500, err.message));
    }
  };
  export async function getAllMedicineController(req, res) {
    try {
      const medicines = await medicineModel.find()
        .populate('medicineCategory')
        .populate('medicineType')
        .populate('manufacturer')
        .populate('brand')
        .populate('unit');
  
      return res.send(success(200, medicines));
    } catch (err) {
      return res.send(error(500, err.message));
    }
  }


export async function updateMedicineController(req, res) {
    try {
        
        const { itemCode, ...updateData } = req.body;

        
        if (!itemCode) {
            return res.send(error(400, "Item code is required."));
        }

       
        const updatedMedicine = await medicineModel.findOneAndUpdate(
            { itemCode },
            updateData,
            { new: true }
        );

       
        if (!updatedMedicine) {
            return res.send(error(404, "Medicine not found."));
        }

        
        return res.send(success(200,  updatedMedicine));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}


export async function deleteMedicineController(req, res) {
    try {
       
        const { itemCode } = req.params;

        
        if (!itemCode) {
            return res.send(error(400, "Item code is required."));
        }

        
        const deletedMedicine = await medicineModel.findOneAndDelete({ itemCode });

        
        if (!deletedMedicine) {
            return res.send(error(404, "Medicine not found."));
        }

        return res.send(success(200,  deletedMedicine));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}


// controllers related to manufacturer



export async function addManufacturerController(req, res) {
    
    try {
        const {
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
          openingBalance
        } = req.body;
    
        const newManufacturer = new manufacturerModel({
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
          openingBalance
        });
    
        await newManufacturer.save();
        res.status(201).json({ message: 'Manufacturer added successfully', data: newManufacturer });
      } catch (error) {
        console.error('Error saving manufacturer:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
      }
}

export async function getAllManufacturerController(req,res){
    try {
        
        const manufacturers = await manufacturerModel.find();

       
        return res.send(success(200,manufacturers));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

export async function updateManufacturerController(req,res){
    try {
        
        const {  ...updateData } = req.body;
        const _id = req.params;

        
        if (!_id ) {
            return res.send(error(400, "_id  is required."));
        }

       
        const updatedManufacturer = await manufacturerModel.findByIdAndUpdate(
            { _id },
            updateData,
            { new: true }
        );

       
        if (!updatedManufacturer ) {
            return res.send(error(404, "Manufacturer not found."));
        }

        
        return res.send(success(200,  updatedManufacturer ));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

export async function deleteManufacturerController(req,res){
    try {
       
        const { _id } = req.params;

        
        if (!_id) {
            return res.send(error(400, "_id is required."));
        }

        
        const deletedManufacturer = await manufacturerModel.findByIdAndDelete({ _id });

        
        if (!deletedManufacturer ) {
            return res.send(error(404, "Manufacturer not found."));
        }

        return res.send(success(200, deletedManufacturer ));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

//controllers for suppliers


export async function addSupplierController(req,res){
try {
    const {
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
      openingBalance
    } = req.body;

    const newSupplier = new supplierModel({
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
        openingBalance
      });

    await newSupplier.save();
    res.status(201).json({ message: 'Supplier added successfully', data: newSupplier });
  } catch (error) {
    console.error('Error saving manu:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

export async function getAllSupplierController(req,res){
    try {
        
        const supplier = await supplierModel.find();

       
        return res.send(success(200,supplier));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

export async function updateSupplierController(req,res){
    try{
    const {  ...updateData } = req.body;
        const _id = req.params;

        
        if (!_id ) {
            return res.send(error(400, "_id  is required."));
        }

       
        const updatedSupplier = await supplierModel.findByIdAndUpdate(
            { _id },
            updateData,
            { new: true }
        );

       
        if (!updatedSupplier ) {
            return res.send(error(404, "supplier not found."));
        }

        
        return res.send(success(200,  updatedSupplier ));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

export async function deleteSupplierController(req,res){
    try {
       
        const { _id } = req.params;

        
        if (!_id) {
            return res.send(error(400, "_id is required."));
        }

        
        const deletedSupplier = await supplierModel.findByIdAndDelete({ _id });

        
        if (!deletedSupplier  ) {
            return res.send(error(404, "supplier not found."));
        }

        return res.send(success(200, deletedSupplier  ));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}


//  Controller  related to manufacturer Ledger Controller


export async function addManufacturerLedgerController(req,res){
    try {
        const { manufacturerName, dateFrom, dateTo, date, voucherType, voucherNo, debit, credit } = req.body;

        const latestEntry = await manufacturerLedgerModel.findOne({ manufacturerName })
          .sort({ date: -1 });      
        let previousClosingBalance = latestEntry ? latestEntry.closingBalance : 0;
        let closingBalance = previousClosingBalance + credit - debit;
        
        // Create a new ledger entry
        const newLedgerEntry = new manufacturerLedgerModel({
          manufacturerName,
          dateFrom: dateFrom,
          dateTo: dateTo,
          date: date,
          voucherType,
          voucherNo,
          debit,
          credit,
          closingBalance
        });
    
        // Save the new ledger entry to the database
        await newLedgerEntry.save();
    
        // Send the new ledger entry as the response
        res.status(201).json(newLedgerEntry);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export async function getAllManufacturerLedgerController(req,res){
    try {
        
        const manufacturerLedger = await manufacturerLedgerModel.find();

       
        return res.send(success(200,manufacturerLedger));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

export async function updateManufacturerLedgerController(req,res){
    try{
        const {  ...updateData } = req.body;
            const _id = req.params;
    
            
            if (!_id ) {
                return res.send(error(400, "_id  is required."));
            }
    
           
            const updatedManufacturerLedger= manufacturerLedgerModel.findByIdAndUpdate(
                { _id },
                updateData,
                { new: true }
            );
    
           
            if (!updatedManufacturerLedger ) {
                return res.send(error(404, "supplier not found."));
            }
    
            
            return res.send(success(200,  updatedManufacturerLedger ));
        } catch (err) {
            
            return res.send(error(500, err.message));
        }
}

export async function deleteManufacturerLedgerController(req,res){
    try {
       
        const { _id } = req.params;

        
        if (!_id) {
            return res.send(error(400, "_id is required."));
        }

        
        const deletedManufacturerLedger = await manufacturerLedgerModel.findByIdAndDelete({ _id });

        
        if (!deletedManufacturerLedger ) {
            return res.send(error(404, "Manufacturer Ledger  not found."));
        }

        return res.send(success(200, deletedManufacturerLedger  ));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

// controllers related to supplier ledger 


export async function addSupplierLedgerController(req,res){
    try {
        const { supplierName, dateFrom, dateTo, date, voucherType, voucherNo, debit, credit } = req.body;

        const latestEntry = await supplierLedgerModel.findOne({ supplierName })
          .sort({ date: -1 });      
        let previousClosingBalance = latestEntry ? latestEntry.closingBalance : 0;
        let closingBalance = previousClosingBalance + credit - debit;
        
        // Create a new ledger entry
        const newLedgerEntry = new supplierLedgerModel({
          supplierName,
          dateFrom: dateFrom,
          dateTo: dateTo,
          date: date,
          voucherType,
          voucherNo,
          debit,
          credit,
          closingBalance
        });
    
        // Save the new ledger entry to the database
        await newLedgerEntry.save();
    
        // Send the new ledger entry as the response
        res.status(201).json(newLedgerEntry);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export async function getAllSupplierLedgerController(req,res){
    try {
        
        const supplierLedger = await supplierLedgerModel.find();

       
        return res.send(success(200,supplierLedger));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

export async function updateSupplierLedgerController(req,res){
    try{
        const {  ...updateData } = req.body;
            const _id = req.params;
    
            
            if (!_id ) {
                return res.send(error(400, "_id  is required."));
            }
    
           
            const updatedSupplierLedger= supplierLedgerModel.findByIdAndUpdate(
                { _id },
                updateData,
                { new: true }
            );
    
           
            if (!updatedSupplierLedger ) {
                return res.send(error(404, "supplier not found."));
            }
    
            
            return res.send(success(200,  updatedSupplierLedger ));
        } catch (err) {
            
            return res.send(error(500, err.message));
        }
}

export async function deleteSupplierLedgerController(req,res){
    try {
       
        const { _id } = req.params;

        
        if (!_id) {
            return res.send(error(400, "_id is required."));
        }

        
        const deletedSupplierLedger = await supplierLedgerModel.findByIdAndDelete({ _id });

        
        if (!deletedSupplierLedger ) {
            return res.send(error(404, "supplier  Ledger  not found."));
        }

        return res.send(success(200, deletedSupplierLedger ));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}


//supplier ledger controller

export async function  getSupplierLedgerController(req,res){
    try {
        const { supplierName,fromDate,toDate } = req.query;
    
        if(!supplierName || !fromDate || !toDate){
            return res.status(404).send("all fields are required");
        }
        const query = {
          date: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
          },
        };
    
        
        if (supplierName) {
          query.supplierName = supplierName;
        }
    
       
        const purchases = await Purchase.find(query);
        
        res.json(purchases);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
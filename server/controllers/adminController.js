import medicineModel from "../models/medicineModel.js";
import manufacturerModel from "../models/manufacturerModel.js";
import supplierModel from "../models/supplierModel.js";
import { error,success } from "../utills/responseWrapper.js";


//controllers related to medicine
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
            salesTaxIncluded,
            productPhotos,
            description,
            batchNo,
            expiryDate,
            ingredients,
            priceDetails,
            openingBalance,
        } = req.body;
      
        if (
            !itemCode || !medicineName || !medicineCategory || !medicineType ||
            !manufacturer || !brand || !unit || !gstRate  ||
            !purchaseTaxIncluded  || !salesTaxIncluded || 
            !productPhotos || !description || !batchNo || !expiryDate ||
            !ingredients || !priceDetails || !openingBalance
        ) {
            return res.send(error(400, "All fields are required."));
        }


        
        const newMedicine = new medicineModel({
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

       
        await newMedicine.save();

       
        return res.send(success(201, "Medicine added successfully"));
    } catch (err) {
        return res.send(error(500, err.message));
    }
}


export async function getAllMedicineController(req, res) {
    try {
        
        const medicines = await medicineModel.find();

       
        return res.send(success(200,  medicines));
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
            bankName,
            bankAddress,
            ifscCode,
            accountHolderName,
            accountNumber,
            registrationType,
            gstin,
            asOnFirstDayOfFinancialYear
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
            bankingDetails: {
                bankName,
                bankAddress,
                ifscCode,
                accountHolderName,
                accountNumber
            },
            statutoryDetails: {
                registrationType,
                gstin
            },
            openingBalance: {
                asOnFirstDayOfFinancialYear
            }
        });

       
        const savedManufacturer = await newManufacturer.save();

        res.status(201).json(savedManufacturer);
    } catch (error) {
        console.error('Error adding manufacturer:', error);
        res.status(500).json({ error: 'Failed to add manufacturer' });
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



export async function addSupplierController(req, res) {
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
            bankName,
            bankAddress,
            ifscCode,
            accountHolderName,
            accountNumber,
            registrationType,
            gstin,
            asOnFirstDayOfFinancialYear
        } = req.body;

        // Create a new instance of Supplier using the request body data
        const newSupplier = new supplierModel ({
            name,
            address,
            state,
            pincode,
            country,
            contact,
            email,
            website,
            bankingDetails: {
                bankName,
                bankAddress,
                ifscCode,
                accountHolderName,
                accountNumber
            },
            statutoryDetails: {
                registrationType,
                gstin
            },
            openingBalance: {
                asOnFirstDayOfFinancialYear
            }
        });

        // Save the new supplier to the database
        const savedSupplier = await newSupplier.save();

        res.status(201).json(savedSupplier); // Respond with the saved supplier data
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).json({ error: 'Failed to add supplier' });
    }
}

export async function getAllSupplierController(req,res){
    try {
        
        const supplier = await SupplierModel.find();

       
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



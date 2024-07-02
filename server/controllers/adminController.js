import medicineModel from "../models/medicineModel.js";
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
            !manufacturer || !brand || !unit || gstRate == null ||
            purchaseTaxIncluded == null || salesTaxIncluded == null || 
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

       
        return res.send(success(200, "Medicines fetched successfully", medicines));
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

        
        return res.send(success(200, "Medicine updated successfully", updatedMedicine));
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

        return res.send(success(200, "Medicine deleted successfully", deletedMedicine));
    } catch (err) {
        
        return res.send(error(500, err.message));
    }
}

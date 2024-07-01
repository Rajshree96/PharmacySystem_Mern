import medicineModel from "../models/medicineModel.js";
import { error,success } from "../utills/responseWrapper.js";

export async function addMedicineController(req, res) {
    try {
        // Extract medicine data from request body
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
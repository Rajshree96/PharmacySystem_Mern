// controllers/medicineTypeController.js

import MedicineType from "../models/medicineTypeModel.js";

 
export const addmedicineType = async (req, res) => {
    try {
        const { mediType } = req.body;
        const newMedicineType = new MedicineType({ mediType });
        await newMedicineType.save();
        res.status(201).json({ message: 'MedicineType created successfully', medicineType: newMedicineType });
    } catch (error) {
        res.status(400).json({ message: 'Error creating medicineType', error });
    }
}

export const getAll = async (req, res) => {
    try {
        const medicine = await MedicineType.find({});
        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medicine types', error });
    }
}

export const editMedicineType = async (req, res) => {
    try {
        const { id } = req.params;
        const { mediType } = req.body;
        const updatedMedicineType = await MedicineType.findByIdAndUpdate(id, { mediType }, { new: true });
        if (!updatedMedicineType) {
            return res.status(404).json({ message: 'MedicineType not found' });
        }
        res.status(200).json({ message: 'MedicineType updated successfully', medicineType: updatedMedicineType });
    } catch (error) {
        res.status(400).json({ message: 'Error updating medicineType', error });
    }
}

export const deleteMedicineType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMedicineType = await MedicineType.findByIdAndDelete(id);
        if (!deletedMedicineType) {
            return res.status(404).json({ message: 'MedicineType not found' });
        }
        res.status(200).json({ message: 'MedicineType deleted successfully', medicineType: deletedMedicineType });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting medicineType', error });
    }
}

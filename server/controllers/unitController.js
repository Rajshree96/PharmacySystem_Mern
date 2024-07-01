import Unit from "../models/unitsModel.js";
// Get all units
export const getAllUnits = async (req, res) => {
    try {
        const units = await Unit.find({});
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching units', error });
    }
};

// Add a new unit
export const addUnit = async (req, res) => {
    try {
        const { name } = req.body;

        // Create a new unit
        const newUnit = new Unit({ name });
        await newUnit.save();

        res.status(201).json({ message: 'Unit created successfully', unit: newUnit });
    } catch (error) {
        res.status(400).json({ message: 'Error creating unit', error });
    }
};

// Edit a unit
export const editUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Find the unit by ID and update it
        const updatedUnit = await Unit.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedUnit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json({ message: 'Unit updated successfully', unit: updatedUnit });
    } catch (error) {
        res.status(400).json({ message: 'Error updating unit', error });
    }
};

// Delete a unit
export const deleteUnit = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the unit by ID and delete it
        const deletedUnit = await Unit.findByIdAndDelete(id);

        if (!deletedUnit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json({ message: 'Unit deleted successfully', unit: deletedUnit });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting unit', error });
    }
};

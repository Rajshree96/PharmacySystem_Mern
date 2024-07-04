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
// Add a new unit or update an existing one
export const addUnit = async (req, res) => {
    try {
        const { name, type, symbol, primaryUnit, conversion, secondaryUnit } = req.body;

        if (type === 'Single' && (!name || !symbol)) {
            return res.status(400).json({ message: 'Name and Symbol are required for Single type' });
        }

        if (type === 'Compounded' && (!name || !symbol || !primaryUnit || !conversion || !secondaryUnit)) {
            return res.status(400).json({ message: 'Name, Symbol, Primary Unit, Conversion, and Secondary Unit are required for Compounded type' });
        }

        let existingUnit = await Unit.findOne({ name, symbol });

        if (existingUnit) {
            // Unit already exists, update its details
            existingUnit.type = type;
            existingUnit.primaryUnit = type === 'Compounded' ? primaryUnit : null;
            existingUnit.conversion = type === 'Compounded' ? conversion : null;
            existingUnit.secondaryUnit = type === 'Compounded' ? secondaryUnit : null;

            const updatedUnit = await existingUnit.save();

            return res.status(200).json({ message: 'Unit updated successfully', unit: updatedUnit });
        }

        // Unit does not exist, create a new one
        const newUnit = new Unit({
            name,
            type,
            symbol,
            primaryUnit: type === 'Compounded' ? primaryUnit : null,
            conversion: type === 'Compounded' ? conversion : null,
            secondaryUnit: type === 'Compounded' ? secondaryUnit : null,
        });

        await newUnit.save();

        res.status(201).json({ message: 'Unit created successfully', unit: newUnit });
    } catch (error) {
        res.status(400).json({ message: 'Error creating/updating unit', error });
    }
};


// Edit a unit
export const editUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, symbol, primaryUnit, conversion, secondaryUnit } = req.body;

        if (type === 'Single' && (!name || !symbol)) {
            return res.status(400).json({ message: 'Name and Symbol are required for Single type' });
        }

        if (type === 'Compounded' && (!name || !symbol || !primaryUnit || !conversion || !secondaryUnit)) {
            return res.status(400).json({ message: 'Name, Symbol, Primary Unit, Conversion, and Secondary Unit are required for Compounded type' });
        }

        const updatedUnit = await Unit.findByIdAndUpdate(
            id, 
            {
                name,
                type,
                symbol,
                primaryUnit: type === 'Compounded' ? primaryUnit : null,
                conversion: type === 'Compounded' ? conversion : null,
                secondaryUnit: type === 'Compounded' ? secondaryUnit : null,
            },
            { new: true }
        );

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

        const deletedUnit = await Unit.findByIdAndDelete(id);

        if (!deletedUnit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json({ message: 'Unit deleted successfully', unit: deletedUnit });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting unit', error });
    }
};

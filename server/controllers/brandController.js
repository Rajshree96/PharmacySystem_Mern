import Brand from "../models/BrandModal.js";

// Add a Brand
export const addBrand = async (req, res) => {
    const { brand, manufactureId } = req.body;

    try {
        const newBrand = await Brand.create({ brand, manufactureId });
        return res.status(201).json(newBrand);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get all Brands
export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        return res.status(200).json(brands);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Edit a Brand
export const editBrand = async (req, res) => {
    const { id } = req.params;
    const { brand, manufactureId } = req.body;

    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, { brand, manufactureId }, { new: true });

        if (!updatedBrand) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        return res.status(200).json(updatedBrand);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a Brand
export const deleteBrand = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        return res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

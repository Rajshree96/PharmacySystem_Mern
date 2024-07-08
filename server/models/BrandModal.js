import mongoose from "mongoose";
import manufacturerModel from "./manufacturerModel.js";

const BrandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    manufactureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer', // Reference to the Manufacturer model
        required: true,
    }
});

// Define a pre-save hook to ensure the manufactureId exists in the Manufacturer model
BrandSchema.pre('save', async function(next) {
    try {
        const isValidManufacture = await manufacturerModel.exists({ _id: this.manufactureId });
        if (!isValidManufacture) {
            throw new Error('Invalid manufactureId');
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;

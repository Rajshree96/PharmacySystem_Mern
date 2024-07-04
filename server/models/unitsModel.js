import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Single', 'Compounded'],
    },
    symbol: {
        type: String,
        required: true,
    },
    primaryUnit: {
        type: String,
        default: null,
    },
    conversion: {
        type: String,
        default: null,
    },
    secondaryUnit: {
        type: String,
        default: null,
    }
}, { timestamps: true });

const Unit = mongoose.model('Unit', unitSchema);

export default Unit;

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true,
        trim: true,
    },
    action:{
        type:String,
        enum: ['edit', 'delete'],
    }
}, {timestamps:true});


const Category = mongoose.model('Category', categorySchema);
export default Category;
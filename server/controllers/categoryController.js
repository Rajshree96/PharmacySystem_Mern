import Category from '../models/categoryModel.js';


//get all categories
export const getAllCategory = async (req, res)=>{
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });

  }
}
// Add a new category
export const addCategory = async (req, res) => {
    try {
        const { name, action } = req.body;

        // Create a new category
        const newCategory = new Category({ name, action });
        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error });
    }
};


// Edit a category
export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Find the category by ID and update it
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(400).json({ message: 'Error updating category', error });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the category by ID and delete it
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting category', error });
    }
};

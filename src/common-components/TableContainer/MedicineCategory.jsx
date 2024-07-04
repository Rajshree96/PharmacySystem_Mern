import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Modal,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { addCategory, getAllCategories, editCategory, deleteCategory } from "../../categoriesApi";
import AddCategoryModal from "../Modals/medicineModals/addMedicineModals/AddCategoryModal";
const MedicineCategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ name: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      console.log("Fetched categories:", response);
      if (Array.isArray(response)) {
        setCategories(response);
      } else {
        console.error("Error: Fetched data is not an array");
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      const updatedCategories = categories.filter((category) => category._id !== id);
      setCategories(updatedCategories);
      console.log("Category deleted successfully with ID:", id);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleAddCategory = () => {
    setCurrentCategory({ name: '' });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleSaveCategory = async () => {
    try {
      if (isEditMode) {
        await editCategory(currentCategory._id, currentCategory);
        const updatedCategories = categories.map((category) =>
          category._id === currentCategory._id ? currentCategory : category
        );
        setCategories(updatedCategories);
        console.log("Category edited successfully with ID:", currentCategory._id);
      } else {
        const response = await addCategory(currentCategory);
        setCategories([...categories, response.category]);
        console.log("Category added successfully:", response.category);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#004d40" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>S.no</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Category Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditCategory(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCategory(category._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AddCategoryModal
            categoryName={currentCategory.name}
            setCategoryName={(name) => setCurrentCategory({ ...currentCategory, name })}
            isEditMode={isEditMode}
            onSave={handleSaveCategory} // Directly pass handleSaveCategory
            onCancel={() => {
              setModalOpen(false);
              setCurrentCategory({ name: '' });
            }}
          />
        </Box>
      </Modal>

      
    </Box>
  );
};

export default MedicineCategoryTable;

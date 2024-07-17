// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Box,
//   Modal,
//   Button,
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { addCategory, getAllCategories, editCategory, deleteCategory } from "../../categoriesApi";
// import AddCategoryModal from "../Modals/medicineModals/addMedicineModals/AddCategoryModal";
// const MedicineCategoryTable = () => {
//   const [categories, setCategories] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState({ name: '' });
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     fetchCategories();
//   }, [categories]);

//   const fetchCategories = async () => {
//     try {
//       const response = await getAllCategories();
//       console.log("Fetched categories:", response);
//       if (Array.isArray(response)) {
//         setCategories(response);
//       } else {
//         console.error("Error: Fetched data is not an array");
//         setCategories([]);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setCategories([]);
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await deleteCategory(id);
//       await fetchCategories();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   const handleOpenModal = (category = null) => {
//     if (category) {
//       setCurrentCategory(category);
//       setIsEditMode(true);
//     } else {
//       setCurrentCategory({ name: "" });
//       setIsEditMode(false);
//     }
//     setModalOpen(true);
//   };

//   const handleSaveCategory = async (categoryToSave) => {
//     try {
//       if (isEditMode) {
//         await editCategory(categoryToSave._id, { name: categoryToSave.name });
//       } else {
//         await addCategory({ name: categoryToSave.name });
//       }
//       setModalOpen(false);
//       await fetchCategories();
      
//     } catch (error) {
//       console.error("Error saving category:", error);
//     }
//   };
//   // const handleEditCategory = (category) => {
//   //   setCurrentCategory(category);
//   //   setIsEditMode(true);
//   //   setModalOpen(true);
//   // };

//   // const handleAddCategory = () => {
//   //   setCurrentCategory({ name: '' });
//   //   setIsEditMode(false);
//   //   setModalOpen(true);
//   // };

//   // const handleSaveCategory = async () => {
//   //   try {
//   //     if (isEditMode) {
//   //       await editCategory(currentCategory._id, currentCategory);
//   //       const updatedCategories = categories.map((category) =>
//   //         category._id === currentCategory._id ? currentCategory : category
//   //       );
//   //       setCategories(updatedCategories);
//   //       console.log("Category edited successfully with ID:", currentCategory._id);
//   //     } else {
//   //       const response = await addCategory(currentCategory);
//   //       setCategories([...categories, response.category]);
//   //       console.log("Category added successfully:", response.category);
//   //     }
//   //     setModalOpen(false);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   return (
//     <Box sx={{ overflowX: "auto" }}>
//        <Button
//          variant="contained"
//         startIcon={<Add/>}
//         onClick={() => handleOpenModal()}
//         //  sx={{ mt: 2 }}
//         icon={Add}
//         label={"Add Category"}
//         // onClick={() => handleOpenModal()}
//         // onClick={() => navigate("/form/addcategory")}
//         // onClick={() => handleOpenModal()}

//         sx={{
//           bgcolor: "#00816b",
//           "&:hover": { bgcolor: "#004d40" },
//           transition: "all 0.3s",
//           mb: 4,
//           pt:1
//         }}
//       >
//         Add Category
//       </Button>
//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ bgcolor: "#004d40" }}>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>S.no</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Category Name</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.map((category, index) => (
//               <TableRow key={category._id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleOpenModal(category)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDeleteCategory(category._id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             p: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <AddCategoryModal
//             // categoryName={currentCategory.name}
//             // setCategoryName={(name) => setCurrentCategory({ ...currentCategory, name })}
//             // isEditMode={isEditMode}
//             // onSave={handleSaveCategory} // Directly pass handleSaveCategory
//             // onCancel={() => {
//             //   setModalOpen(false);
//             //   setCurrentCategory({ name: '' });
//             category={currentCategory}
//             setCategory={setCurrentCategory}
//             onSave={handleSaveCategory}
//             isEditMode={isEditMode}
            
//           />
//         </Box>
//       </Modal>

      
//     </Box>
//   );
// };

// export default MedicineCategoryTable;

import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllCategories, deleteCategory } from "../../categoriesApi";
import EditButton from "../ButtonContainer/EditButton";
import DeleteButton from "../ButtonContainer/DeleteButton";
import TablePaginations from "../TablePagination/TablePaginations";

const MedicineCategoryTable = ({ onEditCategory }) => {
  const [categories, setCategories] = useState([]);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
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
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
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
                <TableCell>{ index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <EditButton
                    label={"edit"}
                    icon={EditIcon}
                    sx={{ mr: 1, color: "#1976d2" }}
                    onClick={() => onEditCategory(category)}
                  />
                  <DeleteButton
                    label={"delete"}
                    icon={DeleteIcon}
                    sx={{ mr: 1, color: "red" }}
                    onClick={() => handleDeleteCategory(category._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
    </Box>
  );
};

export default MedicineCategoryTable;

// import React from "react";
// import { Button, TextField } from "@mui/material";
// import { Add } from "@mui/icons-material";

// const AddCategoryModal = ({ category, setCategory, isEditMode, onSave ,setSuccess}) => {
//   const handleSaveCategory = () => {
//      onSave(category); // Trigger the save action directly from props
//      handleAddCategory();
//   };

//   const handleAddCategory = () => {
//     setTimeout(() => {
//       setSuccess(true);
//     }, 300);
//   };

//   return (
//     <>
//       <TextField
//         autoFocus
//         margin="dense"
//         label="Category Name"
//         type="text"
//         fullWidth
//         variant="standard"
//         value={category.name}
//         onChange={(e) => setCategory({...category, name: e.target.value})}
//       />
//       <Button
//         variant="contained"
//         // startIcon={isEditMode ? null : <Add />}
//         startIcon={<Add/>}
//         color="primary"
//          sx={{ mt: 2 }}
//         onClick={handleSaveCategory}
//       >
//         Add
//         {/* {isEditMode ? "Save" : "Add"} */}
//       </Button>
//     </>
//   );
// };

// export default AddCategoryModal;

import React, {useState, useEffect} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import {addCategory, editCategory} from "../../../../categoriesApi";

const AddCategoryModal = ({formType, categoryData, setSuccess, handleClose}) => {
    const [ categoryName, setCategoryName ] = useState("");

    useEffect(() => {
        if (formType === "edit category" && categoryData) {
            setCategoryName(categoryData.name);
        }
        else {
            setCategoryName("");
        }
    }, [ formType, categoryData ]);

    const handleSaveCategory = async () => {
        try {
            if (formType === "edit category") {
                await editCategory(categoryData._id, {name: categoryName});
                console.log("Category updated successfully");
            }
            else {
                await addCategory({name: categoryName});
                console.log("Category added successfully");
            }
            setSuccess(true);
            setCategoryName("");
        } catch (error) {
            console.error(`Error ${formType === "edit category" ? "editing" : "adding"} category:`, error);
        }
    };

    return (
        <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={12}>
                    <TextField
                        label="Category Name"
                        variant="standard"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Button variant="contained" color="primary" onClick={handleSaveCategory} className="btn-design">
                        {formType === "edit category" ? "Update Category" : "Add Category"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddCategoryModal;

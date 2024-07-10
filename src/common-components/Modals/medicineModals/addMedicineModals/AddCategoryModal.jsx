import React from "react";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddCategoryModal = ({ category, setCategory, isEditMode, onSave ,setSuccess}) => {
  const handleSaveCategory = () => {
     onSave(category); // Trigger the save action directly from props
     handleAddCategory();
  };

  const handleAddCategory = () => {
    setTimeout(() => {
      setSuccess(true);
    }, 300);
  };

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        label="Category Name"
        type="text"
        fullWidth
        variant="standard"
        value={category.name}
        onChange={(e) => setCategory({...category, name: e.target.value})}
      />
      <Button
        variant="contained"
        // startIcon={isEditMode ? null : <Add />}
        startIcon={<Add/>}
        color="primary"
         sx={{ mt: 2 }}
        onClick={handleSaveCategory}
      >
        Add
        {/* {isEditMode ? "Save" : "Add"} */}
      </Button>
    </>
  );
};

export default AddCategoryModal;

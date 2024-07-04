import React from "react";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddCategoryModal = ({ categoryName, setCategoryName, isEditMode, onSave, onCancel }) => {
  const handleSaveCategory = () => {
     onSave(); // Trigger the save action directly from props
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
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <Button
        variant="contained"
        startIcon={isEditMode ? null : <Add />}
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSaveCategory}
      >
        {isEditMode ? "Save" : "Add"}
      </Button>
    </>
  );
};

export default AddCategoryModal;

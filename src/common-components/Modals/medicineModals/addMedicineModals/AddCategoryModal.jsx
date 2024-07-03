import React, { useState } from "react";
import { DialogContentText, TextField } from "@mui/material";

const AddCategoryModal = ({ categoryName, setCategoryName }) => {
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
    </>
  );
};

export default AddCategoryModal;

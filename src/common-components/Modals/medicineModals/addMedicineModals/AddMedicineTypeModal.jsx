import React, { useState } from "react";
import { Button, DialogContentText, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddMedicineTypeModal = ({ medicineTypeName, setMedicineTypeName }) => {
  return (
    <>
      
      <TextField
        autoFocus
        margin="dense"
        label="Medicine Type Name"
        type="text"
        fullWidth
        variant="standard"
        value={medicineTypeName}
        onChange={(e) => setMedicineTypeName(e.target.value)}
      />
     <Button
          variant="contained"
          startIcon={<Add/>}
          
          color="primary"
          sx={{ mt: 2 }}
          // onClick={handleAddCategory}
        >
         Add
        </Button>
    </>
  );
};

export default AddMedicineTypeModal;

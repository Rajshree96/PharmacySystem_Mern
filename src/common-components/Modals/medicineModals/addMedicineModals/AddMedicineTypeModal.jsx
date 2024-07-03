import React, { useState } from "react";
import { DialogContentText, TextField } from "@mui/material";

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
     
    </>
  );
};

export default AddMedicineTypeModal;

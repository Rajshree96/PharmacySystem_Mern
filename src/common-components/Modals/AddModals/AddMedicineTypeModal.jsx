import React, { useState } from "react";
import { DialogContentText, TextField } from "@mui/material";

const AddMedicineTypeModal = ({ medicineTypeName, setMedicineTypeName }) => {
  return (
    <>
      <DialogContentText>Enter the details of the medicine type you want to add.</DialogContentText>
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
      {/* Additional fields for medicine type details can be added here */}
    </>
  );
};

export default AddMedicineTypeModal;

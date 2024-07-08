import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/medicine-type';

const AddMedicineTypeModal = ({ onClose, isEditMode, initialCategory }) => {
  const [medicineTypeName, setMedicineTypeName] = useState(initialCategory?.mediType || "");

  const handleSaveMedicineType = async () => {
    try {
      if (isEditMode && initialCategory?._id) {
        await axios.put(`${API_URL}/edit/${initialCategory._id}`, { mediType: medicineTypeName }, getConfig());
      } else {
        await axios.post(`${API_URL}/add`, { mediType: medicineTypeName }, getConfig());
      }
      onClose(true); // Close modal after successful save
    } catch (error) {
      console.error("Error saving medicine type:", error);
      // alert("Error saving medicine type");
    }
  };

  const getConfig = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));

    return {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };
  };

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
        startIcon={<Add />}
        color="primary"
        sx={{ mt: 2, mr: 2 }}
        onClick={handleSaveMedicineType}
      >
        {isEditMode ? "Update" : "Add"}
      </Button>
      {/* <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => onClose(false)} // Close modal on cancel
      >
        Cancel
      </Button> */}
    </>
  );
};

export default AddMedicineTypeModal;

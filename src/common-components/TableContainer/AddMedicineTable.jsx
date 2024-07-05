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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";

const AddMedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);


  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/admin/getallmedicine");
      console.log("API Response:", response.data.result);

      if (Array.isArray(response.data.result)) {
        setMedicines(response.data.result);
      } else {
        console.error("API response does not contain medicines array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    
    fetchMedicines();
  }, []);

  const handleVisibilityClick = (medicine) => {
    // Handle visibility button click, e.g., show details in a modal
    console.log("Viewing details for medicine:", medicine);
  };

  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditingMedicine(null);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/admin/medicine/${editingMedicine.itemCode}`, editingMedicine);
      console.log("Medicine updated:", response.data);
      setMedicines((prevMedicines) =>
        prevMedicines.map((med) =>
          med.itemCode === editingMedicine.itemCode ? editingMedicine : med
        )
      );
      handleEditDialogClose();
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };
  const handleDeleteClick = async (itemCode) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/admin/delete/${itemCode}`);
      console.log("API Response:", response);
  
      if (response.data.status === "ok" || response.status === 200) {  // Check the response structure
        console.log("Deleted medicine with item code:", itemCode);
        fetchMedicines();  // Fetch the updated list after deletion
      } else {
        console.error("Failed to delete medicine:", response.data);
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMedicine({ ...editingMedicine, [name]: value });
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#004d40" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Item Code</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Medicine Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Batch No.</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Expiry Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Category</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Medicine Type</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Brand</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Unit</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Net Weight</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(medicines) && medicines.length > 0 ? (
              medicines.map((medicine) => (
                <TableRow key={medicine._id}>
                  <TableCell>{medicine.itemCode}</TableCell>
                  <TableCell>{medicine.medicineName}</TableCell>
                  <TableCell>{medicine.batchNo}</TableCell>
                  <TableCell>{medicine.expiryDate}</TableCell>
                  <TableCell>{medicine.medicineCategory}</TableCell>
                  <TableCell>{medicine.medicineType}</TableCell>
                  <TableCell>{medicine.brand}</TableCell>
                  <TableCell>{medicine.unit}</TableCell>
                  <TableCell>{medicine.netWeight}</TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => handleVisibilityClick(medicine)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEditClick(medicine)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(medicine.itemCode)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No medicines found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Medicine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the medicine below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="medicineName"
            label="Medicine Name"
            type="text"
            fullWidth
            value={editingMedicine?.medicineName || ''}
            onChange={handleInputChange}
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddMedicineTable;

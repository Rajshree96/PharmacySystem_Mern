import React, { useEffect, useState } from "react";
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
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getAllUnits, deleteUnit, editUnit } from "../../unitapi";

const MedicineTable = () => {
  const [units, setUnits] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState({});

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await getAllUnits();
      console.log("Fetched units:", response.data); // Log the fetched units
      if (Array.isArray(response.data)) {
        setUnits(response.data);
      } else {
        console.error("Error: Fetched data is not an array");
        setUnits([]); // Set to empty array to avoid errors
      }
    } catch (error) {
      console.error("Error fetching units:", error);
      setUnits([]); // Set to empty array to avoid errors
    }
  };

  const handleDeleteUnit = async (id) => {
    try {
      await deleteUnit(id);
      const updatedUnits = units.filter((unit) => unit._id !== id);
      setUnits(updatedUnits);
      console.log("Unit deleted successfully with ID:", id);
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  const handleEditUnit = (unit) => {
    setCurrentUnit(unit);
    setEditModalOpen(true);
  };

  const handleSaveUnit = async () => {
    try {
      await editUnit(currentUnit._id, currentUnit);
      const updatedUnits = units.map((unit) =>
        unit._id === currentUnit._id ? currentUnit : unit
      );
      setUnits(updatedUnits);
      setEditModalOpen(false);
      console.log("Unit edited successfully with ID:", currentUnit._id);
    } catch (error) {
      console.error("Error editing unit:", error);
    }
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#004d40" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>S.no</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Unit Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit, index) => (
              <TableRow key={unit._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{unit.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditUnit(unit)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUnit(unit._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', width: 400 }}>
          <TextField
            fullWidth
            margin="dense"
            label="Unit Name"
            value={currentUnit.name || ''}
            onChange={(e) => setCurrentUnit({ ...currentUnit, name: e.target.value })}
          />
          <Button onClick={handleSaveUnit} variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MedicineTable;

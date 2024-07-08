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
  Modal,
  Button,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
// import {
//   getAllMedicineTypes,
//   editMedicineType,
//   deleteMedicineType,
//   addMedicineType,
// } from "../../medicineTypeApi";
// import {addMedicineType,  getAllMedicineTypes, editMedicineType, deleteMedicineType } from "../../medicineapi";
import { getAllMedicineTypes, addMedicineType, editMedicineType,  deleteMedicineType } from "../../medicineTypeapi";
import AddMedicineTypeModal from "../Modals/medicineModals/addMedicineModals/AddMedicineTypeModal";
const MedicinTypeTable = () => {
  const [medicineTypes, setMedicineTypes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMedicineType, setCurrentMedicineType] = useState({ mediType: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchMedicineTypes();
  }, []);

  const fetchMedicineTypes = async () => {
    try {
      const response = await getAllMedicineTypes();
      setMedicineTypes(response);
    } catch (error) {
      console.error("Error fetching medicine types:", error);
      setMedicineTypes([]);
    }
  };

  const handleDeleteMedicineType = async (id) => {
    try {
      await deleteMedicineType(id);
      await fetchMedicineTypes();
    } catch (error) {
      console.error("Error deleting medicine type:", error);
    }
  };

  const handleOpenModal = (medicineType = null) => {
    if (medicineType) {
      setCurrentMedicineType(medicineType);
      setIsEditMode(true);
    } else {
      setCurrentMedicineType({ mediType: "" });
      setIsEditMode(false);
    }
    setModalOpen(true);
  };

  const handleCloseModal = async (refreshList) => {
    setModalOpen(false);
    setCurrentMedicineType({ mediType: "" });
    if (refreshList) {
      await fetchMedicineTypes();
    }
  };

  const handleSaveMedicineType = async (medicineTypeToSave) => {
    try {
      if (isEditMode) {
        await editMedicineType(medicineTypeToSave._id, { mediType: medicineTypeToSave.mediType });
      } else {
        await addMedicineType({ mediType: medicineTypeToSave.mediType });
      }
      handleCloseModal(true); // Close modal and refresh list
    } catch (error) {
      console.error("Error saving medicine type:", error);
    }
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#004d40" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>S.no</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Medicine Type Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicineTypes.map((medicineType, index) => (
              <TableRow key={medicineType._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{medicineType.mediType}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(medicineType)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteMedicineType(medicineType._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenModal()}
        sx={{ mt: 2 }}
      >
        Add Medicine Type
      </Button> */}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)} // Close modal on cancel
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddMedicineTypeModal
            onClose={handleCloseModal}
            initialCategory={currentMedicineType}
            isEditMode={isEditMode}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default MedicinTypeTable;

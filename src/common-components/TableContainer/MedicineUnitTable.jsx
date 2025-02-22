// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Box,
//   Modal,
//   Button,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import { getAllUnits, deleteUnit, editUnit } from "../../unitapi";
// import AddUnitsModal from "../Modals/medicineModals/addMedicineModals/AddUnitsModal";

// const MedicineUnitTable = () => {
//   const [units, setUnits] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [currentUnit, setCurrentUnit] = useState({});
//   const [modalMode, setModalMode] = useState("add"); // State to manage modal mode (add or edit)

 

//   const fetchUnits = async () => {
//     try {
//       const response = await getAllUnits();
//       console.log("Fetched units:", response.data); // Log the fetched units
//       if (Array.isArray(response.data)) {
//         setUnits(response.data);
//       } else {
//         console.error("Error: Fetched data is not an array");
//         setUnits([]); // Set to empty array to avoid errors
//       }
//     } catch (error) {
//       console.error("Error fetching units:", error);
//       setUnits([]); // Set to empty array to avoid errors
//     }
//   };
//   useEffect(() => {
//     fetchUnits();
//   }, [units]);
//   const handleDeleteUnit = async (id) => {
//     try {
//       await deleteUnit(id);
//       const updatedUnits = units.filter((unit) => unit._id !== id);
//       setUnits(updatedUnits);
//       console.log("Unit deleted successfully with ID:", id);
//     } catch (error) {
//       console.error("Error deleting unit:", error);
//     }
//   };

//   const handleEditUnit = (unit) => {
//     setCurrentUnit(unit);
//     setModalMode("edit"); // Set modal mode to edit
//     setEditModalOpen(true);
//   };

//   const handleSaveUnit = async (updatedUnit) => {
//     try {
//       await editUnit(updatedUnit._id, updatedUnit);
//       const updatedUnits = units.map((unit) =>
//         unit._id === updatedUnit._id ? updatedUnit : unit
//       );
//       setUnits(updatedUnits);
//       setEditModalOpen(false);
//       console.log("Unit edited successfully with ID:", updatedUnit._id);
//     } catch (error) {
//       console.error("Error editing unit:", error);
//     }
//   };

//   const handleAddUnit = async (newUnitData) => {
//     try {
//       const response = await addUnit(newUnitData);
//       const updatedUnits = [...units, response.data];
//       setUnits(updatedUnits);
//       console.log("Unit added successfully:", response.data);
//       setEditModalOpen(false);
//     } catch (error) {
//       console.error("Error adding unit:", error);
//     }
//   };

//   return (
//     <Box sx={{ overflowX: "auto" }}>
//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ bgcolor: "#004d40" }}>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>S.no</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Unit Name</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {units.map((unit, index) => (
//               <TableRow key={unit._id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{unit.name}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEditUnit(unit)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDeleteUnit(unit._id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', width: 550, marginTop:"140px" , borderRadius:"2%", border:"none", }}>
//           <AddUnitsModal
//             unitData={currentUnit} // Pass currentUnit data to AddUnitsModal for editing
//             onSave={handleSaveUnit} // Always pass handleSaveUnit for both editing and adding
//             onClose={() => setEditModalOpen(false)} // Close modal handler
//           /> 
//          </Box>
//       </Modal>
//     </Box> 
//   );
// };

// export default MedicineUnitTable;
// 
import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import { getAllUnits, deleteUnit } from "../../unitapi";
import EditButton from "../ButtonContainer/EditButton";
import DeleteButton from "../ButtonContainer/DeleteButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePaginations from "../TablePagination/TablePaginations";

const MedicineUnitTable = ({ onEditUnit }) => {
    const [units, setUnits] = useState([]);

    useEffect(() => {
        fetchUnits();
    }, [units]);

    const fetchUnits = async () => {
        try {
            const response = await getAllUnits();
            if (Array.isArray(response.data)) {
                setUnits(response.data);
            } else {
                console.error("Error: Fetched data is not an array");
                setUnits([]);
            }
        } catch (error) {
            console.error("Error fetching units:", error);
            setUnits([]);
        }
    };

    const handleDeleteUnit = async (id) => {
        try {
            await deleteUnit(id);
            const updatedUnits = units.filter((unit) => unit._id !== id);
            setUnits(updatedUnits);
        } catch (error) {
            console.error("Error deleting unit:", error);
        }
    };

    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                        {units.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((unit, index) => (
                            <TableRow key={unit._id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{unit.name}</TableCell>
                                <TableCell>
                                    <EditButton
                                        label={"edit"}
                                        icon={EditIcon}
                                        sx={{ mr: 1, color: "#1976d2" }}
                                        onClick={() => onEditUnit(unit)}
                                    />
                                    <DeleteButton
                                        label={"delete"}
                                        icon={DeleteIcon}
                                        sx={{ mr: 1, color: "red" }}
                                        onClick={() => handleDeleteUnit(unit._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePaginations
        count={units.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </Box>
    );
};

export default MedicineUnitTable;

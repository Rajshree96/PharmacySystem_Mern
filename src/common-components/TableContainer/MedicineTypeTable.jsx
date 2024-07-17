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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getAllMedicineTypes, deleteMedicineType } from "../../medicineTypeapi";
import EditButton from "../ButtonContainer/EditButton";
import DeleteButton from "../ButtonContainer/DeleteButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MedicineTypeTable = ({ onEditMedicineType }) => {
    const [medicineTypes, setMedicineTypes] = useState([]);

    useEffect(() => {
        fetchMedicineTypes();
    }, [medicineTypes]);

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
                                    <EditButton
                                        label={"edit"}
                                        icon={EditIcon}
                                        sx={{ mr: 1, color: "#1976d2" }}
                                        onClick={() => onEditMedicineType(medicineType)}
                                    />
                                    <DeleteButton
                                        label={"delete"}
                                        icon={DeleteIcon}
                                        sx={{ mr: 1, color: "red" }}
                                        onClick={() => handleDeleteMedicineType(medicineType._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MedicineTypeTable;

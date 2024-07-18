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
import TablePaginations from "../TablePagination/TablePaginations";

const MedicineTypeTable = ({ onEditMedicineType }) => {
    const [medicineTypes, setMedicineTypes] = useState([]);
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
                        {medicineTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((medicineType, index) => (
                            <TableRow key={medicineType._id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
            <TablePaginations
        count={medicineTypes.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     
        </Box>
    );
};

export default MedicineTypeTable;

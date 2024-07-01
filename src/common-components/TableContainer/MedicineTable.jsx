import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from "@mui/material";
import {Edit, Delete} from "@mui/icons-material";
const MedicineTable = () => {
    return (
        <>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{bgcolor: "#004d40"}}>
                            <TableCell sx={{color: "#fff", fontWeight: "bold"}}>S.no</TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold"}}>Category Name</TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Syrup</TableCell>
                            <TableCell>
                                <IconButton color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Tablet</TableCell>
                            <TableCell>
                                <IconButton color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default MedicineTable;

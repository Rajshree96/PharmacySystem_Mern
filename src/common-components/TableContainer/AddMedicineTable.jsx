import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box} from "@mui/material";
import {Edit, Delete, Visibility} from "@mui/icons-material";
import EditButton from "../ButtonContainer/EditButton";
import DeleteButton from "../ButtonContainer/DeleteButton";
import ViewButton from "../ButtonContainer/ViewButton";

const AddMedicineTable = () => {
    return (
        <Box sx={{overflowX: "auto"}}>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{bgcolor: "#004d40"}}>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>
                                Item Code
                            </TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>
                                Medicine Name
                            </TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>
                                Batch No.
                            </TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>
                                Expiry Date
                            </TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>
                                Category
                            </TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>
                                Medicine type
                            </TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>Brand</TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>Unit</TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>
                                Net Weight
                            </TableCell>
                            <TableCell sx={{color: "#fff", fontWeight: "bold", whiteSpace: "nowrap"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Syrup</TableCell>
                            <TableCell>101</TableCell>
                            <TableCell>02-04-2024</TableCell>
                            <TableCell>Syrup</TableCell>
                            <TableCell>Syrup</TableCell>
                            <TableCell>Syrup</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>
                                <ViewButton
                                    icon={Visibility}
                                    label={"View"}
                                    onClick={() => handleViewClick(1)}
                                    sx={{
                                        color: "green",
                                        "&:hover": {color: "darkgreen"},
                                        transition: "all 0.3s",
                                    }}
                                />

                                <EditButton
                                    icon={Edit}
                                    label={"Edit"}
                                    onClick={() => handleEditClick(1)}
                                    sx={{
                                        color: "blue",
                                        "&:hover": {color: "darkblue"},
                                        transition: "all 0.3s",
                                    }}
                                />
                                <DeleteButton
                                    icon={Delete}
                                    label={"Delete"}
                                    onClick={() => handleDeleteClick(1)}
                                    sx={{
                                        color: "red",
                                        "&:hover": {color: "darkred"},
                                        transition: "all 0.3s",
                                    }}
                                />
                            </TableCell>
                        </TableRow>

                        {/* Add more rows as needed */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AddMedicineTable;

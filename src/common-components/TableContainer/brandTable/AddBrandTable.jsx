import React, {useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {makeStyles} from "@mui/styles";
import EditButton from "../../ButtonContainer/EditButton";
import DeleteButton from "../../ButtonContainer/DeleteButton";

const useStyles = makeStyles((theme) => ({
   
    tableContainer: {
        marginTop: theme.spacing(3),
        maxHeight: 440,
    },
    tableHeaderCell: {
        fontWeight: "bold",
        color: "white !important",
    },
}));

const AddBrandTable = () => {
    const classes = useStyles();

    const [ rows, setRows ] = useState([
        {id: 1, brandName: "Brand A", manufacturer: "Manufacturer A"},
        {id: 2, brandName: "Brand B", manufacturer: "Manufacturer B"},
        // Add more rows as needed
    ]);

    const handleEdit = (id) => {
        // Handle edit logic
        console.log(`Edit row with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Handle delete logic
        console.log(`Delete row with id: ${id}`);
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
                <TableHead >
                    <TableRow className="table-design" >
                        <TableCell className={classes.tableHeaderCell}>Brand Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Manufacturer</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.brandName}</TableCell>
                            <TableCell>{row.manufacturer}</TableCell>
                            <TableCell>
                                <EditButton label={"edit"}  icon={EditIcon} sx={{mr: 1, color: "#1976d2"}} onClick={() => handleEdit(row.id)}/>
                                <DeleteButton label={"delete"} icon={DeleteIcon} sx={{mr: 1, color: "red  "}} onClick={() => handleDelete(row.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AddBrandTable;

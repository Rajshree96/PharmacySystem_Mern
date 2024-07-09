import React, {useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        marginTop: theme.spacing(3),
        maxHeight: 440,
    },
    tableHeaderCell: {
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
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
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
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
                                <IconButton onClick={() => handleEdit(row.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AddBrandTable;

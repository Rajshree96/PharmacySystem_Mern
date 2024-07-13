import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {makeStyles} from "@mui/styles";
import EditButton from "../../ButtonContainer/EditButton";
import DeleteButton from "../../ButtonContainer/DeleteButton";
import { deleteBrand, editBrand, getAllBrand } from "../../../brandApi";
import AddBrandModal from "../../Modals/brandModals/AddBrandModal";
import { Navigate } from "react-router-dom";
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

     const [ rows, setRows ] = useState([]);
     const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand for editing
    //  const navigate = Navigate();
     useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await getAllBrand();
                setRows(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);

            }
        }
        fetchData();
     },[rows]);
     

    const handleEdit = (id) => {
        // Handle edit logic
        const selected = rows.find((row) => row._id === id);
        setSelectedBrand(selected); 
        // navigate('/edit');
        console.log(`Edit row with id: ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Handle delete logic
            await deleteBrand(id);
            setRows((prevRows) => prevRows.filter((row) => row._id !== id)); // Update state after delete
            console.log(`Delete row with id: ${id}`);
        } catch (error) {
            console.error("Error deleting brand:", error);
        }
    };

    const handleEditBrand = async (brandData) => {
        try {
            const updatedBrand = await editBrand(brandData._id, brandData);
            // Update rows state or handle UI update after successful edit
            console.log("Brand edited successfully:", updatedBrand);
        } catch (error) {
            console.error("Error editing brand:", error);
            // Handle error state or UI feedback
        }
    };

    return (
        <>
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
                        <TableRow key={row._id}>
                            <TableCell>{row.brand}</TableCell>
                            <TableCell>{row.manufactureId}</TableCell>
                            <TableCell>
                                <EditButton label={"edit"}  icon={EditIcon} sx={{mr: 1, color: "#1976d2"}} onClick={() => handleEdit(row._id)}/>
                                <DeleteButton label={"delete"} icon={DeleteIcon} sx={{mr: 1, color: "red  "}} onClick={() => handleDelete(row._id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {/* {selectedBrand && (
        
            <AddBrandModal
                isOpen={true} // Example: Assuming you have a prop to control modal visibility
                brandData={selectedBrand} // Pass selectedBrand data to AddBrandModal
                editBrand={handleEditBrand} // Pass editBrand function to handle edit operation
            /> */}
        {/* )} */}
        </>
    );
};

export default AddBrandTable;

import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import {makeStyles} from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditButton from "../../ButtonContainer/EditButton";
import DeleteButton from "../../ButtonContainer/DeleteButton";
import {deleteBrand, getAllBrand} from "../../../brandApi";
import TablePaginations from "../../TablePagination/TablePaginations";

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

const AddBrandTable = ({onEditBrand}) => {
    const classes = useStyles();
    const [ rows, setRows ] = useState([]);
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
        const fetchData = async () => {
            try {
                const response = await getAllBrand();
                setRows(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchData();
    }, [ rows ]);

    const handleDelete = async (id) => {
        try {
            await deleteBrand(id);
            setRows((prevRows) => prevRows.filter((row) => row._id !== id)); // Update state after delete
        } catch (error) {
            console.error("Error deleting brand:", error);
        }
    };

    return (
        <>
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow className="table-design">
                        <TableCell className={classes.tableHeaderCell}>Brand Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Manufacturer</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.brand}</TableCell>
                            <TableCell>{row.manufactureId}</TableCell>
                            <TableCell>
                                <EditButton
                                    label={"edit"}
                                    icon={EditIcon}
                                    sx={{mr: 1, color: "#1976d2"}}
                                    onClick={() => onEditBrand(row)}
                                />
                                <DeleteButton
                                    label={"delete"}
                                    icon={DeleteIcon}
                                    sx={{mr: 1, color: "red"}}
                                    onClick={() => handleDelete(row._id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePaginations
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
</>
    );
};

export default AddBrandTable;

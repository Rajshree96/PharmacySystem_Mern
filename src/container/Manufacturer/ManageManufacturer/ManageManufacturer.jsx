import React, {useState} from "react";
import {
    Container,
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Tooltip,
    Divider,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    tableCellClasses,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import ViewButton from "../../../common-components/ButtonContainer/ViewButton";
import {Edit, Delete, Visibility} from "@mui/icons-material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import {useEffect} from "react";
import axios from "axios";
import EditButton from "../../../common-components/ButtonContainer/EditButton";
import DeleteButton from "../../../common-components/ButtonContainer/DeleteButton";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import AllManufacturerModal from "../../../common-components/Modals/manufaturerModals/AllManufacturerModal";
const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#086070",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        // backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const ManageManufacturer = () => {
    const [ modalType, setModalType ] = useState("");
    const [ manufacturer, setmanufacturer ] = useState([]);
    const [ selectedManufacturer, setSelectedManufacturer ] = useState(null);

    // breadcrumb
    const breadcrumbs = [ "Manufacturer", "Manage Manufacturer" ];
    const [ editingManufacturer, setEditingManufacturer ] = useState(null);
    const [ openEditDialog, setOpenEditDialog ] = useState(false);

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    const handleOpenModal = (type, manufacturer = null) => {
        setModalType(type);
        setSelectedManufacturer(manufacturer);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedManufacturer(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchManufacturer = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            if (!auth || !auth.token) {
                console.error("No token found in local storage");
                return;
            }
            const response = await axios.get("http://localhost:4000/api/v1/admin/getAllManufacturer", {
                headers: {Authorization: `Bearer ${auth.token}`},
            });
            console.log("API Response:", response.data.result);

            if (Array.isArray(response.data.result)) {
                setmanufacturer(response.data.result);
            }
            else {
                console.error("API response does not contain manufacturer array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching manufacturer:", error);
        }
    };

    useEffect(() => {
        fetchManufacturer();
    }, []);

    const handleDeleteClick = async (_id) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth || !auth.token) {
            console.error("No token found in local storage");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/admin/delete/manufacturer/${_id}`, {
                headers: {Authorization: `Bearer ${auth.token}`},
            });
            console.log("API Response:", response);

            if (response.data.status === "ok" || response.status === 200) {
                console.log("Deleted manufacturer with _id code:", _id);
                fetchManufacturer();
            }
            else {
                console.error("Failed to delete manufacturer:", response.data);
            }
        } catch (error) {
            console.error("Error deleting manufacturer:", error);
        }
    };

    const handleEditClick = (medicine) => {
        setEditingMedicine(medicine);
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setEditingMedicine(null);
    };

    const handleEditSave = async () => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth || !auth.token) {
            console.error("No token found in local storage");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:4000/api/v1/admin/medicine/${editingMedicine.itemCode}`,
                editingMedicine,
                {
                    headers: {Authorization: `Bearer ${auth.token}`},
                }
            );
            console.log("Medicine updated:", response.data);
            setMedicines((prevMedicines) =>
                prevMedicines.map((med) => (med.itemCode === editingMedicine.itemCode ? editingMedicine : med))
            );
            handleEditDialogClose();
        } catch (error) {
            console.error("Error updating medicine:", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Box>
                <Paper elevation={3} sx={{p: 2}}>
                    <Typography variant="h4" gutterBottom>
                        Manufacturer
                    </Typography>
                    <BreadcrumbContainer breadcrumbs={breadcrumbs} />
                    <Divider sx={{my: 2}} />
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>S.no</StyledTableCell>
                                    <StyledTableCell>Manufacturer Name</StyledTableCell>
                                    <StyledTableCell>Address</StyledTableCell>
                                    <StyledTableCell>State</StyledTableCell>
                                    <StyledTableCell>Contact Number</StyledTableCell>
                                    <StyledTableCell>Registration Type</StyledTableCell>
                                    <StyledTableCell>GSTIN</StyledTableCell>
                                    <StyledTableCell>Opening Balance</StyledTableCell>
                                    <StyledTableCell>Account Number</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {manufacturer
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((manufacturer, index) => (
                                    <StyledTableRow key={manufacturer._id}>
                                        <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {manufacturer.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{manufacturer.address}</StyledTableCell>
                                        <StyledTableCell>{manufacturer.state}</StyledTableCell>
                                        <StyledTableCell>{manufacturer.contact}</StyledTableCell>
                                        <StyledTableCell>
                                            {manufacturer.statutoryDetails.registrationType}
                                        </StyledTableCell>
                                        <StyledTableCell>{manufacturer.statutoryDetails.gstin}</StyledTableCell>
                                        <StyledTableCell>
                                            {manufacturer.openingBalance.asOnFirstDayOfFinancialYear}
                                        </StyledTableCell>
                                        <StyledTableCell>{manufacturer.bankingDetails.accountNumber}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box style={{display: "flex", justifyContent: "center"}}>
                                                <ViewButton
                                                    sx={{mr: 1, color: "green  "}}
                                                    label="View"
                                                    icon={Visibility}
                                                />
                                                <EditButton
                                                    sx={{mr: 1, color: "#1976d2"}}
                                                    label="edit"
                                                    icon={Edit}
                                                    onClick={() => handleOpenModal("edit manufacturer", manufacturer)} // Pass the manufacturer object as a prop
                                                />
                                                <DeleteButton
                                                    sx={{mr: 1, color: "red  "}}
                                                    label="delete"
                                                    icon={Delete}
                                                    onClick={() => handleDeleteClick(suppliers._id)}
                                                />
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePaginations
                        count={manufacturer.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            {/* Modal */}
            <AllManufacturerModal
                open={!!modalType}
                handleClose={handleCloseModal}
                formType={modalType}
                selectedData={selectedManufacturer}
                style={{ width: "80%", maxWidth: "60%" }}  // Adjust the width of the modal as needed
            />
        </Container>
    );
};

export default ManageManufacturer;

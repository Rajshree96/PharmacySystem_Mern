import React, {useEffect, useState} from "react";
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
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import ViewButton from "../../../common-components/ButtonContainer/ViewButton";
import {Edit, Delete, Visibility} from "@mui/icons-material";
import EditButton from "../../../common-components/ButtonContainer/EditButton";
import DeleteButton from "../../../common-components/ButtonContainer/DeleteButton";
import axios from "axios";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import AllCustomerModal from "../../../common-components/Modals/customerModals/AllCustomerModal";

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

const ManageCustomer = () => {
    const [ modalType, setModalType ] = useState("");
    const [ customers, setCustomers ] = useState([]);
    const [ selectedCustomer, setSelectedCustomer ] = useState(null);
    const breadcrumbs = [ "Customer", "Manage Customer" ];

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    // modal handler function to open and close
    const handleOpenModal = (type, customer = null) => {
        setModalType(type);
        setSelectedCustomer(customer);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedCustomer(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchCustomer = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            if (!auth || !auth.token) {
                console.error("No token found in local storage");
                return;
            }
            const response = await axios.get("http://localhost:4000/api/v1/cutomer/getall", {
                headers: {Authorization: `Bearer ${auth.token}`},
            });
            console.log("API Response:", response.data);

            if (Array.isArray(response.data)) {
                setCustomers(response.data);
            }
            else {
                console.error("API response does not contain cutomer array:", response.data.result);
            }
        } catch (error) {
            console.error("Error fetching manufacturer:", error);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    const handleDeleteClick = async (_id) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth || !auth.token) {
            console.error("No token found in local storage");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/cutomer/delete/${_id}`, {
                headers: {Authorization: `Bearer ${auth.token}`},
            });
            console.log("API Response:", response);

            if (response.data.status === "ok" || response.status === 200) {
                console.log("Deleted customer with _id code:", _id);
                fetchCustomer();
            }
            else {
                console.error("Failed to delete customer:", response.data);
            }
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Box>
                <Paper elevation={3} sx={{p: 2}}>
                    <Typography variant="h4" gutterBottom>
                        Customer
                    </Typography>
                    <BreadcrumbContainer breadcrumbs={breadcrumbs} />
                    <Divider sx={{my: 2}} />
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>S.no</StyledTableCell>
                                    <StyledTableCell>Customer Name</StyledTableCell>
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
                                {customers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((customers, index) => (
                                    <StyledTableRow key={customers._id}>
                                        <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {customers.customerDetails.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{customers.customerDetails.address}</StyledTableCell>
                                        <StyledTableCell>{customers.customerDetails.state}</StyledTableCell>
                                        <StyledTableCell>{customers.customerDetails.contact}</StyledTableCell>
                                        <StyledTableCell>
                                            {customers.customerDetails.statutoryDetails.stateRegistrationType}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {customers.customerDetails.statutoryDetails.gstin}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {customers.customerDetails.openingBalance.asOnFirstDayOfFinancialYear}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {customers.customerDetails.bankDetails.accountNumber}
                                        </StyledTableCell>
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
                                                    onClick={() => handleOpenModal("edit customer", customers)} // Pass the customer object as a prop
                                                />
                                                <DeleteButton
                                                    sx={{mr: 1, color: "red  "}}
                                                    label="delete"
                                                    icon={Delete}
                                                    onClick={() => handleDeleteClick(customers._id)}
                                                />
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePaginations
                        count={customers.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            {/* Modal */}
            <AllCustomerModal
                open={!!modalType}
                handleClose={handleCloseModal}
                formType={modalType}
                selectedData={selectedCustomer}
                style={{width: "80%", maxWidth: "60%"}} // Adjust the width of the modal as needed
            />
        </Container>
    );
};

export default ManageCustomer;

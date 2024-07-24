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
import AllPurchaseModal from "../../../common-components/Modals/PurchaseModal/AllPurchaseModal";

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

const ManagePurchaseInvoice = () => {
    const [ modalType, setModalType ] = useState("");
    const [ selectedPurchaseInvoice, setSelectedPurchaseInvoice ] = useState(null);

    const [purchaseInvoiceData, setPurchaseInvoiceData] = useState([]);
    const breadcrumbs = [ "Purchase", "Manage Purchase Invoice" ];

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    const handleOpenModal = (type, purchaseinvoice = null) => {
        setModalType(type);
        setSelectedPurchaseInvoice(purchaseinvoice);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedPurchaseInvoice(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchPurchaseInvoiceList = async () => {
        try {
          const auth = JSON.parse(localStorage.getItem('auth'));
          if (!auth || !auth.token) {
            console.error("No token found in local storage");
            return;
          }
          const response = await axios.get("http://localhost:4000/api/v1/purchase-invoice/getall",
            {
              headers: { Authorization: `Bearer ${auth.token}` }
            }
          );
          console.log("API Response:", response.data);
    
          if (Array.isArray(response.data)) {
            setPurchaseInvoiceData(response.data);
          } else {
            console.error("API response does not contain purchase array:", response.data.result);
          }
        } catch (error) {
          console.error("Error fetching purchase list:", error);
        }
      };
    
      useEffect(() => {
        fetchPurchaseInvoiceList();
    
      }, []);
    // console.log("customer data",customers);

    const handleDeleteClick = async (_id) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth || !auth.token) {
            console.error("No token found in local storage");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/purchase-invoice/delete/${_id}`, {
                headers: {Authorization: `Bearer ${auth.token}`},
            });
            console.log("API Response:", response);

            if (response.data.status === "ok" || response.status === 200) {
                console.log("Deleted invoice with _id code:", _id);
                fetchPurchaseInvoiceList();
            }
            else {
                console.error("Failed to delete INVoice:", response.data);
            }
        } catch (error) {
            console.error("Error deleting INVoice:", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Box>
                <Paper elevation={3} sx={{p: 2}}>
                    <Typography variant="h4" gutterBottom>
                        Purchase
                    </Typography>
                    <BreadcrumbContainer breadcrumbs={breadcrumbs} />
                    <Divider sx={{my: 2}} />
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>S no.</StyledTableCell>
                                    <StyledTableCell>Date</StyledTableCell>
                                    <StyledTableCell>Invoice No.</StyledTableCell>
                                    <StyledTableCell>Order No.</StyledTableCell>
                                    <StyledTableCell>Supplier Name</StyledTableCell>
                                    <StyledTableCell>Place of Supply</StyledTableCell>
                                    <StyledTableCell>Due Date</StyledTableCell>
                                    <StyledTableCell>Payment Status</StyledTableCell>
                                    <StyledTableCell>
                                        <Typography sx={{display: "flex", justifyContent: "center"}}>Action</Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* console.log(customers) */}
                                {purchaseInvoiceData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((purchaseInvoiceData, index) => (
                                    <StyledTableRow key={purchaseInvoiceData._id}>
                                        <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {purchaseInvoiceData.date}
                                        </StyledTableCell>
                                        <StyledTableCell>{purchaseInvoiceData.invoiceNo}</StyledTableCell>
                                        <StyledTableCell>{purchaseInvoiceData.orderNo}</StyledTableCell>
                                        <StyledTableCell>{purchaseInvoiceData.supplierName}</StyledTableCell>
                                        <StyledTableCell>{purchaseInvoiceData.placeOfSupply}</StyledTableCell>
                                        <StyledTableCell>{purchaseInvoiceData.dueDate}</StyledTableCell>
                                        <StyledTableCell>{purchaseInvoiceData.paymentStatus}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box style={{display: "flex", justifyContent: "center"}}>
                                                <ViewButton
                                                    sx={{mr: 1, color: "green  "}}
                                                    label="View"
                                                    icon={Visibility}
                                                />
                                                <EditButton
                                                 sx={{mr: 1, color: "#1976d2"}} label="edit"
                                                  icon={Edit} 
                                                  onClick={() => handleOpenModal("edit purchaseinvoice", purchaseInvoiceData)} // Pass the supplier object as a prop
                                                  />
                                                <DeleteButton
                                                    sx={{mr: 1, color: "red  "}}
                                                    label="delete"
                                                    icon={Delete}
                                                    onClick={() => handleDeleteClick(purchaseInvoiceData._id)}
                                                />
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePaginations
                        count={purchaseInvoiceData.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

            {/* Modal */}
            <AllPurchaseModal
            open={!!modalType}
            handleClose={handleCloseModal}
            formType={modalType}
            selectedData={selectedPurchaseInvoice}
            style={{ width: "80%", maxWidth: "60%" }}  // Adjust the width of the modal as needed
            />
        </Container>
    );
};

export default ManagePurchaseInvoice;

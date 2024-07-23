import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import ViewButton from "../../../common-components/ButtonContainer/ViewButton";
import EditButton from "../../../common-components/ButtonContainer/EditButton";
import DeleteButton from "../../../common-components/ButtonContainer/DeleteButton";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import AllSalesModal from "../../../common-components/Modals/saleModals/AllSalesModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#086070",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ManageSalesInvoice = () => {
  const [ modalType, setModalType ] = useState("");
  const [ selectedSaleInvoice, setSelectedSaleInvoice ] = useState(null);

  const [invoice, setInvoice] = useState([]);
  const breadcrumbs = ["Sales", "Manage Sales Invoice"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // modal handler function to open and close
  const handleOpenModal = (type, salesinvoice = null) => {
    setModalType(type);
    setSelectedSaleInvoice(salesinvoice);
};

const handleCloseModal = () => {
    setModalType("");
    setSelectedSaleInvoice(null);
};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchSales = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (!auth || !auth.token) {
        console.error("No token found in local storage");
        return;
      }
      const response = await axios.get("http://localhost:4000/api/v1/salesinvoice/getAll", {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setInvoice(response.data);
      } else {
        console.error("API response does not contain invoice array:", response.data.result);
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);


  const handleDeleteClick = async (_id) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/salesinvoice/delete/${_id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log("API Response:", response);
  
      if (response.data.status === "ok" || response.status === 200) {
        console.log("Deleted invoice with _id:", _id);
        fetchSales();  // Refresh the data
      } else {
        console.error("Failed to delete invoice:", response.data);
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };
  

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Sales
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Divider sx={{ my: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell>S No</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Invoice No.</StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Place of Supply</StyledTableCell>
                  <StyledTableCell>Due Date</StyledTableCell>
                  <StyledTableCell>Total Value</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice, index) => (
                  <StyledTableRow key={invoice._id}>
                                        <StyledTableCell>                        {page * rowsPerPage + index + 1}
                                        </StyledTableCell>
                    <StyledTableCell>{invoice.date}</StyledTableCell>
                    <StyledTableCell>{invoice.invoiceNo}</StyledTableCell>
                    <StyledTableCell>{invoice.customerName}</StyledTableCell>
                    <StyledTableCell>{invoice.placeOfSupply}</StyledTableCell>
                    <StyledTableCell>{invoice.dueDate}</StyledTableCell>
                    <StyledTableCell>{invoice.purchaseTable[0].totalValue}</StyledTableCell>
                    <StyledTableCell>
                      <Box style={{ display: "flex", justifyContent: "center" }}>
                        <ViewButton
                          sx={{ mr: 1, color: "green" }}
                          label="View"
                          icon={Visibility}
                        />
                        <EditButton
                          sx={{ mr: 1, color: "#1976d2" }}
                          label="Edit"
                          icon={Edit}
                          onClick={() => handleOpenModal("edit salesinvoice", invoice)} // Pass the managebanktransaction object as a prop
                        />
                        <DeleteButton
                          sx={{ mr: 1, color: "red" }}
                          label="Delete"
                          icon={Delete}
                           onClick={() => handleDeleteClick(invoice._id)}
                        />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginations
            count={invoice.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {/* Modal */}
      <AllSalesModal
       open={!!modalType}
       handleClose={handleCloseModal}
       formType={modalType}
       selectedData={selectedSaleInvoice}
       style={{ width: "80%", maxWidth: "60%" }}  // Adjust the width of the modal as needed
      />      
    </Container>
  );
};

export default ManageSalesInvoice;

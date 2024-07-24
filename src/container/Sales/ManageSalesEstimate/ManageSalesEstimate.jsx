import React, { useEffect, useRef, useState } from "react";
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
import { styled } from "@mui/material/styles";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import ViewButton from "../../../common-components/ButtonContainer/ViewButton";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import EditButton from "../../../common-components/ButtonContainer/EditButton";
import DeleteButton from "../../../common-components/ButtonContainer/DeleteButton";
import axios from "axios";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import AllSalesModal from "../../../common-components/Modals/saleModals/AllSalesModal";
import { useReactToPrint } from "react-to-print";

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

const ManageSalesEstimate = () => {

  const [ modalType, setModalType ] = useState("");
  const [ selectedSaleEstimate, setSelectedSaleEstimate ] = useState(null);
  

  const [saleEstimate, setSaleEstimate] = useState([]);
  const breadcrumbs = ["Sales", "Manage Sales Estimate"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // modal handler function to open and close
  const handleOpenModal = (type, salesestimate = null) => {
    setModalType(type);
    setSelectedSaleEstimate(salesestimate);
};

const handleCloseModal = () => {
    setModalType("");
    setSelectedSaleEstimate(null);
};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchSalesEstimate = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }
      const response = await axios.get("http://localhost:4000/api/v1/sales/getall",
        {
          headers: { Authorization: `Bearer ${auth.token}`}
         }
      );
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setSaleEstimate(response.data);
      } else {
        console.error("API response does not contain saleEstimate array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching salesEstimate:", error);
    }
  };

  useEffect(() => {
    fetchSalesEstimate();
    
  }, []);
  // console.log("customer data",);

  const handleDeleteClick = async (_id) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/sales/delete/${_id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log("API Response:", response);

      if (response.data.status === "ok" || response.status === 200) {
        console.log("Deleted customer with _id code:", _id);
        fetchSalesEstimate();
      } else {
        console.error("Failed to delete customer:", response.data);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
    
  };

  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const resumeRef = useRef();

  const handlePrintClick = (id) => {
    const estimate = saleEstimate.find(item => item._id === id);
    setSelectedEstimate(estimate);
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `salesEstimate_${selectedEstimate ? selectedEstimate._id : ''}`,
  });


  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} ref={resumeRef}>
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
                <StyledTableCell align="center">S No</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Estimate No.</StyledTableCell>
                  <StyledTableCell align="center">Customer Name</StyledTableCell>
                  <StyledTableCell align="center">Place of Supply</StyledTableCell>
                  <StyledTableCell align="center">Due Date</StyledTableCell>
                  <StyledTableCell align="center">Total Value</StyledTableCell>
                  <StyledTableCell align="center">
                  <Typography sx={{ display: "flex", justifyContent: "center" }}>Action</Typography>                    
                    </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* console.log(customers) */}
              {saleEstimate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((saleEstimate,index) => (
                  <StyledTableRow key={saleEstimate._id}>
                    <StyledTableCell align="center">{page * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {saleEstimate.date}
                    </StyledTableCell>
                    <StyledTableCell align="center">{saleEstimate.estimateNo}</StyledTableCell>
                    <StyledTableCell align="center">{saleEstimate.customerName}</StyledTableCell>
                    <StyledTableCell align="center">{saleEstimate.placeOfSupply}</StyledTableCell>
                    <StyledTableCell align="center">{saleEstimate.dueDate}</StyledTableCell>
                    <StyledTableCell align="center">{saleEstimate.purchaseTable[0].totalValue}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        style={{ display: "flex", justifyContent: "space-between",gap:"2px" }}
                      >
                        <ViewButton
                          sx={{ mr: 1, color: "green  " }}
                          label="View"
                          icon={Visibility}
                        />
                         <EditButton
                          sx={{ mr: 1, color: "#1976d2" }}
                          label="edit"
                          icon={Edit}
                          onClick={() => handleOpenModal("edit salesestimate", saleEstimate)} // Pass the managebanktransaction object as a prop
                        />
                        <DeleteButton
                          sx={{ mr: 1, color: "red  " }}
                          label="delete"
                          icon={Delete}
                           onClick={() => handleDeleteClick(saleEstimate._id)}

                        />
                        <Button
                          className="btn-design-invoice"
                          sx={{ color: 'white', height: '2.3rem'}}
                          label="Invoice"
                          onClick={() => handleOpenModal("create salesinvoice", saleEstimate)} 
                        >
                          <Typography sx={{fontSize:'12px',width:'95px'}}>Sales Invoice</Typography>
                          
                        </Button>
                        <Button
                          className="btn-design-print"
                          sx={{ color: 'white', height: '2.3rem' }}
                          label="Print"
                          onClick={() => {
                            handlePrintClick(saleEstimate._id);
                            handlePrint();
                          }}
                        >
                          Print
                        </Button>                        
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
         
         <TablePaginations
        count={saleEstimate.length}
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
       selectedData={selectedSaleEstimate}
       style={{ width: "80%", maxWidth: "60%" }}  // Adjust the width of the modal as needed
      />           
    </Container>
  );
};

export default ManageSalesEstimate;
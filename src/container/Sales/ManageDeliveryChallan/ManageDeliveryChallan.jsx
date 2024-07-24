import React, { useEffect, useRef, useState } from "react";
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
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import ViewButton from "../../../common-components/ButtonContainer/ViewButton";
import EditButton from "../../../common-components/ButtonContainer/EditButton";
import DeleteButton from "../../../common-components/ButtonContainer/DeleteButton";
import axios from "axios";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import { Edit, Delete, Visibility } from "@mui/icons-material";
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

const ManageDeliveryChallan = () => {
  const [modalType, setModalType] = useState("");
  const [selectedSaleDeliveryChallan, setSelectedSaleDeliveryChallan] = useState(null);

  const [deliveryChallan, setDeliveryChallan] = useState([]);
  const breadcrumbs = ["Sales", "Manage Delivery Challan"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // modal handler function to open and close
  const handleOpenModal = (type, salesdeliverychalan = null) => {
    setModalType(type);
    setSelectedSaleDeliveryChallan(salesdeliverychalan);
  };

  const handleCloseModal = () => {
    setModalType("");
    setSelectedSaleDeliveryChallan(null);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchDeliveryChallan = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth || !auth.token) {
        console.error("No token found in local storage");
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/api/v1/deliveryChallan/getAll",
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      console.log("API Response:", response.data);

      if (Array.isArray(response.data.data)) {
        setDeliveryChallan(response.data.data);
      } else {
        console.error(
          "API response does not contain deliveryChallan array:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching deliveryChallan:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth || !auth.token) {
        console.error("No token found in local storage");
        return;
      }

      await axios.delete(`http://localhost:4000/api/v1/deliveryChallan/delete/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setDeliveryChallan(deliveryChallan.filter((delivery) => delivery._id !== id));
      console.log(`Deleted delivery challan with id: ${id}`);
    } catch (error) {
      console.error("Error deleting deliveryChallan:", error);
    }
  };

  useEffect(() => {
    fetchDeliveryChallan();
  }, []);

  const [selectedChallan, setSelectedChallan] = useState(null);
  const resumeRef = useRef();

  const handlePrintClick = (id) => {
    const estimate = deliveryChallan.find(item => item._id === id);
    setSelectedChallan(estimate);
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `salesEstimate_${selectedChallan ? selectedChallan._id : ''}`,
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
                  <StyledTableCell align="center">S NO.</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Challan No.</StyledTableCell>
                  <StyledTableCell align="center">Customer Name</StyledTableCell>
                  <StyledTableCell align="center">Place of Supply</StyledTableCell>
                  <StyledTableCell align="center">Due Date</StyledTableCell>
                  <StyledTableCell align="center">Total Value</StyledTableCell>
                  <StyledTableCell>
                    <Typography sx={{ display: "flex", justifyContent: "center" }}>Action</Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveryChallan
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((delivery, index) => (
                    <StyledTableRow key={delivery._id}>
                      <StyledTableCell align="center">
                        {page * rowsPerPage + index + 1}
                        {/* {delivery.date} */}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {delivery.date}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {delivery.deliveryChallanNo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {delivery.customerName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {delivery.placeOfSupply}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {delivery.dueDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">{delivery.purchaseTable[0].totalValue}</StyledTableCell>

                      <StyledTableCell>
                        <Box
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <ViewButton
                            sx={{ mr: 1, color: "green" }}
                            label="View"
                            icon={Visibility}
                          />
                          <EditButton
                            sx={{ mr: 1, color: "#1976d2" }}
                            label="edit"
                            icon={Edit}
                            onClick={() => handleOpenModal("edit salesdeliverychalan", deliveryChallan)} // Pass the deliveryChallan object as a prop
                          />
                          <DeleteButton
                            sx={{ mr: 1, color: "red" }}
                            label="delete"
                            icon={Delete}
                            onClick={() => handleDeleteClick(delivery._id)}
                          />
                          <Button
                            className="btn-design-print"
                            sx={{ color: 'white', height: '2.3rem' }}
                            label="Print"
                            onClick={() => {
                              handlePrintClick(delivery._id);
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
            count={deliveryChallan.length}
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
        selectedData={selectedSaleDeliveryChallan}
        style={{ width: "80%", maxWidth: "60%" }}  // Adjust the width of the modal as needed
      />
    </Container>
  );
};

export default ManageDeliveryChallan;

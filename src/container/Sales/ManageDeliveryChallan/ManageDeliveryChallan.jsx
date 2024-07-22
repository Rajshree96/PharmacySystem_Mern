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
import axios from "axios";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import { Edit, Delete, Visibility } from "@mui/icons-material";

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
  const [deliveryChallan, setDeliveryChallan] = useState([]);
  const breadcrumbs = ["Sales", "Manage Delivery Challan"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                <StyledTableCell>S NO.</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Challan No.</StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Place of Supply</StyledTableCell>
                  <StyledTableCell>Due Date</StyledTableCell>
                  <StyledTableCell>Total Value</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveryChallan
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((delivery, index) => (
                    <StyledTableRow key={delivery._id}>
                       <StyledTableCell>
                        {page * rowsPerPage + index + 1}
                        {/* {delivery.date} */}
                      </StyledTableCell>
                      <StyledTableCell>
                        {delivery.date}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {delivery.deliveryChallanNo}
                      </StyledTableCell>
                      <StyledTableCell>
                        {delivery.customerName}
                      </StyledTableCell>
                      <StyledTableCell>
                        {delivery.placeOfSupply}
                      </StyledTableCell>
                      <StyledTableCell>
                        {delivery.dueDate}
                      </StyledTableCell>
                      <StyledTableCell>{delivery.purchaseTable[0].totalValue}</StyledTableCell>
                    
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
                          />
                          <DeleteButton
                            sx={{ mr: 1, color: "red" }}
                            label="delete"
                            icon={Delete}
                             onClick={() => handleDeleteClick(delivery._id)}
                          />
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
    </Container>
  );
};

export default ManageDeliveryChallan;

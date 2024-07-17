import React, { useEffect, useState } from "react";
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


const ManageBankTransaction = () => {
  const [transaction, setTransaction] = useState([]);
  const breadcrumbs = ["Bank", "Manage Bank Transaction"];


  const fetchCustomer = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }
      const response = await axios.get("http://localhost:4000/api/v1/cutomer/getall",
        {
          headers: { Authorization: `Bearer ${auth.token}`}
         }
      );
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setTransaction(response.data);
      } else {
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
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/cutomer/delete/${_id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log("API Response:", response);

      if (response.data.status === "ok" || response.status === 200) {
        console.log("Deleted customer with _id code:", _id);
        fetchCustomer();
      } else {
        console.error("Failed to delete customer:", response.data);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
             Bank
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Divider sx={{ my: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead >
                <TableRow>
                  <StyledTableCell>S.no</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Transaction Type</StyledTableCell>
                  <StyledTableCell>Contra Number</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell sx={{textAlign:'center'}}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* console.log(customers) */}
              {transaction.map((transaction,index) => (
                  <StyledTableRow key={transaction._id}>
                    <StyledTableCell>{index+1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {transaction.date}
                    </StyledTableCell>
                    <StyledTableCell>{transaction.type}</StyledTableCell>
                    <StyledTableCell>{transaction.contraNumber}</StyledTableCell>
                    <StyledTableCell>{transaction.amount}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
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
                        />
                        <DeleteButton
                          sx={{ mr: 1, color: "red  " }}
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

         <TablePaginations count={transaction.length} />
        </Paper>
      </Box>
    </Container>
  );
};

export default ManageBankTransaction;
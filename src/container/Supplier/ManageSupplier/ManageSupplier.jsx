import React, { useState } from "react";
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
import { useEffect } from "react";
import axios from "axios";

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

// const createData = (name, calories, fat, carbs, protein) => {
//   return { name, calories, fat, carbs, protein };
// };

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const breadcrumbs = ["Supplier", "Manage Supplier"];

  const fetchSupplier = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }
      const response = await axios.get("http://localhost:4000/api/v1/admin/getAllSupplier",
        {
          headers: { Authorization: `Bearer ${auth.token}`}
         }
      );
      console.log("API Response:", response.data.result);

      if (Array.isArray(response.data.result)) {
        setSuppliers(response.data.result);
      } else {
        console.error("API response does not contain supplier array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching manufacturer:", error);
    }
  };

  useEffect(() => {
    fetchSupplier();
    
  }, []);

  const handleDeleteClick = async (_id) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/admin/delete/supplier/${_id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log("API Response:", response);

      if (response.data.status === "ok" || response.status === 200) {
        console.log("Deleted supplier with _id code:", _id);
        fetchSupplier();
      } else {
        console.error("Failed to delete supplier:", response.data);
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Manage Supplier
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Divider sx={{ my: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.no</StyledTableCell>
                  <StyledTableCell>Supplier Name</StyledTableCell>
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
                {suppliers.map((suppliers,index) => (
                  <StyledTableRow key={suppliers._id}>
                    <StyledTableCell>{index+1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {suppliers.name}
                    </StyledTableCell>
                    <StyledTableCell>{suppliers.address}</StyledTableCell>
                    <StyledTableCell>{suppliers.state}</StyledTableCell>
                    <StyledTableCell>{suppliers.contact}</StyledTableCell>
                    <StyledTableCell>{suppliers.statutoryDetails.registrationType}</StyledTableCell>
                    <StyledTableCell>{suppliers.statutoryDetails.gstin}</StyledTableCell>
                    <StyledTableCell>{suppliers.openingBalance.asOnFirstDayOfFinancialYear}</StyledTableCell>
                    <StyledTableCell>{suppliers.openingBalance.accountNumber}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ViewButton
                          sx={{ mr: 1, color: "green  " }}
                          label="View"
                          icon={Visibility}
                        />
                        <ViewButton
                          sx={{ mr: 1, color: "#1976d2" }}
                          label="edit"
                          icon={Edit}
                        />
                        <ViewButton
                          sx={{ mr: 1, color: "red  " }}
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
        </Paper>
      </Box>
    </Container>
  );
};

export default ManageSupplier;

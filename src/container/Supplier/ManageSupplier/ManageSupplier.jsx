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
} from "@mui/material";

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Manage Supplier
          </Typography>
          <Divider sx={{ my: 2 }} />          
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.no</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Registration Type</TableCell>
                <TableCell>GSTIN</TableCell>
                <TableCell>Opening Balance</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{supplier.supplierName}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.state}</TableCell>
                  <TableCell>{supplier.contactNumber}</TableCell>
                  <TableCell>{supplier.registrationType}</TableCell>
                  <TableCell>{supplier.gstin}</TableCell>
                  <TableCell>{supplier.openingBalance}</TableCell>
                  <TableCell>{supplier.accountNumber}</TableCell>
                  <TableCell>
                    <Button color="primary" size="small">
                      View
                    </Button>
                    <Button color="secondary" size="small">
                      Edit
                    </Button>
                    <Button color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
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

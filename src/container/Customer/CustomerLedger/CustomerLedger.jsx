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

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const CustomerLedger = () => {
  const [customers, setCustomers] = useState([]);
  const [CustomerName, setCustomerName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const breadcrumbs = ["Customer", " Customer Ledger"];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Customer
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Divider sx={{ my: 2 }} />          
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={6} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 , mt:1}}>
                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mr: 5 }}
                />
                <TextField
                  label="To Date"
                  type="date"
                  value={toDate}
                  onChange={handleToDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={6} md={6} xs={6} sm={6}>                  
                  <Box  sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
              <TextField
                margin="dense"
                label="Customer Name"
                type="text"
                fullWidth
                variant="outlined"
                value={CustomerName}
                onChange={(e) => setCustomerName(e.target.value)}
                select
                sx={{width:'50%'}}                
              >
                <MenuItem value="CustomerName 1">CustomerName 1</MenuItem>
                <MenuItem value="CustomerName 2">CustomerName 2</MenuItem>
              </TextField>
              </Box>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Particular</StyledTableCell>
                  <StyledTableCell>Vouchar Type</StyledTableCell>
                  <StyledTableCell>Vouchar No</StyledTableCell>
                  <StyledTableCell>Debit</StyledTableCell>
                  <StyledTableCell>Credit</StyledTableCell>
                  <StyledTableCell>Closing Balance</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell>{row.calories}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.fat}</StyledTableCell>
                    <StyledTableCell>{row.carbs}</StyledTableCell>
                    <StyledTableCell>{row.protein}</StyledTableCell>
                    <StyledTableCell>{row.protein}</StyledTableCell>
                    <StyledTableCell>{row.protein}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>      

          <TablePaginations
        count={rows.length}
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

export default CustomerLedger;

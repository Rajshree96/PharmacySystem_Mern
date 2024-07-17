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
import { useEffect } from "react";
import axios from "axios"
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

const ManufacturerLedger = () => {
  const [manufacturer, setmanufacturer] = useState([]);
  // const [manufacturerName, setManufacturerName] = useState('');
  const [manufacturerLedger, setManufacturerLedger] = useState([]);
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
  const breadcrumbs = ["Manufacturer", " Manufacturer Ledger"];
  const config = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));

    return {
      headers: {
        Authorization:` Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      },
    };
  };
  const fetchManufecturer = async () => {
    try {
       const response = await axios.get('http://localhost:4000/api/v1/admin/getAllManufacturer', config());
       console.log("manufactured  fetched", response.data);
       if(Array.isArray(response.data.result)){
        setmanufacturer(response.data.result);
       }else{
        console.error("Error: Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching manufactures:", error);
      setmanufacturer([]);
    }
  };
  const fetchManufacturerLedger = async () => {
    try {
       const response = await axios.get('http://localhost:4000/api/v1/purchase/getAll', config());
       console.log("manufacturedLedger  fetched", response.data);
       if(Array.isArray(response.data)){
        setManufacturerLedger(response.data);
       }else{
        console.error("Error: Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching manufactures:", error);
      setmanufacturer([]);
    }
  };
  
  useEffect(()=>{
    
    fetchManufacturerLedger();
  },[]);

 useEffect(()=>{
    fetchManufecturer();
  },[]);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
          Manufacturer
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
                label="Manufacturer Name"
                type="text"
                fullWidth
                variant="outlined"
                value={manufacturer}
                onChange={(e) => setmanufacturer(e.target.value)}
                select
                sx={{width:'50%'}}                
              >
                {manufacturer.map((manu) => (
             <MenuItem  key={manu._id} value={manu._id}>{manu.name}</MenuItem>
            ))}
              </TextField>
              </Box>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sno.</StyledTableCell>
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
                {manufacturerLedger.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((manu,index) => (
                  <StyledTableRow key={manu._id}>
                    <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {manu.date}
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
        count={manufacturerLedger.length}
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

export default ManufacturerLedger;

import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import TransportDetails from "../../../common-components/Modals/PurchaseModal/TranspotDetails";
import { useReactToPrint } from "react-to-print";
import { format, addDays } from "date-fns";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialRow = {
  sno: "",
  account: "",
  product: "",
  amount: "",
  description: "",
  tax: "",
  taxAmount: "",
  total: "",  
};

const accounts = [
  { value: "101", label: "101" },
  { value: "102", label: "102" },
  { value: "103", label: "103" },
];

function ProductTable({ rows, onAddRow, onRemoveRow, onRowChange }) {
  const calculateTotal = (key) => {
    return rows
      .reduce((sum, row) => sum + parseFloat(row[key] || 0), 0)
      .toFixed(2);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    onRowChange(updatedRows);
  };

  return (
    <TableContainer sx={{ mb: 2 }} maxWidth="xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              S.no
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
             Account
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Productive/Service
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Description
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
               Amount
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
             Tax
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Tax Amount
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
               Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.sno}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "sno", e.target.value)
                  }                 
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <Select
                  value={row.account}
                  onChange={(e) =>
                    handleInputChange(index, "account", e.target.value)
                  }
                  fullWidth
                  size="small"
                >
                                <MenuItem value="" disabled>Select Account No.</MenuItem>
                  {accounts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.product}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "product", e.target.value)
                  }                 
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.description}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }                 
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.amount}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
                  }                 
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.tax}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "tax", e.target.value)
                  }                 
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.taxAmount}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "taxAmount", e.target.value)
                  }                 
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.total}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "total", e.target.value)
                  }                 
                />
              </TableCell>
              <TableCell sx={{ border: "1px solid white" }}>
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <IconButton
                    onClick={() => onRemoveRow(index)}
                    color="error"
                  >
                    <RemoveCircle />
                  </IconButton>
                  <IconButton onClick={onAddRow} color="success">
                    <AddCircle />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              sx={{
                border: "1px solid grey",
                fontWeight: 700,
                fontSize: "15px",
              }}
              colSpan={1}
              align="right"
            >
              Total
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: "center" }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: "center" }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: "center" }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("amount")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("tax")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("taxAmount")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("total")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Expense() {
  const breadcrumbs = ["Account", "Expense"];
  const [tables, setTables] = useState([
    {
      id: Date.now(),
      rows: [initialRow],
    },
  ]);
  const [date, setDate] = useState("");
  const [expenseNo , setExpenseNo] = useState("");
  const [taxType, setTaxType] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [bank, setBank] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [narration , setNarration] = useState("");


  // useEffect(() => {
  //   if (date && paymentTerms) {
  //     const newDueDate = addDays(new Date(date), parseInt(paymentTerms));
  //     setDueDate(format(newDueDate, "yyyy-MM-dd"));
  //   }
  // }, [date, paymentTerms]);

  const handleAddRow = (tableId) => {
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? { ...table, rows: [...table.rows, { ...initialRow }] }
          : table
      )
    );
  };

  const handleRemoveRow = (tableId, rowIndex) => {
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              rows: table.rows.filter((_, index) => index !== rowIndex),
            }
          : table
      )
    );
  };

  const handleRowChange = (tableId, updatedRows) => {
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, rows: updatedRows } : table
      )
    );
  };

  const resumeRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });


  const handelSubmit = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      let paymentData = {
        date,
        expenseNo,
        paymentMode,
        taxType,
        bank,
        paymentMethod,
        narration,
        purchaseTable: tables[0].rows.map(row => ({
          account: row.account,
          product: parseFloat(row.product) || 0,
          description: parseFloat(row.description) || 0,
          amount: parseFloat(row.amount) || 0,
          tax:parseFloat(row.tax) || 0,
          taxAmount: parseFloat(row.taxAmount) || 0,
          total: parseFloat(row.total) || 0,
        })),
      };
       if(paymentMode === 'Bank')
       {
        paymentData.bank =bank;
        paymentData.paymentMethod = paymentMethod;
        if(paymentMethod === "Online")
        {
          paymentData.transaction =  transactionNumber;
        } else if(paymentMethod === 'Cheque')
        {
          paymentData.chequeNo = chequeNumber;
        }
       }
       const response = await axios.post("http://localhost:4000/api/v1/expense/add",
        paymentData,
        {
          headers:{
            "content-type": "application/json",
             "Authorization": `Bearer ${auth.token}`
          }
        }
       );
       console.log("Expense added Successfully:", response.data);

    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  return (
    <Container maxWidth="xl" ref={resumeRef}>
      <Paper sx={{ p: 2, mb: 2 }}>
        {/* Purchase Order */}
        <Box sx={{ p: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
          Account
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Expense No." fullWidth
              value={expenseNo}
              onChange={(e)=>setExpenseNo(e.target.value)}
              />
            </Grid>           
            <Grid item xs={3}>
              <TextField
                select
                label="Payment Mode"
                fullWidth
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Bank">Bank</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField select label="Tax Type" fullWidth
               value={taxType}
               onChange={(e)=>setTaxType(e.target.value)}
              >
                <MenuItem value="CGST/SGST">CGST/SGST</MenuItem>
                <MenuItem value="IGST">IGST</MenuItem>
                <MenuItem value="Non GST">Non GST</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          {paymentMode === "Bank" && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Select Bank"
                  fullWidth
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  <MenuItem value="Bank1">Bank1</MenuItem>
                  <MenuItem value="Bank2">Bank2</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Payment Method"
                  fullWidth
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Cheque">Cheque</MenuItem>
                </TextField>
              </Grid>
              {paymentMethod === "Online" && (
                <Grid item xs={3}>
                  <TextField
                    label="Transaction Number"
                    fullWidth
                    value={transactionNumber}
                    onChange={(e) => setTransactionNumber(e.target.value)}
                  />
                </Grid>
              )}
              {paymentMethod === "Cheque" && (
                <Grid item xs={3}>
                  <TextField
                    label="Cheque Number"
                    fullWidth
                    value={chequeNumber}
                    onChange={(e) => setChequeNumber(e.target.value)}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Box>

        {/* Product Details */}
        <Box sx={{ p: 2 }}>         
          {tables.map((table) => (
            <ProductTable
              key={table.id}
              rows={table.rows}
              onAddRow={() => handleAddRow(table.id)}
              onRemoveRow={(rowIndex) => handleRemoveRow(table.id, rowIndex)}
              onRowChange={(updatedRows) =>
                handleRowChange(table.id, updatedRows)
              }
            />
          ))}
        </Box>

        {/* Narration */}
        <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
          <Grid item md={3} xs={3}>
            <TextField label="Narration" fullWidth multiline rows={3} 
            value={narration}
            onChange={(e)=>setNarration(e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Button */}
        <Grid container spacing={2}>
          <Grid
            item
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button variant="contained" className="btn-design" onClick={handelSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Expense;

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
  itemCode: "",
  billNumber: "",
  billAmount: "",
  receivedAmount: "",
  balance: "",
};

const billOptions = [
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
              Bill No.
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Bill Amount
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Received Amount
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 150,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Balance Amount
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
                  InputProps={{
                    sx: {
                      border: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                  }}
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <Select
                  value={row.billNumber}
                  onChange={(e) =>
                    handleInputChange(index, "billNumber", e.target.value)
                  }
                  fullWidth
                  size="small"
                >
                  {billOptions.map((option) => (
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
                  value={row.billAmount}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "billAmount", e.target.value)
                  }
                  InputProps={{
                    sx: {
                      border: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                  }}
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.receivedAmount}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "receivedAmount", e.target.value)
                  }
                  InputProps={{
                    sx: {
                      border: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                  }}
                />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.balance}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "balance", e.target.value)
                  }
                  InputProps={{
                    sx: {
                      border: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                  }}
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
              {calculateTotal("billAmount")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("receivedAmount")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("balance")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PaymentIn() {
  const breadcrumbs = ["Account", "Payment In"];
  const [tables, setTables] = useState([
    {
      id: Date.now(),
      rows: [initialRow],
    },
  ]);
  const [date, setDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [receiptMode, setReceiptMode] = useState("");
  const [bank, setBank] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");

  useEffect(() => {
    if (date && paymentTerms) {
      const newDueDate = addDays(new Date(date), parseInt(paymentTerms));
      setDueDate(format(newDueDate, "yyyy-MM-dd"));
    }
  }, [date, paymentTerms]);

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
              <TextField label="Receipt No." fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField select label="Select Customer" fullWidth>
                <MenuItem value="Customer1">Customer1</MenuItem>
                <MenuItem value="Customer2">Customer2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Receipt Mode"
                fullWidth
                value={receiptMode}
                onChange={(e) => setReceiptMode(e.target.value)}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Bank">Bank</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          {receiptMode === "Bank" && (
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
            <TextField label="Narration" fullWidth multiline rows={3} />
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
            <Button variant="contained" className="btn-design">
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PaymentIn;

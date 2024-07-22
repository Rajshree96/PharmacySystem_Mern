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
import { useReactToPrint } from "react-to-print";
import { format, addDays } from "date-fns";
import axios from "axios";

const initialRow = {
  sno: "",
  account: "",
  amount: "",  
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
             Amount
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
                  value={row.amount}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
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
              {calculateTotal("amount")}
            </TableCell>            
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Journal() {
  const breadcrumbs = ["Account", "Journal"];
  const [tables, setTables] = useState([
    {
      id: Date.now(),
      rows: [initialRow],
    },
  ]);
  const [date, setDate] = useState("");
  const[journalNo, setJournalNo] = useState("");
  const[selectedAccount , setSelectedAccount] = useState("");
  const[narration, setNarration] = useState("");


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
      let journal = {
        date,
        journalNo,
        selectedAccount,
       
        narration,
        purchaseTable: tables[0].rows.map(row => ({
          account: row.account,
          amount: row.amount || 0,
        })),
      };
      
       const response = await axios.post("http://localhost:4000/api/v1/journal/add",
        journal,
        {
          headers:{
            "content-type": "application/json",
             "Authorization": `Bearer ${auth.token}`
          }
        }
       );
       console.log("income added Successfully:", response.data);

    } catch (error) {
      console.error('Error adding income:', error)
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
              <TextField label="Journal No." fullWidth
              value={journalNo}
              onChange={(e)=>setJournalNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField select label="Select Account" fullWidth
              value={selectedAccount}
              onChange={(e)=>setSelectedAccount(e.target.value)}
              >
              {accounts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>           
          </Grid>        
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
            <Button
              variant="contained"
              className="btn-design"
              onClick={handlePrint}
            >
              Save & Print
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Journal;

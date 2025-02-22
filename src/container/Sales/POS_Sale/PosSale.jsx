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
  itemCode: "",
  productName: "",
  qty: "",
  mrp: "",
  retailPrice: "",
  taxableValue: "",
  cgst: "",
  sgst: "",
  igst: "",
  totalValue: "",
};

const productOptions = [
  { value: "product1", label: "Product 1" },
  { value: "product2", label: "Product 2" },
  { value: "product3", label: "Product 3" },
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
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              S.no
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Item Code
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Product Name
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Qty
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              MRP
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Retail Price
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Taxable Value
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              CGST
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              SGST
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              IGST
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid grey",
                width: 100,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Total Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.sno} fullWidth size="small"                  
                  onChange={(e) =>
                    handleInputChange(index, "sno", e.target.value)
                  } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.itemCode} fullWidth size="small"               
                onChange={(e) =>
                  handleInputChange(index, "itemCode", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <Select
                  value={row.productName}
                  onChange={(e) =>
                    handleInputChange(index, "productName", e.target.value)
                  } 
                  fullWidth
                  size="small"
                >
                                <MenuItem value="" disabled>Select Product</MenuItem>
                  {productOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.qty} fullWidth size="small"                
                onChange={(e) =>
                  handleInputChange(index, "qty", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.mrp} fullWidth size="small"                
                onChange={(e) =>
                  handleInputChange(index, "mrp", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.retailPrice} fullWidth size="small"                
                onChange={(e) =>
                  handleInputChange(index, "retailPrice", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.taxableValue} fullWidth size="small"                
                onChange={(e) =>
                  handleInputChange(index, "taxableValue", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.cgst} fullWidth size="small"                 
                onChange={(e) =>
                  handleInputChange(index, "cgst", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.sgst} fullWidth size="small"                
                onChange={(e) =>
                  handleInputChange(index, "sgst", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.igst} fullWidth size="small"                
                onChange={(e) =>
                  handleInputChange(index, "igst", e.target.value)
                } />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.totalValue} fullWidth size="small"               
                onChange={(e) =>
                  handleInputChange(index, "totalValue", e.target.value)
                } />
              </TableCell>
              <TableCell sx={{ border: "1px solid white" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton onClick={() => onRemoveRow(index)} color="error">
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
              {calculateTotal("qty")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: "center" }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: "center" }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("taxableValue")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("cgst")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("sgst")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("igst")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey" }}>
              {calculateTotal("totalValue")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PosSale() {
  const breadcrumbs = ["Sales", "Pos Sales"];
  const [tables, setTables] = useState([
    {
      id: Date.now(),
      rows: [initialRow],
    },
  ]);
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("");
  // const [dueDate, setDueDate] = useState("");
  const[invoiceNo, setInvoiceNo] =useState('');
  const[customerName,setCustomerName]=useState('')
  const[grossAmount,setGrossAmount]=useState('')
  const[gstAmount,setGstAmount]=useState('')
  const[netAmount,setNetAmount]=useState('')

//   const [transPortDetails, setTransPortDetails] = useState({
//     receiptNumber: '',
//     dispatchedThrough: '',
//    destination: '',
//    carrierName: '',
//    billOfLading: '',
//    vehicleNumber: ''
//  });

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

  const resumeRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  const handleRowChange = (tableId, updatedRows) => {
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, rows: updatedRows } : table
      )
    );
  };


  const addPos = async(pos)=>{
    console.log(pos);
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
       const  response = await axios.post('http://localhost:4000/api/v1/pos/addpos',
        pos,
        {
          headers:{
            "content-type": "application/json",
             "Authorization": `Bearer ${auth.token}`
          }
        }
       );
       console.log("salesInvoice response", response);
       if (response.data.status === 201) {
        console.log("salesInvoice created successfully ");
        } 
    } catch (error) {
      console.log("Somthing went wrong");

    }
  }

  const handleSubmit = async (event) => {
    
    event.preventDefault(); 
   
    const pos = {
      date: date,
      // invoiceNo: invoiceNo,
      paymentType:paymentType,
      invoiceNo:invoiceNo,
      customerName: customerName,
      // dueDate: dueDate,
      // transPortDetails:transPortDetails,
      purchaseTable: tables[0].rows,
      amounts: {
          grossAmount: grossAmount,
          gstAmount: gstAmount,
          netAmount: netAmount
      },
  };
  
    try {
      await addPos(pos);
      // handleAddMedicine();
      
    } catch (error) {
      console.error('Error adding salesInvoice:', error);
      
    }
  };
  console.log(tables)
  // console.log(transPortDetails)

  return (
    <Container maxWidth="xl" ref={resumeRef}>
      <Paper sx={{ p: 2, mb: 2 }}>
        {/* Purchase Order */}
        <Box sx={{ p: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Sales
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
              <TextField label="Invoice No." fullWidth  value={invoiceNo}
                onChange={(e)=>setInvoiceNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Customer Detail" fullWidth value={customerName} onChange={(e)=>setCustomerName(e.target.value)} />
            </Grid>
            <Grid item xs={3}>
              <TextField select label="Payment Type" fullWidth value={paymentType} onChange={(e)=>setPaymentType(e.target.value)}>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Product Details */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Product Details
          </Typography>
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

        {/* Gross Amount */}
        <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
          <Grid item md={12} xs={12}>
            <Box
              style={{ display: "grid", justifyContent: "center", gap: "15px" }}
            >
              <TextField label="Gross Amount" fullWidth 
               value={grossAmount}
               onChange={(e)=>setGrossAmount(e.target.value)}
              />
              <TextField label="GST Amount" fullWidth 
             value={gstAmount}
             onChange={(e)=>setGstAmount(e.target.value)}
             />
              <TextField label="Net Amount" fullWidth 
              value={netAmount}
              onChange={(e)=>setNetAmount(e.target.value)}
              />
            </Box>
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
            <Button
              variant="contained"
              className="btn-design"
              // onClick={handlePrint}
              onClick={handleSubmit}
            >
              Save & Print
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PosSale;

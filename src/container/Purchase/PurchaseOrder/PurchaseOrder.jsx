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
import PurchaseOrderPayment from "./PurchaseOrderPayment";
import axios from "axios"
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
  freeQty: "",
  mrp: "",
  retailPrice: "",
  discount1: "",
  discount2: "",
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
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              S.no
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Item Code
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Product Name
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Qty
            </TableCell> 
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Free Qty
            </TableCell>                 
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              MRP
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Unit Cost
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Discount1
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Discount2
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Taxable Value
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              CGST
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              SGST
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              IGST
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100, fontWeight: 700, fontSize: '15px' }}>
              Total Value
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
                <TextField
                  value={row.itemCode}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "itemCode", e.target.value)
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
                  value={row.productName}
                  onChange={(e) =>
                    handleInputChange(index, "productName", e.target.value)
                  }
                  fullWidth
                  size="small"
                >
                  {productOptions.map((option) => (
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
                  value={row.qty}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "qty", e.target.value)
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
                  value={row.freeQty}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "freeQty", e.target.value)
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
                  value={row.mrp}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "mrp", e.target.value)
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
                  value={row.unitCost}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "unitCost", e.target.value)
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
                  value={row.discount1}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "discount1", e.target.value)
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
              </TableCell> <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.discount2}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "discount2", e.target.value)
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
              </TableCell> <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.taxableValue}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "taxableValue", e.target.value)
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
              </TableCell> <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.cgst}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "cgst", e.target.value)
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
              </TableCell> <TableCell
                sx={{ border: "1px solid grey", width: 150, height: 25 }}
              >
                <TextField
                  value={row.sgst}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "sgst", e.target.value)
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
                  value={row.igst}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "igst", e.target.value)
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
                  value={row.totalValue}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    handleInputChange(index, "totalValue", e.target.value)
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
              sx={{ border: "1px solid grey", fontWeight: 700, fontSize: '15px' }}
              colSpan={1}
              align="right"
            >
              Total
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
              {calculateTotal("qty")}
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
              -
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", textAlign: 'center' }}>
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

function PurchaseOrder() {
  const breadcrumbs = ["Purchase", "Purchase Order"];
  const [tables, setTables] = useState([
    {
      id: Date.now(),
      rows: [initialRow],
    },
  ]);
  const [otherCharges, setOtherCharges] = useState([]);
  const [reverseCharge, setReverseCharge] = useState("No");
  const [date, setDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [charges, setCharges] = useState([]);
  const [totalCharges, setTotalCharges] = useState(0);
  const [currentCharge, setCurrentCharge] = useState('');
   const[orderNo, setOrderNo]=useState('')
   const[supplierName,setSupplierName]=useState('')
   const[placeOfSupply,setPlaceOfSupply]=useState('')
   const[billingAddress,setBillingAddress]=useState('')
   const[grossAmount,setGrossAmount]=useState('')
   const[gstAmount,setGstAmount]=useState('')
   const[netAmount,setNetAmount]=useState('')
   const[narration,setNarration]=useState('');
   const [transportDetails, setTransportDetails] = useState({
    receiptNumber: '',
    dispatchedThrough: '',
    destination: '',
    carrierName: '',
    billOfLading: '',
    vehicleNumber: ''
  });
  
  

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

  const handleAddOtherCharge = () => {
    setOtherCharges([...otherCharges, ""]);
  };

  const handleOtherChargeChange = (index, value) => {
    const updatedCharges = [...otherCharges];
    updatedCharges[index] = value;
    setOtherCharges(updatedCharges);
  };

  const resumeRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddCharge = () => {
    const charge = parseFloat(currentCharge);
    if (!isNaN(charge)) {
      setCharges([...charges, charge]);
      setTotalCharges(totalCharges + charge);
      setCurrentCharge('');
    }
    setOpen(false);
  };
  const addPurchase = async (purchaseData) => {
    console.log(purchaseData);
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const response = await axios.post('http://localhost:4000/api/v1/purchase/add',
         purchaseData,
        { 
          
          headers: {
            "content-type": "application/json",
             "Authorization": `Bearer ${auth.token}`
          }
        }
      );
      console.log(response);
      if (response.data.status === 201) {
      console.log("purchase created successfully ");
      } 
      

    } catch (error) {
     
      console.log("something went wrong")
      
    }
  };

  // const handleAddMedicine = () => {
  //   setTimeout(() => {     
  //     setSuccess(true);
  //   }, 300);
  // };
  const handleSubmit = async (event) => {
    
    event.preventDefault(); 
   
    const purchaseData = {
      date: date,
      orderNo: orderNo,
      supplierName: supplierName,
      placeOfSupply: placeOfSupply,
      paymentTerm: paymentTerms,
      dueDate: dueDate,
      transPortDetails:transportDetails,
      billingAddress: billingAddress,
      reverseCharge: reverseCharge,
      purchaseTable: tables[0].rows,
      amounts: {
          grossAmount: grossAmount,
          gstAmount: gstAmount,
          otherCharge: otherCharges,
          netAmount: netAmount
      },
      Narration:narration
  };
  
    try {
      await addPurchase(purchaseData);
      // handleAddMedicine();
      
    } catch (error) {
      console.error('Error adding purchase:', error);
      
    }
  };

 console.log(tables)
 console.log(transportDetails)

  return (
    <Container maxWidth="xl" ref={resumeRef}>
      <Paper sx={{ p: 2, mb: 2 }}>
        {/* Purchase Order */}
        <Box sx={{ p: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
          Purchase
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
              <TextField label="Order No." fullWidth 
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
              />
            </Grid>           
            <Grid item xs={3}>
              <TextField select label="Supplier Name" fullWidth
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              >
                <MenuItem value="SupplierName1">SupplierName1</MenuItem>
                <MenuItem value="SupplierName2">SupplierName2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Place of Supply" fullWidth
              value={placeOfSupply}
              onChange={(e) => setPlaceOfSupply(e.target.value)}
               />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Payment Terms"
                fullWidth
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dueDate}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Transport Details */}
        <Box sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Transport Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={4} xs={4}>
            <TransportDetails
              transportDetails={transportDetails}
             setTransportDetails={setTransportDetails}
            />

            </Grid>
            <Grid item md={4} xs={4}>
              <TextField label="Billing Address" fullWidth 
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="outlined-select-currency"
                select
                label="Reverse Charge"
                fullWidth
                value={reverseCharge}
                onChange={(e) => setReverseCharge(e.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Product Details */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Product Tables
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

        {/* Add Other Charges */}
        <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
          <Grid item md={4} xs={4}>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ mb: 2 }}
              startIcon={<AddCircle />}
              className="btn-design"
            >
              Add Other Charges
            </Button>
            <Modal open={open} onClose={handleClose} sx={{ maxWidth: "xl" }}>
              <Grid container spacing={1} sx={style} maxWidth="xl">
                <Grid item md={12} xs={12} >
                  <Typography variant="h6" sx={{fontWeight:700}}> Other Charges</Typography>
                  <TextField                    
                    fullWidth
                    sx={{ mt: 2 }}
                    label="Other Charges"
                    value={currentCharge}
                    onChange={(e) => setCurrentCharge(e.target.value)}
                  />
                  <Button className="btn-design" sx={{color:'white', mt:2}}  onClick={handleAddCharge}>Add</Button>
                </Grid>
              </Grid>
            </Modal>   
            <TextField label="Narration" fullWidth multiline rows={3}
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
             />
          </Grid>
          {/* Gross Amount */}
          <Grid item md={8} xs={8}>
            <Box
              style={{ display: "grid", justifyContent: "center", gap: "15px" }}
            >
              <TextField label="Gross Amount" fullWidth 
              value={grossAmount}
              onChange={(e) => setGrossAmount(e.target.value)}
              />
              <TextField label="GST Amount" fullWidth 
                value={gstAmount}
                onChange={(e) => setGstAmount(e.target.value)}
              />
              <TextField label="Other Charge" fullWidth
               value={totalCharges}
               InputProps={{
                 readOnly: true,
               }} />
              <TextField label="Net Amount" fullWidth
              value={netAmount}
              onChange={(e) => setNetAmount(e.target.value)}
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
            <Button variant="contained" className="btn-design" onClick={handleSubmit} >
              Save
            </Button>

            <Button
              variant="contained"
              className="btn-design"
              onClick={handlePrint}
            >
              Save & Print
            </Button>

            <PurchaseOrderPayment/>

          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PurchaseOrder;
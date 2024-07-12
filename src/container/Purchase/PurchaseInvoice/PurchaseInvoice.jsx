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
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import TransportDetails from "../../../common-components/Modals/PurchaseModal/TranspotDetails";
import { useReactToPrint } from "react-to-print";
import { format, addDays } from "date-fns";
import PurchasePayment from "./PurchasePayment";

const initialRow = {
  sno: "",
  itemCode: "",
  productName: "",
  qty: "",
  freeQty: "",
  mrp: "",
  unitCost: "",
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

function ProductTable({ rows, onAddRow, onRemoveRow }) {
  const calculateTotal = (key) => {
    return rows
      .reduce((sum, row) => sum + parseFloat(row[key] || 0), 0)
      .toFixed(2);
  };

  return (
    <TableContainer sx={{ mb: 2 }} maxWidth="xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              S.no
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Item Code
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Product Name
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Qty
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Free Qty
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              MRP
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Unit Cost
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Discount1
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Discount 2
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              Taxable Value
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              CGST
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              SGST
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
              IGST
            </TableCell>
            <TableCell sx={{ border: "1px solid grey", width: 100 }}>
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
                <TextField value={row.sno} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.itemCode} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <Select
                  value={row.productName}
                  onChange={(e) => (row.productName = e.target.value)}
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
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.qty} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.freeQty} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.mrp} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.unitCost} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.discount1} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.discount2} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.taxableValue} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.cgst} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.sgst} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.igst} fullWidth size="small" />
              </TableCell>
              <TableCell
                sx={{ border: "1px solid grey", width: 100, height: 25 }}
              >
                <TextField value={row.totalValue} fullWidth size="small" />
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
              sx={{ border: "1px solid grey" }}
              colSpan={9}
              align="right"
            >
              Total
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
  const breadcrumbs = ["Purchase", "Purchase Invoice"];
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
              <TextField label="Invoice No." fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Supplier Invoice No." fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField select label="Supplier Name" fullWidth>
                <MenuItem value="SupplierName1">SupplierName1</MenuItem>
                <MenuItem value="SupplierName2">SupplierName2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Place of Supply" fullWidth />
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
              <TransportDetails />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField label="Billing Address" fullWidth />
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
            />
          ))}
        </Box>

        {/* Add Other Charges */}
        <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
          <Grid item md={4} xs={4}>
            <Button
              variant="contained"
              onClick={handleAddOtherCharge}
              sx={{ mb: 2 }}
              startIcon={<AddCircle />}
              className="btn-design"
            >
              Add Other Charges
            </Button>
            {otherCharges.map((charge, index) => (
              <TextField
                key={index}
                value={charge}
                onChange={(e) => handleOtherChargeChange(index, e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                label={`Other Charge ${index + 1}`}
              />
            ))}
            <TextField label="Narration" fullWidth multiline rows={3} />
          </Grid>
          {/* Gross Amount */}
          <Grid item md={8} xs={8}>
            <Box
              style={{ display: "grid", justifyContent: "center", gap: "15px" }}
            >
              <TextField label="Gross Amount" fullWidth />
              <TextField label="GST Amount" fullWidth />
              <TextField label="Other Charge" fullWidth />
              <TextField label="Net Amount" fullWidth />
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
            <Button variant="contained" className="btn-design">
              Save
            </Button>

            <Button
              variant="contained"
              className="btn-design"
              onClick={handlePrint}
            >
              Save & Print
            </Button>

            <PurchasePayment />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PurchaseOrder;

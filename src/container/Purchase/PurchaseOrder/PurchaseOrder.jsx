import React, { useState } from "react";
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
  return (
    <TableContainer component={Paper} sx={{ mb: 2 }} maxWidth="xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: " 1 solid grey" }}>S.no</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Item Code</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Product Name</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Qty</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Free Qty</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>MRP</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Unit Cost</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Discount1</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Discount 2</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>
              Taxable Value
            </TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>CGST</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>SGST</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>IGST</TableCell>
            <TableCell sx={{ border: " 1 solid grey" }}>Total Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.sno} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.itemCode} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <Select
                  value={row.productName}
                  onChange={(e) => (row.productName = e.target.value)}
                  fullWidth
                >
                  {productOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.qty} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.freeQty} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.mrp} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.unitCost} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.discount1} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.discount2} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.taxableValue} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.cgst} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.sgst} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.igst} fullWidth />
              </TableCell>
              <TableCell sx={{ border: " 1 solid grey" }}>
                <TextField value={row.totalValue} fullWidth />
              </TableCell>
              <IconButton onClick={() => onRemoveRow(index)} color="error">
                <RemoveCircle />
              </IconButton>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={15}>
              <Button
                variant="contained"
                startIcon={<AddCircle />}
                onClick={onAddRow}
                className="btn-design"
              >
                Add Row
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PurchaseOrder() {
  const breadcrumbs = ["Purchase", "Add Purchase"];
  const [tables, setTables] = useState([
    {
      id: Date.now(),
      rows: [initialRow],
    },
  ]);
  const [otherCharges, setOtherCharges] = useState([]);
  const [reverseCharge, setReverseCharge] = useState("No");

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

  return (
    <Container maxWidth="xl">
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
              <TextField label="Supplier Name" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Place of Supply" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Payment Terms" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
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
            <Grid item md={4} xs={4} >            
              <TransportDetails/>
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

            <Button variant="contained" className="btn-design">
              Save & Print
            </Button>

            <Button variant="contained" className="btn-design">
              Save & Payment
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PurchaseOrder;

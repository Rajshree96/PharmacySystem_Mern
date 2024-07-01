import React, { useState } from "react";
import { DialogContentText, TextField, Grid, MenuItem, Checkbox, FormControlLabel, Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";

const AddMedicineForm = ({ medicineName, setMedicineName }) => {
  const [category, setCategory] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [purchaseTaxIncluded, setPurchaseTaxIncluded] = useState(false);
  const [salesTaxIncluded, setSalesTaxIncluded] = useState(false);
  const [priceDetails, setPriceDetails] = useState({
    purchasePrice: '',
    landingCost: '',
    mrp: '',
    retailDiscount: '',
    retailPrice: '',
    retailMargin: '',
    wholesalerDiscount: '',
    wholesalerPrice: '',
    wholesaleMargin: '',
    minimumStock: ''
  });
  const [openingBalance, setOpeningBalance] = useState({
    particular: '',
    quantity: '',
    rate: '',
    units: '',
    amount: ''
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Add Medicine</Typography>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DialogContentText>Enter the details of the medicine you want to add.</DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              margin="dense"
              label="Item Code"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Medicine Name"
              type="text"
              fullWidth
              variant="outlined"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Category"
              type="text"
              fullWidth
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Medicine Type"
              type="text"
              fullWidth
              variant="outlined"
              value={medicineType}
              onChange={(e) => setMedicineType(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Manufacturer"
              type="text"
              fullWidth
              variant="outlined"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              select
            >
              <MenuItem value="Manufacturer 1">Manufacturer 1</MenuItem>
              <MenuItem value="Manufacturer 2">Manufacturer 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Brand"
              type="text"
              fullWidth
              variant="outlined"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              select
            >
              <MenuItem value="Brand 1">Brand 1</MenuItem>
              <MenuItem value="Brand 2">Brand 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Unit"
              type="text"
              fullWidth
              variant="outlined"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="GST Rate"
              type="text"
              fullWidth
              variant="outlined"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              select
            >
              <MenuItem value="5%">5%</MenuItem>
              <MenuItem value="12%">12%</MenuItem>
              <MenuItem value="18%">18%</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={purchaseTaxIncluded}
                  onChange={(e) => setPurchaseTaxIncluded(e.target.checked)}
                />
              }
              label="Purchase Tax Included"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={salesTaxIncluded}
                  onChange={(e) => setSalesTaxIncluded(e.target.checked)}
                />
              }
              label="Sales Tax Included"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              // label="Product Photo"
              type="file"
              fullWidth
              variant="outlined"
              inputProps={{ accept: "image/*", multiple: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Net Weight"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Batch No."
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Expiry Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Ingredients"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <DialogContentText>Price Details</DialogContentText>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Purchase Price"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.purchasePrice}
              onChange={(e) => setPriceDetails({ ...priceDetails, purchasePrice: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Landing Cost"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.landingCost}
              onChange={(e) => setPriceDetails({ ...priceDetails, landingCost: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="MRP"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.mrp}
              onChange={(e) => setPriceDetails({ ...priceDetails, mrp: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Retail Discount (%)"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.retailDiscount}
              onChange={(e) => setPriceDetails({ ...priceDetails, retailDiscount: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Retail Price"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.retailPrice}
              onChange={(e) => setPriceDetails({ ...priceDetails, retailPrice: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Retail Margin (%)"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.retailMargin}
              onChange={(e) => setPriceDetails({ ...priceDetails, retailMargin: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Wholesaler Discount (%)"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.wholesalerDiscount}
              onChange={(e) => setPriceDetails({ ...priceDetails, wholesalerDiscount: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Wholesaler Price"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.wholesalerPrice}
              onChange={(e) => setPriceDetails({ ...priceDetails, wholesalerPrice: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Wholesale Margin (%)"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.wholesaleMargin}
              onChange={(e) => setPriceDetails({ ...priceDetails, wholesaleMargin: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="dense"
              label="Minimum Stock"
              type="text"
              fullWidth
              variant="outlined"
              value={priceDetails.minimumStock}
              onChange={(e) => setPriceDetails({ ...priceDetails, minimumStock: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <DialogContentText>Opening Balance</DialogContentText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Particular"
              type="text"
              fullWidth
              variant="outlined"
              value={openingBalance.particular}
              onChange={(e) => setOpeningBalance({ ...openingBalance, particular: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Quantity"
              type="text"
              fullWidth
              variant="outlined"
              value={openingBalance.quantity}
              onChange={(e) => setOpeningBalance({ ...openingBalance, quantity: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Rate"
              type="text"
              fullWidth
              variant="outlined"
              value={openingBalance.rate}
              onChange={(e) => setOpeningBalance({ ...openingBalance, rate: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Units"
              type="text"
              fullWidth
              variant="outlined"
              value={openingBalance.units}
              onChange={(e) => setOpeningBalance({ ...openingBalance, units: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Amount"
              type="text"
              fullWidth
              variant="outlined"
              value={openingBalance.amount}
              onChange={(e) => setOpeningBalance({ ...openingBalance, amount: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Medicine
        </Button>
      </motion.div>
    </Box>
  );
};

export default AddMedicineForm;

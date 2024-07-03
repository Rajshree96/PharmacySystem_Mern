import React, { useState } from "react";
import { DialogContentText, TextField, Grid, MenuItem, Checkbox, FormControlLabel, Box } from "@mui/material";
import Chip from '@mui/material/Chip';

const AddMedicineModal = ({ medicineName, setMedicineName }) => {
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
  const [ingredients, setIngredients] = useState('');
  const [ingredientList, setIngredientList] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setIngredients(value);

    // Split the input text by commas or new lines to create an array of ingredients
    const list = value.split(/[\n,]+/).map(item => item.trim()).filter(item => item);
    setIngredientList(list);
  };
  return (
    <>

      <Grid container spacing={2} >
      <Grid item xs={12}>
          <DialogContentText sx={{fontWeight:'700',fontSize:'20px',color:'#086070'}}>Product Information</DialogContentText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            margin="dense"
            label="Item Code"
            type="text"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Medicine Name"
            type="text"
            fullWidth
            variant="standard"
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
            variant="standard"
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
            variant="standard"
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
            variant="standard"
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
            variant="standard"
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
            variant="standard"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            select
          ><MenuItem value="5">5</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="18">18</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="GST Rate"
            type="text"
            fullWidth
            variant="standard"
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
            label="Product Photo"
            type="file"
            fullWidth
            variant="standard"
            inputProps={{ accept: "image/*", multiple: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Net Weight"
            type="text"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Batch No."
            type="text"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Expiry Date"
            placeholder="MM/YYYY"
            type="month"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
            margin="dense"
            label="Ingredients"
            type="text"
            fullWidth
            variant="standard"
          /> */}
          <TextField
            margin="dense"
            label="Ingredients"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={ingredients}
            onChange={handleInputChange}
          />
          <Box display="flex" flexWrap="wrap" mt={2}>
            {ingredientList.map((ingredient, index) => (
              <Chip
                key={index}
                label={ingredient}
                variant="outlined"
                style={{ margin: '4px' }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DialogContentText sx={{fontWeight:'700',fontSize:'20px',color:'#086070'}}>Price Details</DialogContentText>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            margin="dense"
            label="Purchase Price"
            type="text"
            fullWidth
            variant="standard"
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
            variant="standard"
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
            variant="standard"
            value={priceDetails.mrp}
            onChange={(e) => setPriceDetails({ ...priceDetails, mrp: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            margin="dense"
            label="Retail Discount"
            type="text"
            fullWidth
            variant="standard"
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
            variant="standard"
            value={priceDetails.retailPrice}
            onChange={(e) => setPriceDetails({ ...priceDetails, retailPrice: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            margin="dense"
            label="Retail Margin"
            type="text"
            fullWidth
            variant="standard"
            value={priceDetails.retailMargin}
            onChange={(e) => setPriceDetails({ ...priceDetails, retailMargin: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            margin="dense"
            label="Wholesaler Discount"
            type="text"
            fullWidth
            variant="standard"
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
            variant="standard"
            value={priceDetails.wholesalerPrice}
            onChange={(e) => setPriceDetails({ ...priceDetails, wholesalerPrice: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            margin="dense"
            label="Wholesale Margin"
            type="text"
            fullWidth
            variant="standard"
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
            variant="standard"
            value={priceDetails.minimumStock}
            onChange={(e) => setPriceDetails({ ...priceDetails, minimumStock: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <DialogContentText sx={{fontWeight:'700',fontSize:'20px',color:'#086070'}}>Opening Balance</DialogContentText>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            margin="dense"
            label="Opening Balance"
            type="text"
            fullWidth
            variant="standard"
            value={openingBalance.particular}
            onChange={(e) => setOpeningBalance({ ...openingBalance, particular: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            margin="dense"
            label="Quantity"
            type="text"
            fullWidth
            variant="standard"
            value={openingBalance.quantity}
            onChange={(e) => setOpeningBalance({ ...openingBalance, quantity: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            margin="dense"
            label="Rate"
            type="text"
            fullWidth
            variant="standard"
            value={openingBalance.rate}
            onChange={(e) => setOpeningBalance({ ...openingBalance, rate: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            margin="dense"
            label="Units"
            type="text"
            fullWidth
            variant="standard"
            value={openingBalance.units}
            onChange={(e) => setOpeningBalance({ ...openingBalance, units: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            margin="dense"
            label="Amount"
            type="text"
            fullWidth
            variant="standard"
            value={openingBalance.amount}
            onChange={(e) => setOpeningBalance({ ...openingBalance, amount: e.target.value })}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddMedicineModal;

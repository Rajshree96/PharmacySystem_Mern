import React, { useState,useEffect} from "react";
import { DialogContentText, TextField, Grid, MenuItem, Checkbox, FormControlLabel, Box,Button } from "@mui/material";
import Chip from '@mui/material/Chip';
import { Add } from "@mui/icons-material";
import axios from "axios";
import { getAllUnits } from "../../../../unitapi";
import { getAllCategories } from "../../../../categoriesApi";
import { getAllMedicineTypes } from "../../../../medicineTypeapi";

import toast, { Toaster } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { getAllBrand } from "../../../../brandApi";
const AddMedicineModal = () => {
  
  const navigate= useNavigate();
  const[medicineName,setMedicineName] =useState('');
  const [itemCode,setItemCode] = useState('')
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [medicineType, setMedicineType] = useState([]);
  const [selectedMedicineType, setSelectedMedicineType] = useState();

  const [manufacturer, setManufacturer] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');

  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  
  const [unit, setUnit] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');

  const [gstRate, setGstRate] = useState('');
  const[expiryDate,setExpiryDate]=useState();
  const[photos,setPhotos] = useState('');
  const[netWeight,setNetWeight]= useState("");
  const[batchNo,setBatchNumber]=useState('');
  const[description,setDescription] =useState('');
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
    wholesalerMargin: '',
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
  // const [categories, setCategories] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setIngredients(value);

    // Split the input text by commas or new lines to create an array of ingredients
    const list = value.split(/[\n,]+/).map(item => item.trim()).filter(item => item);
    setIngredientList(list);
  };


   useEffect(()=>{
    fetchCategories();
   }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      console.log("Fetched categories:", response);
      if (Array.isArray(response)) {
        setCategory(response);
      } else {
        console.error("Error: Fetched data is not an array");
        setCategory([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategory([]);
    }
  };
 
  useEffect(()=>{
    fetchMedicineType();
  },[])

  const fetchMedicineType = async () => {
    try {
       const response = await getAllMedicineTypes();
       console.log("Medicine Type fetched", response);
       if(Array.isArray(response)){
        setMedicineType(response);
       }else{
        console.error("Error: Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMedicineType([]);
    }
  };

  useEffect(()=>{
    fetchManufecturer();
  },[]);

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
        setManufacturer(response.data.result);
       }else{
        console.error("Error: Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching manufactures:", error);
      setManufacturer([]);
    }
  };

  useEffect(()=>{
    fetchUnit();
  },[]);

  
  const fetchUnit = async () => {
    try {
      const response = await getAllUnits();
      console.log("Fetched units:", response.data);
      if (Array.isArray(response.data)) {
        setUnit(response.data);
      } else {
        console.error("Error: Fetched data is not an array");
        setUnit([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setUnit([]);
    }
  };
  
  useEffect(()=>{
    fetchBrand();
  },[]);

  const fetchBrand = async () => {
    try {
      const response = await getAllBrand();
      console.log("Fetched Brand:", response.data);
      if (Array.isArray(response.data)) {
        setBrand(response.data);
      } else {
        console.error("Error: Fetched data is not an array");
        setBrand([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setBrand([]);
    }
  };
 



  const addMedicine = async (medicineData) => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const response = await axios.post('http://localhost:4000/api/v1/admin/add-medicine', medicineData,
        { 
          
          headers: {
            "content-type": "application/json",
             "Authorization": `Bearer ${auth.token}`
          }
        }
      );
      console.log(response);
      if (response.status === 201) {
        console.log('Medicine added successfully!');
        
      } 
      navigate("/admin/dashboard");
      toast.success("medicine added successfully ");
      
      
  
    } catch (error) {
     
      toast.error("something went wrong")
      
    }
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault(); 
    const gstRateNumber = parseFloat(gstRate.replace('%', ''));
    const medicineData = {
      itemCode: itemCode,
      medicineName: medicineName,
      medicineCategory: selectedCategory,
      medicineType: selectedMedicineType,
      manufacturer: selectedManufacturer,
      brand: selectedBrand,
      unit: selectedUnit,
      gstRate: gstRate,
      purchaseTaxIncluded: purchaseTaxIncluded,
      salesTaxIncluded: salesTaxIncluded,
      productPhotos: photos,
      netWeight: netWeight,
      description: description,
      batchNo: batchNo,
      expiryDate: expiryDate,
      ingredients: ingredientList,
      priceDetails: {
        purchasePrice: priceDetails.purchasePrice,
        landingCost: priceDetails.landingCost,
        mrp: priceDetails.mrp,
        retailDiscount: priceDetails.retailDiscount,
        retailPrice: priceDetails.retailPrice,
        retailMargin: priceDetails.retailMargin,
        wholesalerDiscount: priceDetails.wholesalerDiscount,
        wholesalerPrice: priceDetails.wholesalerPrice,
        wholesalerMargin: priceDetails.wholesaleMargin || 0,
        minimumStock: priceDetails.minimumStock,
      },
      openingBalance: {
        particular: openingBalance.particular,
        quantity: openingBalance.quantity,
        rate: openingBalance.rate,
        unit: openingBalance.units || 0,
        amount: openingBalance.amount,
      },
    };
  
    try {
      await addMedicine(medicineData);
      
    } catch (error) {
      console.error('Error adding medicine:', error);
      
    }
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
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            select
          >
            {category.map((cat) => (
             <MenuItem  key={cat._id} value={cat._id}>{cat.name}</MenuItem>
            // <MenuItem value="Manufacturer 2">Category 2</MenuItem>
            ))}
          </TextField> 
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Medicine Type"
            type="text"
            fullWidth
            variant="standard"
            value={selectedMedicineType}
            onChange={(e) => setSelectedMedicineType(e.target.value)}
            select
          >
            {medicineType.map((type) => (
             <MenuItem  key={type._id} value={type._id}>{type.mediType}</MenuItem>
            // <MenuItem value="Manufacturer 2">Category 2</MenuItem>
            ))}
             {/* <MenuItem value="Manufacturer 1">Medicine Type 1</MenuItem>
            <MenuItem value="Manufacturer 2">Medicine Type 2</MenuItem> */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            margin="dense"
            label="Manufacturer"
            type="text"
            fullWidth
            variant="standard"
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            select
          >
             {manufacturer.map((manu) => (
             <MenuItem  key={manu._id} value={manu._id}>{manu.name}</MenuItem>
            ))}
            
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Brand"
            type="text"
            fullWidth
            variant="standard"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            select
          >
             {brand.map((brands) => (
             <MenuItem  key={brands._id} value={brands._id}>{brands.brand}</MenuItem>
            ))}
            {/* <MenuItem value="Brand 1">Brand 1</MenuItem>
            <MenuItem value="Brand 2">Brand 2</MenuItem> */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Unit"
            type="text"
            fullWidth
            variant="standard"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            select
          >
            {/* <MenuItem value="5">5</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="18">18</MenuItem> */}
            {unit.map((units) => (
             <MenuItem  key={units._id} value={units._id}>{units.name}</MenuItem>
            ))}
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
            value = {photos}
            onChange ={(e)=>setPhotos(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Net Weight"
            type="text"
            fullWidth
            variant="standard"
            value={netWeight}
            onChange={(e) => setNetWeight(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Batch No."
            type="text"
            fullWidth
            variant="standard"
            value={batchNo}
            onChange={(e) => setBatchNumber(e.target.value)}
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
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
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
      
      <Button
          variant="contained"
          startIcon={<Add/>}
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
         Add Medicine
        </Button>
        <Toaster />
    </>
  );
};

export default AddMedicineModal;
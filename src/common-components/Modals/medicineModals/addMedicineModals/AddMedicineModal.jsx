import React, { useState, useEffect } from "react";
import {
    DialogContentText,
    DialogActions,
    TextField,
    Grid,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Box,
    Button,
    Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { getAllUnits } from "../../../../unitapi";
import { getAllCategories } from "../../../../categoriesApi";
import { getAllMedicineTypes } from "../../../../medicineTypeapi";
import toast, { Toaster } from "react-hot-toast";
import { getAllBrand } from "../../../../brandApi";

const AddMedicineModal = ({ setSuccess, formType, selectedData }) => {
    // const [medicines, setMedicines] = useState([]);

    const [medicines, setMedicines] = useState([]);
      const [editingMedicine, setEditingMedicine] = useState(null);
      const [openEditDialog, setOpenEditDialog] = useState(false);
  
  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditingMedicine(null);
  };


    const [medicineName, setMedicineName] = useState(selectedData?.medicineName || "");
    const [itemCode, setItemCode] = useState(selectedData?.itemCode || "");
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(selectedData?.medicineCategory || "");
    const [medicineType, setMedicineType] = useState([]);
    const [selectedMedicineType, setSelectedMedicineType] = useState(selectedData?.medicineType || "");
    // manufacturer state
    const [manufacturer, setManufacturer] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState(selectedData?.manufacturer || "");
    // brand state
    const [brand, setBrand] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(selectedData?.brand || "");
    //unit state
    const [unit, setUnit] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(selectedData?.unit || "");
    //gst state
    const [gstRate, setGstRate] = useState(selectedData?.gstRate || "");
    const [expiryDate, setExpiryDate] = useState(selectedData?.expiryDate || "");
    const [photos, setPhotos] = useState(selectedData?.productPhotos || "");
    const [photoFileName, setPhotoFileName] = useState(selectedData?.productPhotos || "");
    const [netWeight, setNetWeight] = useState(selectedData?.netWeight || "");
    const [batchNo, setBatchNumber] = useState(selectedData?.batchNo || "");
    const [description, setDescription] = useState(selectedData?.description || "");
    const [purchaseTaxIncluded, setPurchaseTaxIncluded] = useState(selectedData?.purchaseTaxIncluded || false);
    const [salesTaxIncluded, setSalesTaxIncluded] = useState(selectedData?.salesTaxIncluded || false);


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    console.log(files,"@@@@@@");
    setPhotoFileName(files.length ? files.map(file => file.name).join(", ") : "none");
  };

  const handleTextFieldClick = () => {
    document.getElementById('upload-photo').click();
  };

    const [priceDetails, setPriceDetails] = useState({
        purchasePrice: selectedData?.priceDetails?.purchasePrice || "",
        landingCost: selectedData?.priceDetails?.landingCost || "",
        mrp: selectedData?.priceDetails?.mrp || "",
        retailDiscount: selectedData?.priceDetails?.retailDiscount || "",
        retailPrice: selectedData?.priceDetails?.retailPrice || "",
        retailMargin: selectedData?.priceDetails?.retailMargin || "",
        wholesalerDiscount: selectedData?.priceDetails?.wholesalerDiscount || "",
        wholesalerPrice: selectedData?.priceDetails?.wholesalerPrice || "",
        wholesalerMargin: selectedData?.priceDetails?.wholesalerMargin || "",
        minimumStock: selectedData?.priceDetails?.minimumStock || "",
    });
    const [openingBalance, setOpeningBalance] = useState({
        particular: selectedData?.openingBalance?.particular || "",
        quantity: selectedData?.openingBalance?.quantity || "",
        rate: selectedData?.openingBalance?.rate || "",
        units: selectedData?.openingBalance?.units || "",
        amount: selectedData?.openingBalance?.amount || "",
    });
    const [ingredients, setIngredients] = useState(selectedData?.ingredients?.join(", ") || "");
    const [ingredientList, setIngredientList] = useState(selectedData?.ingredients || []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setIngredients(value);
        const list = value
            .split(/[\n,]+/)
            .map((item) => item.trim())
            .filter((item) => item);
        setIngredientList(list);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            if (Array.isArray(response)) {
                setCategory(response);
            }
            else {
                console.error("Error: Fetched data is not an array");
                setCategory([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategory([]);
        }
    };

    useEffect(() => {
        fetchMedicineType();
    }, []);

    const fetchMedicineType = async () => {
        try {
            const response = await getAllMedicineTypes();
            console.log("Medicine Type fetched", response);
            if (Array.isArray(response)) {
                setMedicineType(response);
            }
            else {
                console.error("Error: Fetched data is not an array");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setMedicineType([]);
        }
    };

    useEffect(() => {
        fetchManufacturer();
    }, []);

    const config = () => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json",
            },
        };
    };

    const fetchManufacturer = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/admin/getAllManufacturer", config());
            if (Array.isArray(response.data.result)) {
                setManufacturer(response.data.result);
            }
            else {
                console.error("Error: Fetched data is not an array");
            }
        } catch (error) {
            console.error("Error fetching manufactures:", error);
            setManufacturer([]);
        }
    };

    useEffect(() => {
        fetchUnit();
    }, []);

    const fetchUnit = async () => {
        try {
            const response = await getAllUnits();
            if (Array.isArray(response.data)) {
                setUnit(response.data);
            }
            else {
                console.error("Error: Fetched data is not an array");
                setUnit([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setUnit([]);
        }
    };

    useEffect(() => {
        fetchBrand();
    }, []);

    const fetchBrand = async () => {
        try {
            const response = await getAllBrand();
            if (Array.isArray(response.data)) {
                setBrand(response.data);
            }
            else {
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
            const auth = JSON.parse(localStorage.getItem("auth"));
            const response = await axios.post("http://localhost:4000/api/v1/admin/add-medicine", medicineData, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            if (response.data.statusCode === 201) {
                toast.success("Medicine added successfully");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleAddMedicine = () => {
        setTimeout(() => {
            setSuccess(true);
        }, 300);
    };

    const editMedicine = async (medicineData) => {
        // console.log("Medicine@@@@", medicineData.itemCode);
        
        const auth = JSON.parse(localStorage.getItem('auth'));
            if (!auth || !auth.token) {
              console.error("No token found in local storage");
              return;
            }
        
            try {
              const response = await axios.put(
                `http://localhost:4000/api/v1/admin/medicine/${medicineData.itemCode}`,
                medicines,
                {
                  headers: { Authorization: `Bearer ${auth.token}` }
                }
              );
              console.log("Medicine updated:", response);
              setMedicines((prevMedicines) =>
                prevMedicines.map((med) =>
                  med.itemCode === medicines.itemCode ? medicines : med
                )
              );
              handleEditDialogClose();
            } catch (error) {
              console.error("Error updating medicine:", error);
            }
          };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const gstRateNumber = parseFloat(gstRate.replace("%", ""));
        const medicineData = {
            itemCode,
            medicineName,
            medicineCategory: selectedCategory,
            medicineType: selectedMedicineType,
            manufacturer: selectedManufacturer,
            brand: selectedBrand,
            unit: selectedUnit,
            gstRate,
            purchaseTaxIncluded,
            salesTaxIncluded,
            productPhotos: photos,
            netWeight,
            description,
            batchNo,
            expiryDate,
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
                wholesalerMargin: priceDetails.wholesalerMargin || 0,
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
            if (formType === "edit medicine") {
                await editMedicine(medicineData);
                console.log("Medicine updated successfully");
            }
            else {
                await addMedicine(medicineData);
                console.log("Medicine added successfully");
            }
            setSuccess(true);
            setMedicineName("");
        } catch (error) {
            console.error(`Error ${formType === "edit medicine" ? "editing" : "adding"} medicine:`, error);
        }
    };
    useEffect(() => {
        if (formType === "edit medicine" && selectedData) {
            setMedicineName(selectedData.name);
        }
        else {
            setMedicineName("");
        }
    }, [formType, selectedData]);

    const calculateLandingCost = (price, gst, taxIncluded) => {
        const priceNumber = parseFloat(price);
        const gstNumber = parseFloat(gst);

        if (isNaN(priceNumber) || isNaN(gstNumber)) {
            return ''; // Return empty string if price or gst is not a number
        }

        let landingCost;
        if (taxIncluded) {
            landingCost = (priceNumber / (100 + gstNumber)) * 100;
        } else {
            landingCost = (priceNumber / 100) * (100 + gstNumber);
        }


        if (typeof landingCost === 'number') {
            return landingCost.toFixed(2);
        } else {
            return '';
        }
    };


    const handlePurchaseTaxIncludedChange = (e) => {
        const taxIncluded = e.target.checked;
        setPurchaseTaxIncluded(taxIncluded);
        const landingCost = calculateLandingCost(priceDetails.purchasePrice, gstRate, taxIncluded);
        setPriceDetails((prevDetails) => ({ ...prevDetails, landingCost }));
    };

    const handleGstRateChange = (e) => {
        const gstRateValue = e.target.value;
        setGstRate(gstRateValue);
        const landingCost = calculateLandingCost(priceDetails.purchasePrice, gstRateValue, purchaseTaxIncluded);
        setPriceDetails((prevDetails) => ({ ...prevDetails, landingCost }));
    };

    const handlePurchasePriceChange = (event) => {

        const purchasePrice = event.target.value;
        setPriceDetails((prevDetails) => ({ ...prevDetails, purchasePrice }));

        const landingCost = calculateLandingCost(purchasePrice, gstRate, purchaseTaxIncluded);
        setPriceDetails((prevDetails) => ({ ...prevDetails, landingCost }));
    };


    const calculateRetailPriceAndMargin = (retailDiscount, mrp) => {
        const retailDiscountNumber = parseFloat(retailDiscount);
        const mrpNumber = parseFloat(mrp);

        if (isNaN(retailDiscountNumber) || isNaN(mrpNumber)) {
            return {
                retailPrice: '',
                retailMargin: ''
            };
        }

        const retailPrice = mrpNumber - (mrpNumber * (retailDiscountNumber / 100));
        const retailMargin = Math.abs(retailPrice - mrpNumber);

        return {
            retailPrice: retailPrice.toFixed(2),
            retailMargin: retailMargin.toFixed(2)
        };
    };
    const handleRetailDiscountChange = (e) => {
        const retailDiscount = e.target.value;
        setPriceDetails((prevDetails) => ({ ...prevDetails, retailDiscount }));
        const { retailPrice, retailMargin } = calculateRetailPriceAndMargin(retailDiscount, priceDetails.mrp);
        setPriceDetails((prevDetails) => ({ ...prevDetails, retailPrice, retailMargin }));
    }

    const calculateWholeSalePriceAndMargin = (wholesalerDiscount, mrp) => {
        const wholesalerDiscountNumber = parseFloat(wholesalerDiscount);
        const mrpNumber = parseFloat(mrp);

        if (isNaN(wholesalerDiscountNumber) || isNaN(mrpNumber)) {
            return {
                wholesalerPrice: '',
                wholesalerMargin: ''
            };
        }

        const wholesalerPrice = mrpNumber - (mrpNumber * (wholesalerDiscountNumber / 100));
        const wholesalerMargin = Math.abs(wholesalerPrice - mrpNumber);
        console.log(wholesalerMargin);
        return {
            wholesalerPrice: wholesalerPrice.toFixed(2),
            wholesalerMargin: wholesalerMargin.toFixed(2)
        };
    };
    const handleWholeSaleDiscountChange = (e) => {
        const wholesalerDiscount = e.target.value;
        setPriceDetails((prevDetails) => ({ ...prevDetails, wholesalerDiscount }));
        const { wholesalerPrice, wholesalerMargin } = calculateWholeSalePriceAndMargin(wholesalerDiscount, priceDetails.mrp);
        setPriceDetails((prevDetails) => ({ ...prevDetails, wholesalerPrice, wholesalerMargin }));
    };


    const handleOpeningBalanceChange = (field, value) => {
        setOpeningBalance((prevOpeningBalance) => ({
            ...prevOpeningBalance,
            [field]: value,
        }));
    };

    return (
        <>
            <Toaster />
            {/* <DialogContentText>
                {formType === "edit"
                    ? "Edit the medicine details"
                    : "To create a new medicine, please fill in the details here."}
            </DialogContentText> */}
            <Grid item xs={12}>
                <DialogContentText className="dialogTitle-popupForm">Product Information</DialogContentText>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Item Code */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Item Code"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)}
                        />
                    </Grid>
                    {/* Medicine Name */}
                    <Grid item xs={12} md={4}>
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
                    {/* Category */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            select
                            label="Category"
                            variant="standard"
                            fullWidth
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {category.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Medicine Type */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            select
                            label="Medicine Type"
                            variant="standard"
                            fullWidth
                            value={selectedMedicineType}
                            onChange={(e) => setSelectedMedicineType(e.target.value)}
                        >
                            {medicineType.map((meditype) => (
                                <MenuItem key={meditype._id} value={meditype._id}>
                                    {meditype.mediType}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Manufacturer */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            select
                            label="Manufacturer"
                            variant="standard"
                            fullWidth
                            value={selectedManufacturer}
                            onChange={(e) => setSelectedManufacturer(e.target.value)}
                        >
                            {manufacturer.map((manu) => (
                                <MenuItem key={manu._id} value={manu._id}>
                                    {manu.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Brand */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            select
                            label="Brand"
                            variant="standard"
                            fullWidth
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            {brand.map((brands) => (
                                <MenuItem key={brands._id} value={brands._id}>
                                    {brands.brand}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* Unit */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            select
                            label="Unit"
                            variant="standard"
                            fullWidth
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                        >
                            {unit.map((units) => (
                                <MenuItem key={units._id} value={units._id}>
                                    {units.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* GST Rate */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="GST Rate (%)"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={gstRate}
                            //  onChange={(e)=>setGstRate(e.target.value)}

                            onChange={handleGstRateChange}
                            select
                        >
                            {/* {gstRateData.map((gst) => (
                                <MenuItem key={gst._id} value={gst._id}>
                                    {gst.gstRate}
                                </MenuItem>
                            ))} */}
                            <MenuItem value="5%">5%</MenuItem>
                            <MenuItem value="12%">12%</MenuItem>
                            <MenuItem value="18%">18%</MenuItem>
                        </TextField>
                    </Grid>
                    {/* Tax Included Details */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={purchaseTaxIncluded}
                                    onChange={handlePurchaseTaxIncludedChange}
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
                    {/* Product Photos */}
                    <Grid item xs={12} md={12} lg={12}>
                        {/* <TextField
                            margin="dense"
                            label="Product Photo"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputProps={{ accept: "image/*", multiple: true }}
                            value = {photos}
                            onChange ={(e)=>setPhotos(e.target.value)}
                            
                        /> */}
                        <TextField
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                            id="upload-photo"
                            onChange={handleFileChange}
                        />
                        <TextField
                            label="Product Photo"
                            variant="standard"
                            type="text"
                            fullWidth
                            value={photoFileName}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                  <Button variant="contained" color="primary" onClick={handleTextFieldClick}>
                                    Upload
                                  </Button>
                                ),
                              }}
                        />                        
                    </Grid>
                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>

                    {/* Stock Quantity Net Weight */}
                    <Grid item xs={12} md={4}>
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
                    {/* Batch No */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Batch No"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={batchNo}
                            onChange={(e) => setBatchNumber(e.target.value)}
                        />
                    </Grid>
                    {/* Expiry Date */}
                    <Grid item xs={12} md={4}>
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

                    {/* Ingredients */}
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            label="Ingredients"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={ingredients}
                            onChange={handleInputChange}
                        />
                        <Box display="flex" flexWrap="wrap" mt={1}>
                            {ingredientList.map((ingredient, index) => (
                                <Chip key={index} label={ingredient} style={{ margin: 2 }} />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogContentText className="dialogTitle-popupForm">Price Details</DialogContentText>
                    </Grid>

                    {/* Price Details */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Purchase Price"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.purchasePrice}

                            onChange={handlePurchasePriceChange}
                        />
                    </Grid>
                    {/* Landing Cost */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Landing Cost"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.landingCost}

                        />
                    </Grid>
                    {/* MRP */}
                    <Grid item xs={12} md={4}>
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
                    {/* Retail Discount */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Retail Discount (%)"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.retailDiscount}
                            onChange={handleRetailDiscountChange}
                        />
                    </Grid>
                    {/* Retail Price */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Retail Price"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.retailPrice}

                        />
                    </Grid>
                    {/* Retail Margin */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Retail Margin (%)"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.retailMargin}
                        // onChange={(e) => handlePriceDetailChange("retailMargin", e.target.value)}

                        />
                    </Grid>

                    {/* Wholesaler Discount */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Wholesaler Discount (%)"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.wholesalerDiscount}
                            onChange={handleWholeSaleDiscountChange}
                        />
                    </Grid>
                    {/* Wholesaler Price */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Wholesaler Price"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.wholesalerPrice}


                        />
                    </Grid>
                    {/* Wholesaler Margin */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Wholesaler Margin"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={priceDetails.wholesalerMargin}


                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                        <DialogContentText className="dialogTitle-popupForm">Opening Balance</DialogContentText>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Opening Balance"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={openingBalance.particular}
                            onChange={(e) => handleOpeningBalanceChange("particular", e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            margin="dense"
                            label="Quantity"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={openingBalance.quantity}
                            onChange={(e) => handleOpeningBalanceChange("quantity", e.target.value)}
                        />
                    </Grid>
                    {/* Rate */}
                    <Grid item xs={12} md={4} lg={4}>
                        <TextField
                            margin="dense"
                            label="Rate"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={openingBalance.rate}
                            onChange={(e) => handleOpeningBalanceChange("rate", e.target.value)}
                        />
                    </Grid>
                    {/* Units */}
                    <Grid item xs={12} md={4} lg={4}>
                        <TextField
                            margin="dense"
                            label="Units"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={openingBalance.units}
                            onChange={(e) => handleOpeningBalanceChange("units", e.target.value)}
                        />
                    </Grid>
                    {/* Amount */}
                    <Grid item xs={12} md={4} lg={4}>
                        <TextField
                            margin="dense"
                            label="Amount"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={openingBalance.amount}
                            onChange={(e) => handleOpeningBalanceChange("amount", e.target.value)}
                        />
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button type="submit" color="primary" variant="contained" className="btn-design">
                        {formType === "edit medicine" ? "Update Medicine" : "Add Medicine"}
                    </Button>
                </DialogActions>
            </form>
        </>
    );
};

export default AddMedicineModal;

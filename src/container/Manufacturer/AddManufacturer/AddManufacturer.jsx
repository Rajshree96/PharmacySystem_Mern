// Import necessary packages and components
import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    MenuItem,
    Container,
    Tooltip,
    Divider,
    createTheme,
    FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { makeStyles } from "@mui/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";

// Responsive design helper functions
const responsiveFontSize = (minSize, maxSize) => {
    return `calc(${minSize}px + (${maxSize} - ${minSize}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsiveMargin = (minMargin, maxMargin) => {
    return `calc(${minMargin}px + (${maxMargin} - ${minMargin}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsivePadding = (minPadding, maxPadding) => {
    return `calc(${minPadding}px + (${maxPadding} - ${minPadding}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsiveHeight = (minHeight, maxHeight) => {
    return `calc(${minHeight}px + (${maxHeight} - ${minHeight}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsiveWidth = (minWidth, maxWidth) => {
    return `calc(${minWidth}px + (${maxWidth} - ${minWidth}) * ((100vw - 320px) / (1280 - 320)))`;
};

const registrationTypes = [
    { value: "Composition", label: "Composition" },
    { value: "Regular", label: "Regular" },
];

const accountHeadTypes = [
    { value: "Bank Accounts", label: "Bank Accounts" },
    { value: "Bank OCC", label: "Bank OCC" },
    { value: "Bank Account", label: "Bank Account" },
    { value: "Capital Account", label: "Capital Account" },
    { value: "Cash in Hand", label: "Cash in Hand" },
    { value: "Current Assets", label: "Current Assets" },
    { value: "Current Liabilities", label: "Current Liabilities" },
    { value: "Deposit ( Assets)", label: "Deposit ( Assets)" },
    { value: "Direct Expenses", label: "Direct Expenses" },
    { value: "Direct Income", label: "Direct Income" },
    { value: "Fixed Assets", label: "Fixed Assets" },
    { value: "Indirect Expenses", label: "Indirect Expenses" },
    { value: "Indirect Income", label: "Indirect Income" },
    { value: "Investment", label: "Investment" },
    { value: "Loans & Advances ( Assets)", label: "Loans & Advances ( Assets)" },
    { value: "Loan ( Liability)", label: "Loan ( Liability)" },
    { value: "Provision", label: "Provision" },
    { value: "Profit & Loss Account", label: "Profit & Loss Account" },
    { value: "Purchase Account", label: "Purchase Account" },
    { value: "Reserve & Surplus", label: "Reserve & Surplus" },
    { value: "Retain earning", label: "Retain earning" },
    { value: "Sales Accounts", label: "Sales Accounts" },
    { value: "Secured Loan", label: "Secured Loan" },
    { value: "Stock in hand", label: "Stock in hand" },
    { value: "Sundry Creditors", label: "Sundry Creditors" },
    { value: "Sundry Debtors", label: "Sundry Debtors" },
    { value: "Suspense Account", label: "Suspense Account" },
    { value: "Unsecured Loans", label: "Unsecured Loans" },    
];

const theme = createTheme({
    spacing: 0,
});

const useStyles = makeStyles({
    formContainer: {
        // padding: responsivePadding(5,5),
        borderRadius: 2,
    },
    sectionTitle: {
        display: "flex",
        alignItems: "center",
        marginBottom: responsiveMargin(16, 32),
        color: "#086070",
    },
    sectionIcon: {
        marginRight: responsiveMargin(8, 16),
        fontSize: responsiveFontSize(20, 30),
        color: "#086070",
    },
    // divider: {
    //   marginTop:'30px',
    //   width: 'auto'
    // },
    formControl: {
        minWidth: responsiveWidth(150, 200),
        marginBottom: responsiveMargin(16, 32),
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "start",
        marginTop: responsiveMargin(32, 48),
    },
    button: {
        fontSize: responsiveFontSize(10, 15),
        padding: responsivePadding(5, 8),
        color: "white",
    },
    textFieldStyle: {
        height: "50px",
        width: "100%",
        border: "1px solid #c4c4c4",
        borderRadius: "4px",
        color: "grey",
    },
});

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
        .min(1, "Name must be at least 1 character")
        .required("Name is required"),
    state: Yup.string().required("State is required"),
    registrationType: Yup.string().required("Registration Type is required"),
    gstin: Yup.string()
        .matches(/^[A-Z0-9]{15}$/, "GSTIN must be 15 characters long and contain only capital letters and numbers")
        .required("GSTIN is required"),
});

// Main component
const AddManufacturer = ({ formType, selectedData, setSuccess }) => {
    const classes = useStyles();
    const [manufacturersName, setManufacturersName] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAddress, setBankAddress] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [gstin, setGstin] = useState("");
    const [openingBalance, setOpeningBalance] = useState("");
    const [registrationType, setRegistrationType] = useState("");
    const [accountHead, setAccountHead] = useState("");
    const [nameError, setNameError] = useState("");
    const [gstError, setGstError] = useState("");
    const [stateError, setStateError] = useState("");
    const [registrationTypeError, setRegistrationTypeError] = useState("");

    useEffect(() => {
        if (formType === "edit manufacturer" && selectedData) {
            // setManufacturersName(selectedData.name);
            setSelectedCountry(selectedData.country);
            setSelectedState(selectedData.state);
            setName(selectedData.name);
            setAddress(selectedData.address);
            setPinCode(selectedData.pinCode);
            setContact(selectedData.contact);
            setEmail(selectedData.email);
            setWebsite(selectedData.website);
            setAccountHead(selectedData.accountHead);
            setBankName(selectedData.bankingDetails.bankName);
            setBankAddress(selectedData.bankingDetails.bankAddress);
            setIfscCode(selectedData.bankingDetails.ifscCode);
            setAccountHolderName(selectedData.bankingDetails.accountHolderName);
            setAccountNumber(selectedData.bankingDetails.accountNumber);
            setGstin(selectedData.statutoryDetails.gstin);
            setOpeningBalance(selectedData.openingBalance.asOnFirstDayOfFinancialYear);
            setRegistrationType(selectedData.statutoryDetails.registrationType);
        }
        else {
            resetForm();
        }
    }, [formType, selectedData]);

    const resetForm = () => {
        // setManufacturersName("");
        setSelectedCountry("");
        setSelectedState("");
        setName("");
        setAddress("");
        setPinCode("");
        setContact("");
        setEmail("");
        setWebsite("");
        setBankName("");
        setBankAddress("");
        setIfscCode("");
        setAccountHolderName("");
        setAccountNumber("");
        setGstin("");
        setOpeningBalance("");
        setRegistrationType("");
        setAccountHead("");
    };

    const handleCountryChange = (val) => {
        setSelectedCountry(val);
        setSelectedState("");
    };

    const handleStateChange = (val) => {
        setSelectedState(val);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Validate name
    //         await validationSchema.validateAt("name", {name});
    //         setNameError(""); // Clear any previous error
    //     } catch (err) {
    //         setNameError(err.message); // Set error message for name
    //     }

    //     try {
    //         // Validate gstin
    //         await validationSchema.validateAt("gstin", {gstin});
    //         setGstError("");
    //     } catch (err) {
    //         setGstError(err.message);
    //     }

    //     try {
    //         // Validate state
    //         await validationSchema.validateAt("state", {state: selectedState});
    //         setStateError("");
    //     } catch (err) {
    //         setStateError(err.message);
    //     }

    //     try {
    //         // Validate registration type
    //         await validationSchema.validateAt("registrationType", {registrationType});
    //         setRegistrationTypeError("");
    //     } catch (err) {
    //         setRegistrationTypeError(err.message);
    //     }

    //     // Check overall validity after individual validations
    //     const isValid = await validationSchema.isValid({name, gstin, state: selectedState, registrationType});

    //     if (!isValid) {
    //         // Handle any additional logic if the overall form is not valid
    //         return;
    //     }
    //     const manufacturerData = {
    //         name: name,
    //         address: address,
    //         state: selectedState,
    //         pincode: pinCode,
    //         country: selectedCountry,
    //         contact: contact,
    //         email: email,
    //         website: website,
    //         bankingDetails: {
    //             bankName: bankName,
    //             bankAddress: bankAddress,
    //             ifscCode: ifscCode,
    //             accountHolderName: accountHolderName,
    //             accountNumber: accountNumber,
    //         },
    //         statutoryDetails: {
    //             registrationType: registrationType,
    //             gstin: gstin,
    //         },
    //         openingBalance: {
    //             asOnFirstDayOfFinancialYear: openingBalance,
    //         },
    //     };

    // try {
    //     const auth = JSON.parse(localStorage.getItem("auth"));
    //     const response = await axios.post("http://localhost:4000/api/v1/admin/add-manufacturer", manufacturerData, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${auth.token}`,
    //         },
    //     });
    //     if (response.status === 201) {
    //         console.log("Manufacturer added successfully:", response.data);
    //         setSelectedCountry("");
    //         setSelectedState("");
    //         setName("");
    //         setAddress("");
    //         setPinCode("");
    //         setContact("");
    //         setEmail("");
    //         setWebsite("");
    //         setBankName("");
    //         setBankAddress("");
    //         setIfscCode("");
    //         setAccountHolderName("");
    //         setAccountNumber("");
    //         setGstin("");
    //         setOpeningBalance("");
    //         setRegistrationType("");
    //         toast.success("manufacturer added successfully");
    //     }
    // } catch (error) {
    //     console.log("Error adding manufacturer:", error);
    // }
    // };


    const addManufacturer = async (manufacturerData) => {
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const response = await axios.post("http://localhost:4000/api/v1/admin/add-manufacturer", manufacturerData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            console.log("response-----  ", response);
            if (response.status === 201) {
                console.log("Manufacturer added successfully:", response.data);
                setSelectedCountry("");
                setSelectedState("");
                setName("");
                setAddress("");
                setPinCode("");
                setContact("");
                setEmail("");
                setWebsite("");
                setAccountHead("");
                setBankName("");
                setBankAddress("");
                setIfscCode("");
                setAccountHolderName("");
                setAccountNumber("");
                setGstin("");
                setOpeningBalance("");
                setRegistrationType("");
                toast.success("manufacturer added successfully");
            }
        } catch (error) {
            console.log("Error adding manufacturer:", error);
        }
    }


    const editManufacturer = async (id, manufacturer) => {
        console.log("Manufacturer@@@@", manufacturer._id);

        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth || !auth.token) {
            console.error("No token found in local storage");
            return;
        }

        // // Check if the _id field is defined
        // if (!manufacturer.id) {
        //     console.error("Manufacturer _id is undefined");
        //     return;
        // }

        try {
            const response = await axios.put(`http://localhost:4000/api/v1/admin/update/manufacturer/${id}`, manufacturer, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            console.log("Manufacturer updated:", response.data);
            console.log(manufacturer);
            // setManufacturers((prevManufacturer) =>
            //     prevManufacturer.map((manu) => (manu._id === manufacturer._id ? manufacturer : manu))
            // );
        } catch (error) {
            console.error("Error updating manufacturer:", error);
        }
    };

    const handleSaveManufacturer = async (e) => {
        try {
            e.preventDefault();
            // Validate name
            await validationSchema.validateAt("name", { name });
            setNameError(""); // Clear any previous error
        } catch (err) {
            setNameError(err.message); // Set error message for name
        }

        try {
            // Validate gstin
            await validationSchema.validateAt("gstin", { gstin });
            setGstError("");
        } catch (err) {
            setGstError(err.message);
        }

        try {
            // Validate state
            await validationSchema.validateAt("state", { state: selectedState });
            setStateError("");
        } catch (err) {
            setStateError(err.message);
        }

        try {
            // Validate registration type
            await validationSchema.validateAt("registrationType", { registrationType });
            setRegistrationTypeError("");
        } catch (err) {
            setRegistrationTypeError(err.message);
        }

        // Check overall validity after individual validations
        const isValid = await validationSchema.isValid({ name, gstin, state: selectedState, registrationType });

        if (!isValid) {
            // Handle any additional logic if the overall form is not valid
            return;
        }
        const manufacturerData = {
            name: name,
            address: address,
            state: selectedState,
            pincode: pinCode,
            country: selectedCountry,
            contact: contact,
            email: email,
            website: website,
            bankingDetails: {
                bankName: bankName,
                bankAddress: bankAddress,
                ifscCode: ifscCode,
                accountHolderName: accountHolderName,
                accountNumber: accountNumber,
            },
            statutoryDetails: {
                registrationType: registrationType,
                gstin: gstin,
            },
            openingBalance: {
                asOnFirstDayOfFinancialYear: openingBalance,
            },
        };
        try {
            if (formType === "edit manufacturer") {

                await editManufacturer(selectedData._id, manufacturerData);
                console.log("Manufacturer updated successfully");
                setSuccess(true);
                // toast.success("Manufacturer edited successfully");


            }
            else {

                await addManufacturer(manufacturerData);
                console.log("Manufacturer added successfully");
                setSuccess(true);
                // toast.success("Manufacturer added successfully");
            }


            // setManufacturersName("");
        } catch (error) {
            console.error(`Error ${formType === "edit manufacturer" ? "editing" : "adding"}  manufacturer:`, error);
        }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const breadcrumbs = ["Manufacturer", "Add Manufacturer"];

    // Edit mode -> Form styles changes conditionally

    const editModeStyles =
        formType === "edit manufacturer"
            ? {
                padding: responsivePadding(16, 32), // Decrease padding in edit mode
                headingFontSize: responsiveFontSize(15, 28), // Change heading font size in edit mode
                buttonColor: "red !important", // Change button color in edit mode
            }
            : {};

    const paperStyles =
        formType === "edit manufacturer"
            ? {
                padding: responsivePadding(0, 0),
                borderRadius: 2,
                boxShadow: "none",
                // backgroundColor:  "#f0f4f8",
            }
            : {};

    return (
        <Container maxWidth="lg">
            <Toaster />
            <Box className={classes.formContainer}>
                <Paper elevation={3} sx={{ p: responsivePadding(24, 48), borderRadius: 2, ...paperStyles }}>
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            component={motion.h4}
                            variants={itemVariants}
                        >
                            Manufacturer
                        </Typography>
                        <BreadcrumbContainer breadcrumbs={breadcrumbs} />
                        <form >
                            <motion.div variants={itemVariants}>
                                <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                                    <BusinessIcon className={classes.sectionIcon} /> Manufacturer Details
                                </Typography>
                                {/* name */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="name"
                                            fullWidth
                                            label="Name*"
                                            variant="outlined"
                                            error={!!nameError}
                                            helperText={nameError}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Address */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="address"
                                            fullWidth
                                            label="Address"
                                            variant="outlined"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Country */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl fullWidth>
                                            <CountryDropdown
                                                value={selectedCountry}
                                                onChange={handleCountryChange}
                                                label="Country"
                                                className={classes.textFieldStyle}
                                            />
                                        </FormControl>
                                    </Grid>
                                    {/* State */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl fullWidth>
                                            <RegionDropdown
                                                country={selectedCountry}
                                                value={selectedState}
                                                onChange={handleStateChange}
                                                disabled={!selectedCountry}
                                                label="State*"
                                                className={classes.textFieldStyle}
                                            />
                                            {stateError && <Typography color="error">{stateError}</Typography>}
                                        </FormControl>
                                    </Grid>
                                    {/* Pin Code */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="pinCode"
                                            fullWidth
                                            label="Pin Code"
                                            variant="outlined"
                                            value={pinCode}
                                            onChange={(e) => setPinCode(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Contact */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="contact"
                                            fullWidth
                                            label="Contact"
                                            variant="outlined"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Email */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="email"
                                            fullWidth
                                            label="Email"
                                            variant="outlined"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Website */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="website"
                                            fullWidth
                                            label="Website"
                                            variant="outlined"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Account Head */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            select
                                            name="accountHead"
                                            fullWidth
                                            label="Account Head"
                                            variant="outlined"
                                            value={accountHead}
                                            onChange={(e) => setAccountHead(e.target.value)}
                                        >
                                            {accountHeadTypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

                            <motion.div variants={itemVariants}>
                                {/* Bank Details */}
                                <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                                    <AccountBalanceIcon className={classes.sectionIcon} /> Bank Details
                                </Typography>
                                {/* Bank Name */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="bankName"
                                            fullWidth
                                            label="Bank Name"
                                            variant="outlined"
                                            value={bankName}
                                            onChange={(e) => setBankName(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Bank Address */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="bankAddress"
                                            fullWidth
                                            label="Bank Address"
                                            variant="outlined"
                                            value={bankAddress}
                                            onChange={(e) => setBankAddress(e.target.value)}
                                        />
                                    </Grid>
                                    {/* IFSC Code */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="ifscCode"
                                            fullWidth
                                            label="IFSC Code"
                                            variant="outlined"
                                            value={ifscCode}
                                            onChange={(e) => setIfscCode(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Account Holder Name */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="accountHolderName"
                                            fullWidth
                                            label="Account Holder Name"
                                            variant="outlined"
                                            value={accountHolderName}
                                            onChange={(e) => setAccountHolderName(e.target.value)}
                                        />
                                    </Grid>
                                    {/* Account Number */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="accountNumber"
                                            fullWidth
                                            label="Account Number"
                                            variant="outlined"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

                            <motion.div variants={itemVariants}>
                                {/* GST Details */}
                                <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                                    <DescriptionIcon className={classes.sectionIcon} /> GST Details
                                </Typography>

                                <Grid container spacing={3}>
                                    {/* Registration Type */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="registrationType"
                                            select
                                            fullWidth
                                            label="Registration Type*"
                                            variant="outlined"
                                            value={registrationType}
                                            onChange={(e) => setRegistrationType(e.target.value)}
                                        >
                                            {registrationTypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        {registrationTypeError && (
                                            <Typography color="error">{registrationTypeError}</Typography>
                                        )}
                                    </Grid>
                                    {/* GSTIN */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="gstin"
                                            fullWidth
                                            label="GSTIN*"
                                            variant="outlined"
                                            inputProps={{ style: { textTransform: "uppercase" } }}
                                            error={!!gstError}
                                            helperText={gstError}
                                            value={gstin}
                                            onChange={(e) => setGstin(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

                            <motion.div variants={itemVariants}>
                                {/* Opening Balance */}
                                <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                                    <AccountBalanceWalletIcon className={classes.sectionIcon} /> Opening Balance
                                </Typography>
                                {/* Opening Balance */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            name="openingBalance"
                                            fullWidth
                                            label="Opening Balance"
                                            variant="outlined"
                                            value={openingBalance}
                                            onChange={(e) => setOpeningBalance(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <Box className={classes.buttonContainer}>
                                <motion.div variants={itemVariants}>
                                    <Tooltip title="Save">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            startIcon={<SaveIcon />}
                                            className="btn-design-green"
                                            // onClick={handleSubmit}
                                            onClick={handleSaveManufacturer}
                                        >
                                            {formType === "edit manufacturer" ? "Update " : "Create "}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Cancel">
                                        <Button
                                            type="reset"
                                            variant="outlined"
                                            startIcon={<CancelIcon />}
                                            sx={{
                                                mx: 1,
                                                backgroundColor: editModeStyles.buttonColor,
                                            }}
                                            style={{ backgroundColor: "#086070", color: "white" }}
                                        >
                                            Cancel
                                        </Button>
                                    </Tooltip>
                                </motion.div>
                            </Box>
                        </form>
                    </motion.div>
                </Paper>
            </Box>
        </Container>
    );
};
export default AddManufacturer;

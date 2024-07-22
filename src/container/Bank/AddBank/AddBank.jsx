// Import necessary packages and components
import React, { useState, useEffect } from "react";
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
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import axios from "axios";

// Responsive design helper functions
const responsiveFontSize = (minSize, maxSize) => {
  return `calc(${minSize}px + (${maxSize} - ${minSize}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsiveMargin = (minMargin, maxMargin) => {
  return `calc(${minMargin}px + (${maxMargin} - ${minMargin}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsivePadding = (minPadding, maxPadding) => {
  return ` calc(${minPadding}px + (${maxPadding} - ${minPadding}) * ((100vw - 320px) / (1280 - 320)))`;
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
    color: '#086070'
  },
  sectionIcon: {
    marginRight: responsiveMargin(8, 16),
    fontSize: responsiveFontSize(20, 30),
    color: '#086070'
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
    color: 'white',

  },
  textFieldStyle: {
    height: '50px',
    width: '100%',
    border: '1px solid #c4c4c4',
    borderRadius: '4px',
    color: 'grey'
  }
});

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, "Pin Code must be exactly 6 digits")
    .required("Pin Code is required"),
  accountHolderName: Yup.string().required("Account Holder Name is required"),
  accountNumber: Yup.string().required("Account Number is required"),
  ifscCode: Yup.string().required("IFSC Code is required"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Contact must be exactly 10 digits")
    .required("Contact is required"),
  openingBalance: Yup.number().required("Opening Balance is required"),
});


// Main component
const AddBank = ({formType, selectedData, setSuccess}) => {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    address: "",
    pinCode: "",
    contact: "",
    ifscCode: "",
    accountHolderName: "",
    accountNumber: "",
    openingBalance: "",
  });

  useEffect(() => {
    if (formType === "edit bank" && selectedData) {
      setSelectedCountry(selectedData.country);
      setSelectedState(selectedData.state);
      setBankDetails({
        bankName: selectedData.bankName,
        address: selectedData.address,
        pinCode: selectedData.pinCode,
        contact: selectedData.mobileNo,
        ifscCode: selectedData.ifscCode,
        accountHolderName: selectedData.accountHolderName,
        accountNumber: selectedData.accountNumber,
        openingBalance: selectedData.openingBalance,
      });
    } else {
      resetForm();
    }
  }, [formType, selectedData]);

const resetForm = () => {
  setSelectedCountry("");
  setSelectedState("");
  setBankDetails({
    bankName: "",
    address: "",
    pinCode: "",
    contact: "",
    ifscCode: "",
    accountHolderName: "",
    accountNumber: "",
    openingBalance: "",
  });

  
};
  const handleCountryChange = (val) => {
    setSelectedCountry(val);
    setSelectedState("");
  };

  const handleStateChange = (val) => {
    setSelectedState(val);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const breadcrumbs = ["Bank", "Add Bank"];
  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    
      const bankDetailData = {
      bankName: bankDetails.bankName,
      address: bankDetails.address,
      state: selectedState,
      country: selectedCountry,
      pinCode: bankDetails.pinCode,
      accountHolderName: bankDetails.accountHolderName,
      accountNumber: bankDetails.accountNumber,
      ifscCode: bankDetails.ifscCode,
      mobileNo: bankDetails.contact,
      openingBalance: bankDetails.openingBalance,
      }
console.log("bank data", bankDetailData);

      const auth = JSON.parse(localStorage.getItem('auth'));
      const response = await axios.post('http://localhost:4000/api/v1/bank/add-bank',
        bankDetailData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`
          }
        }
      );
      console.log("API Response:", response.data);

      if (response.data.status === 201) {
        console.log("Bank added successfully:", response.data);
      setSuccess(true);
      resetForm();
      }
    } catch (error) {
      console.log("Error adding Bank:", error);
    }
  };

  const handleSaveAddBank = async () => {
    try {
        if (formType === "edit bank") {
            console.log("Bank updated successfully");
        }
        else {
            console.log("Bank added successfully");
        }
        // setSuccess(true);
        
    } catch (error) {
        console.error(`Error ${formType === "edit bank" ? "editing" : "adding"}  bank:`, error);
    }
};

   // Edit mode -> Form styles changes conditionally
   const editModeStyles =
   formType === "edit bank"
       ? {
             padding: responsivePadding(16, 32), // Decrease padding in edit mode
             headingFontSize: responsiveFontSize(15, 28), // Change heading font size in edit mode
             buttonColor: "red !important", // Change button color in edit mode
         }
       : {};

const paperStyles =
   formType === "edit bank"
       ? {
             padding: responsivePadding(0, 0),
             borderRadius: 2,
             boxShadow: "none",
             // backgroundColor:  "#f0f4f8",
         }
       : {};
       
  return (
    <Container maxWidth="lg">
      <Box className={classes.formContainer}>
        <Paper elevation={3} sx={{ p: responsivePadding(24, 48), borderRadius: 2, ...paperStyles }}>
          <Typography variant="h4" gutterBottom component={motion.h4} variants={itemVariants}>
            Bank
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <Formik
              initialValues={{
                bankName: bankDetails.bankName,
    address: bankDetails.address,
    state: selectedState,
    country: selectedCountry,
    pinCode: bankDetails.pinCode,
    accountHolderName: bankDetails.accountHolderName,
    accountNumber: bankDetails.accountNumber,
    ifscCode: bankDetails.ifscCode,
    contact: bankDetails.contact,
    openingBalance: bankDetails.openingBalance,
               
                // name: "",
                // address: "",
                // state: "",
                // pinCode: "",
                // country: "",
                // contact: "",
                // email: "",
                // website: "",
                // bankName: "",
                // bankAddress: "",
                // ifscCode: "",
                // accountHolderName: "",
                // accountNumber: "",
                // gstin: "",
                // openingBalance: "",
                // registrationType: "",
                bankDetails
              }}
              validationSchema={validationSchema}
              // onSubmit={(values) => {
              //   console.log(values);
              //   // Handle form submission
              // }}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form>
                  <motion.div variants={itemVariants}>
                    {/* name */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="bankName"
                          as={TextField}
                          fullWidth
                          label="Name"
                          variant="outlined"
                          error={touched.bankName && !!errors.bankName}
                          helperText={touched.bankName && errors.bankName}
                          value={bankDetails.bankName}
                          onChange={handleChange}
                          // onChange={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      {/* Address */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="address"
                          as={TextField}
                          fullWidth
                          label="Address"
                          variant="outlined"
                          value={bankDetails.address}
                          onChange={handleChange}
                          // onChange={(e) => setAddress(e.target.value)}
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
                            label="State"
                            className={classes.textFieldStyle}
                          />
                          {touched.state && errors.state && (
                            <Typography variant="caption" color="error">
                              {errors.state}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                      {/* Pin Code */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="pinCode"
                          as={TextField}
                          fullWidth
                          label="Pin Code"
                          variant="outlined"
                          value={bankDetails.pinCode}
                          // onChange={(e) => setPinCode(e.target.value)}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                  <Divider sx={{ marginTop: '40px', marginBottom: '30px' }} />

                  <motion.div variants={itemVariants}>
                    {/* Bank Details */}
                    <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                      <AccountBalanceIcon className={classes.sectionIcon} /> Bank Details
                    </Typography>
                    {/* Bank Name */}
                    <Grid container spacing={3}>
                      {/* Account Holder Name */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="accountHolderName"
                          as={TextField}
                          fullWidth
                          label="Account Holder Name"
                          variant="outlined"
                          value={bankDetails.accountHolderName}
                          // onChange={(e) => setAccountHolderName(e.target.value)}
                          onChange={handleChange}
                        />
                      </Grid>
                      {/* Account Number */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="accountNumber"
                          as={TextField}
                          fullWidth
                          label="Account Number"
                          variant="outlined"
                          value={bankDetails.accountNumber}
                          // onChange={(e) => setAccountNumber(e.target.value)}
                          onChange={handleChange}
                        />
                      </Grid>
                      {/* IFSC Code */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="ifscCode"
                          as={TextField}
                          fullWidth
                          label="IFSC Code"
                          variant="outlined"
                          value={bankDetails.ifscCode}
                          // onChange={(e) => setIfscCode(e.target.value)}
                          onChange={handleChange}
                        />
                      </Grid>
                      {/* Contact */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="contact"
                          as={TextField}
                          fullWidth
                          label="Contact"
                          variant="outlined"
                          value={bankDetails.contact}
                          // onChange={(e) => setContact(e.target.value)}
                          onChange={handleChange}
                        />
                      </Grid>

                    </Grid>
                  </motion.div>
                  <Divider sx={{ marginTop: '40px', marginBottom: '30px' }} />

                  <motion.div variants={itemVariants}>
                    {/* Opening Balance */}
                    <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                      <AccountBalanceWalletIcon className={classes.sectionIcon} /> Opening Balance
                    </Typography>
                    {/* Opening Balance */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="openingBalance"
                          as={TextField}
                          fullWidth
                          label="Opening Balance"
                          variant="outlined"
                          value={bankDetails.openingBalance}
                          // onChange={(e) => setOpeningBalance(e.target.value)}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                  <Box className={classes.buttonContainer} >
                    <motion.div variants={itemVariants} >
                      <Tooltip title="Save" >
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          startIcon={<SaveIcon />}
                          // className={classes.button}
                          onClick={handleSubmit}
                          // onClick={handleSaveAddBank}
                          sx={{ mr: 2 }}
                          className="btn-design-green"
                        >
                          {formType === "edit customer" ? "Update " : "Save "}
                        </Button>
                      </Tooltip>
                    </motion.div>
                  </Box>
                </Form>
              )}
            </Formik>
          </motion.div>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddBank;
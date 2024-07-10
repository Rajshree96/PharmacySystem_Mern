// Import necessary packages and components
import React, { useState } from "react";
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

// Responsive design helper functions
const responsiveFontSize = (minSize, maxSize) => {
  return `calc(${minSize}px + (${maxSize} - ${minSize}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsiveMargin = (minMargin, maxMargin) => {
  return `calc(${minMargin}px + (${maxMargin} - ${minMargin}) * ((100vw - 320px) / (1280 - 320)))`;
};
const responsivePadding = (minPadding, maxPadding) => {
  return` calc(${minPadding}px + (${maxPadding} - ${minPadding}) * ((100vw - 320px) / (1280 - 320)))`;
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
    color:'#086070'
  },
  sectionIcon: {
    marginRight: responsiveMargin(8, 16),
    fontSize: responsiveFontSize(20, 30),
    color:'#086070'
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
    color:'white',
    
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
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(1, " Name must be at least 3 digits")
    .required("Name is required"),
  state: Yup.string().required("State is required"),
  gstin: Yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, "Invalid GSTIN")
    .min(15, "GSTIN must be at least 15 digits")
    .required("GSTIN is required"),
});

// Main component
const AddCustomer = () => {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

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
  const breadcrumbs = [ "Customer", "Add Customer" ];


  return (
    <Container maxWidth="lg">
      <Box className={classes.formContainer}>
        <Paper elevation={3} sx={{ p: responsivePadding(24, 48), borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom component={motion.h4} variants={itemVariants}>
               Customer
            </Typography>
        <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>           
            <Formik
              initialValues={{
                name: "",
                address: "",
                state: "",
                pinCode: "",
                country: "",
                contact: "",
                email: "",
                website: "",
                bankName: "",
                bankAddress: "",
                ifscCode: "",
                accountHolderName: "",
                accountNumber: "",
                gstin: "",
                openingBalance: "",
                registrationType: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                // Handle form submission
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <motion.div variants={itemVariants}>
                    
                    
                    {/* name */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="name"
                          as={TextField}
                          fullWidth
                          label="Name"
                          variant="outlined"
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
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
                        />
                      </Grid>
                      {/* Email */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="email"
                          as={TextField}
                          fullWidth
                          label="Email"
                          variant="outlined"
                        />
                      </Grid>
                      {/* Website */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="website"
                          as={TextField}
                          fullWidth
                          label="Website"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                  <Divider sx={{marginTop:'40px',marginBottom:'30px'}} />

                  <motion.div variants={itemVariants}>
                    {/* Bank Details */}
                    <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                      <AccountBalanceIcon className={classes.sectionIcon} /> Bank Details
                    </Typography>
                    {/* Bank Name */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="bankName"
                          as={TextField}
                          fullWidth
                          label="Bank Name"
                          variant="outlined"
                        />
                      </Grid>
                      {/* Bank Address */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="bankAddress"
                          as={TextField}
                          fullWidth
                          label="Bank Address"
                          variant="outlined"
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
                        />
                      </Grid>
                      {/* Account Holder Name */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="accountHolderName"
                          as={TextField}
                          fullWidth
                          label="Account Holder Name"
                          variant="outlined"
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
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                  <Divider sx={{marginTop:'40px',marginBottom:'30px'}} />

                  <motion.div variants={itemVariants}>
                    {/* GST Details */}
                    <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                      <DescriptionIcon className={classes.sectionIcon} /> GST Details
                    </Typography>

                    <Grid container spacing={3}>
                      {/* Registration Type */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="registrationType"
                          as={TextField}
                          select
                          fullWidth
                          label="Registration Type"
                          variant="outlined"
                          error={touched.registrationType && !!errors.registrationType}
                          helperText={touched.registrationType && errors.registrationType}
                        >
                          {registrationTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </Grid>
                      {/* GSTIN */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Field
                          name="gstin"
                          as={TextField}
                          fullWidth
                          label="GSTIN"
                          variant="outlined"
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          error={touched.gstin && !!errors.gstin}
                          helperText={touched.gstin && errors.gstin}
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                  <Divider sx={{marginTop:'40px',marginBottom:'30px'}} />

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
                          sx={{ mr: 2 }}
                          className="btn-design-green"
                        >
                          Create
                        </Button>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <Button
                          type="reset"
                          variant="outlined"
                          // color="secondary"
                          startIcon={<CancelIcon />}
                          // className={classes.button}
                          style={{backgroundColor:'#086070',color:'white'}}
                          className="btn-design"
                        >
                          Cancel
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

export default AddCustomer;
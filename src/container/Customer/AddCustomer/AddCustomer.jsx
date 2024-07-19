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
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

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
  { value: "Consumer", label: "Consumer" },
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
    .matches(
      /^[A-Z0-9]{15}$/,
      "GSTIN must be 15 characters long and contain only capital letters and numbers"
    )
    .required("GSTIN is required"),
});


// Main component
const AddCustomer = () => {
  const classes = useStyles();
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

  const [nameError, setNameError] = useState("");
  const [gstError, setGstError] = useState("");
  const [stateError, setStateError] = useState("");
  const [registrationTypeError, setRegistrationTypeError] = useState("");

  const handleCountryChange = (val) => {
    setSelectedCountry(val);
    setSelectedState("");
  };

  const handleStateChange = (val) => {
    setSelectedState(val);
    // setStateError('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const breadcrumbs = ["Customer", "Add Customer"];
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      try {
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

      const customerDetails = {
        customerDetails: {
          name: name,
          address: address,
          state: selectedState,
          pinCode: pinCode,
          country: selectedCountry,
          contact: contact,
          email: email,
          website: website,
          bankDetails: {
            bankName: bankName,
            bankAddress: bankAddress,
            ifscCode: ifscCode,
            accountHolderName: accountHolderName,
            accountNumber: accountNumber,
          },
          statutoryDetails: {
            stateRegistrationType: registrationType,
            gstin: gstin,
          },
          openingBalance: {
            asOnFirstDayOfFinancialYear: openingBalance,
          },
        }
      };
      console.log("data@@@@", customerDetails);

      const auth = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.post(
        "http://localhost:4000/api/v1/cutomer/add",
        customerDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("customer added successfully:", response.data);
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
        toast.success("customer added successfully");
      }
    } catch (error) {
      console.log("Error adding customer:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box className={classes.formContainer}>
        <Paper
          elevation={3}
          sx={{ p: responsivePadding(24, 48), borderRadius: 2 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            component={motion.h4}
            variants={itemVariants}
          >
            Customer
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >

            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants}>
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
                      {/* <RegionDropdown
                            country={selectedCountry}
                            value={selectedState}
                            onChange={handleStateChange}
                            disabled={!selectedCountry}
                            label="State"
                            className={classes.textFieldStyle}
                           
                            
                          />     */}
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
                </Grid>
              </motion.div>
              <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

              <motion.div variants={itemVariants}>
                {/* Bank Details */}
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sectionTitle}
                >
                  <AccountBalanceIcon className={classes.sectionIcon} />{" "}
                  Bank Details
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
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sectionTitle}
                >
                  <DescriptionIcon className={classes.sectionIcon} />
                  GST Details
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
                    {registrationTypeError && <Typography color="error">{registrationTypeError}</Typography>}
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
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sectionTitle}
                >
                  <AccountBalanceWalletIcon
                    className={classes.sectionIcon}
                  />{" "}
                  Opening Balance
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
                      style={{ backgroundColor: "#086070", color: "white" }}
                      className="btn-design"
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

export default AddCustomer;

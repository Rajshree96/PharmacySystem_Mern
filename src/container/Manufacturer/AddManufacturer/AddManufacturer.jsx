  // Import necessary packages and components
  import React, {useState} from "react";
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
  import {motion} from "framer-motion";
  import SaveIcon from "@mui/icons-material/Save";
  import CancelIcon from "@mui/icons-material/Cancel";
  import BusinessIcon from "@mui/icons-material/Business";
  import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
  import DescriptionIcon from "@mui/icons-material/Description";
  import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
  import {makeStyles} from "@mui/styles";
  import {Formik, Form, Field} from "formik";
  import * as Yup from "yup";
  import {CountryDropdown, RegionDropdown} from "react-country-region-selector";

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

  // Registration types for dropdown
  const registrationTypes = [
      {value: "Composition", label: "Composition"},
      {value: "Regular", label: "Regular"},
  ];

  // Theme for MUI components
  const theme = createTheme({
      spacing: 0,
  });

  // Custom styles for the form components
  const useStyles = makeStyles({
      formContainer: {
          padding: responsivePadding(16, 32),
          borderRadius: 2,
      },
      sectionTitle: {
          display: "flex",
          alignItems: "center",
          marginBottom: responsiveMargin(16, 32),
      },
      sectionIcon: {
          marginRight: responsiveMargin(8, 16),
          fontSize: responsiveFontSize(20, 30),
      },
      divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      formControl: {
          minWidth: responsiveWidth(150, 200),
          marginBottom: responsiveMargin(16, 32),
      },
      buttonContainer: {
          display: "flex",
          justifyContent: "flex-end",
          marginTop: responsiveMargin(32, 48),
      },
      button: {
          fontSize: responsiveFontSize(14, 18),
          padding: responsivePadding(8, 12),
      },
  });

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
      name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
      .min(3, " Name must be at least 3 digits")
      .required("Name is required"),
      address: Yup.string().required("Address is required"),
      state: Yup.string().required("State is required"),
      pinCode: Yup.string()
      .matches(/^\d{6}$/, "Only numbers are allowed")
      .min(6, " Pin Code must be at least 6 digits")
      .required("Pin Code is required"),
      country: Yup.string().required("Country is required"),
      contact: Yup.string()
      .matches(/^\d{10}$/, "Contact must be exactly 10 digits")
      .required("Contact is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      website: Yup.string().url("Invalid URL format"),
      bankName: Yup.string().required("Bank Name is required"),
      bankAddress: Yup.string().required("Bank Address is required"),
      ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
      .required("IFSC Code is required"),
      accountHolderName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
      .min(3, "Account Holder Name must be at least 3 digits")
      .required("Account Holder Name is required"),
      accountNumber: Yup.string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .min(11, "Account Number must be at least 11 digits")
      .max(18, "Account Number must be at most 18 digits")
      .required("Account Number is required"),
      gstin: Yup.string()
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, "Invalid GSTIN")
      .min(15, "GSTIN must be at least 15 digits")
      .required("GSTIN is required"),
      openingBalance: Yup.number().typeError("Opening Balance must be a number").required("Opening Balance is required"),
  });

  // Main component
  const AddManufacturer = () => {
      const classes = useStyles();
      const [ selectedCountry, setSelectedCountry ] = useState("");
      const [ selectedState, setSelectedState ] = useState("");

      const handleCountryChange = (val) => {
          setSelectedCountry(val);
          setSelectedState(""); // Reset state when country changes
      };

      const handleStateChange = (val) => {
          setSelectedState(val);
      };

      const containerVariants = {
          hidden: {opacity: 0},
          visible: {opacity: 1, transition: {duration: 0.5, staggerChildren: 0.1}},
      };

      const itemVariants = {
          hidden: {opacity: 0, y: 20},
          visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
      };

      return (
          <Container maxWidth="lg">
              <Box className={classes.formContainer}>
                  <Paper elevation={3} sx={{p: responsivePadding(24, 48), borderRadius: 2}}>
                      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                          <Typography variant="h4" gutterBottom component={motion.h4} variants={itemVariants}>
                              Add Manufacturer
                          </Typography>
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
                              {({errors, touched}) => (
                                  <Form>
                                      <motion.div variants={itemVariants}>
                                          <Typography variant="h6" gutterBottom className={classes.sectionTitle}>
                                              <BusinessIcon className={classes.sectionIcon} /> Manufacturer Details
                                          </Typography>
                                          {/* name */}
                                          <Grid container spacing={3}>
                                              <Grid item xs={12} sm={6} md={4} lg={3}>
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
                                                      error={touched.address && !!errors.address}
                                                      helperText={touched.address && errors.address}
                                                  />
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
                                                          style={{padding: "16.5px 14px", marginTop: "8px"}}
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
                                                      error={touched.pinCode && !!errors.pinCode}
                                                      helperText={touched.pinCode && errors.pinCode}
                                                  />
                                              </Grid>
                                              {/* Country */}
                                              <Grid item xs={12} sm={6} md={3}>
                                                  <FormControl fullWidth>
                                                      <CountryDropdown
                                                          value={selectedCountry}
                                                          onChange={handleCountryChange}
                                                          label="Country"
                                                          style={{padding: "16.5px 14px", marginTop: "8px"}} // Adjust padding to align with other TextFields
                                                      />
                                                      {touched.country && errors.country && (
                                                          <Typography variant="caption" color="error">
                                                              {errors.country}
                                                          </Typography>
                                                      )}
                                                  </FormControl>
                                              </Grid>
                                              {/* Contact */}
                                              <Grid item xs={12} sm={6} md={3}>
                                                  <Field
                                                      name="contact"
                                                      as={TextField}
                                                      fullWidth
                                                      label="Contact"
                                                      variant="outlined"
                                                      error={touched.contact && !!errors.contact}
                                                      helperText={touched.contact && errors.contact}
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
                                                      error={touched.email && !!errors.email}
                                                      helperText={touched.email && errors.email}
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
                                                      error={touched.website && !!errors.website}
                                                      helperText={touched.website && errors.website}
                                                  />
                                              </Grid>
                                          </Grid>
                                      </motion.div>
                                      <Divider className={classes.divider} />
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
                                                      error={touched.bankName && !!errors.bankName}
                                                      helperText={touched.bankName && errors.bankName}
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
                                                      error={touched.bankAddress && !!errors.bankAddress}
                                                      helperText={touched.bankAddress && errors.bankAddress}
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
                                                      error={touched.ifscCode && !!errors.ifscCode}
                                                      helperText={touched.ifscCode && errors.ifscCode}
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
                                                      error={touched.accountHolderName && !!errors.accountHolderName}
                                                      helperText={touched.accountHolderName && errors.accountHolderName}
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
                                                      error={touched.accountNumber && !!errors.accountNumber}
                                                      helperText={touched.accountNumber && errors.accountNumber}
                                                  />
                                              </Grid>
                                          </Grid>
                                      </motion.div>
                                      <Divider className={classes.divider} />
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
                                                      error={touched.gstin && !!errors.gstin}
                                                      helperText={touched.gstin && errors.gstin}
                                                  />
                                              </Grid>
                                          </Grid>
                                      </motion.div>
                                      <Divider className={classes.divider} />
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
                                                      error={touched.openingBalance && !!errors.openingBalance}
                                                      helperText={touched.openingBalance && errors.openingBalance}
                                                  />
                                              </Grid>
                                          </Grid>
                                      </motion.div>
                                      <Box className={classes.buttonContainer}>
                                          <motion.div variants={itemVariants}>
                                            {/* Save & Cancel */}
                                              <Tooltip title="Save">
                                                  <Button
                                                      type="submit"
                                                      variant="contained"
                                                      color="primary"
                                                      startIcon={<SaveIcon />}
                                                      className={classes.button}
                                                      sx={{mr: 2}}
                                                  >
                                                      Create
                                                  </Button>
                                              </Tooltip>
                                              <Tooltip title="Cancel">
                                                {/* Cancel */}
                                                  <Button
                                                      type="reset"
                                                      variant="outlined"
                                                      color="secondary"
                                                      startIcon={<CancelIcon />}
                                                      className={classes.button}
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

  export default AddManufacturer;

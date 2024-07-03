import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Typography, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { Business, LocationOn, Public, Mail, Phone, Language, AccountBalance, AccountBox, Money, CreditCard, FileUpload } from '@mui/icons-material';
import Flag from 'react-world-flags';

// Updated country data to include country codes
const countryData = {
  India: {
    code: 'IN',
    states: ["Madhya Pradesh", "Maharashtra", "Karnataka"],
    gst: "18%",
    taxRate: "5%"
  },
  USA: {
    code: 'US',
    states: ["California", "Texas", "New York"],
    gst: "N/A",
    taxRate: "7%"
  },
  Canada: {
    code: 'CA',
    states: ["Ontario", "Quebec", "British Columbia"],
    gst: "5%",
    taxRate: "10%"
  },
  // Add more countries as needed
};

function SetUpBusiness() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStatutoryState, setSelectedStatutoryState] = useState("");
  const [states, setStates] = useState([]);
  const [gst, setGst] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [formData, setFormData] = useState({
    businessLogo: '',
    businessName: '',
    address: '',
    pinCode: '',
    email: '',
    website: '',
    phoneNumber: '',
    enableGst: false,
    gstin: '',
    registrationType: '',
    drugLicenceNo: '',
    otherTax: false,
    otherTaxName: '',
    otherTaxNumber: '',
    bankName: '',
    bankAddress: '',
    ifscCode: '',
    accountHolderName: '',
    accountNumber: '',
  });

  useEffect(() => {
    if (selectedCountry) {
      setStates(countryData[selectedCountry]?.states || []);
      setGst(countryData[selectedCountry]?.gst || "");
      setTaxRate(countryData[selectedCountry]?.taxRate || "");
    } else {
      setStates([]);
      setGst("");
      setTaxRate("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setGst(countryData[selectedCountry]?.gst || "");
      setTaxRate(countryData[selectedCountry]?.taxRate || "");
    }
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState(""); // Reset state when country changes
    setSelectedStatutoryState(""); // Reset statutory state when country changes
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedStatutoryState(event.target.value); // Set selected state for statutory details
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectedCountryCode = countryData[selectedCountry]?.code;

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Set Up Business
        </Typography>
      </motion.div>
      <Card component={motion.div} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Business Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="file"
                label="Business Logo"
                fullWidth
                name="businessLogo"
                InputProps={{ startAdornment: <FileUpload /> }}
                value={formData.businessLogo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Business Name"
                fullWidth
                name="businessName"
                InputProps={{ startAdornment: <Business /> }}
                value={formData.businessName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Address"
                fullWidth
                name="address"
                InputProps={{ startAdornment: <LocationOn /> }}
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Pin Code"
                fullWidth
                name="pinCode"
                InputProps={{ startAdornment: <LocationOn /> }}
                value={formData.pinCode}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  label="Country"
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {Object.keys(countryData).map((country) => (
                    <MenuItem key={country} value={country}>
                      <Flag code={countryData[country].code} style={{ width: '24px', marginRight: '8px' }} />
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={!selectedCountry}
                  label="State"
                >
                  <MenuItem value="">Select State</MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email Id"
                fullWidth
                name="email"
                InputProps={{ startAdornment: <Mail /> }}
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Website"
                fullWidth
                name="website"
                InputProps={{ startAdornment: <Language /> }}
                value={formData.website}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone number"
                fullWidth
                name="phoneNumber"
                InputProps={{ startAdornment: <Phone /> }}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Statutory Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel control={<Switch />} label="Enable GST" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="State"
                fullWidth
                name="selectedStatutoryState"
                InputProps={{ startAdornment: <Public /> }}
                value={selectedStatutoryState}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="GSTIN"
                fullWidth
                name="gstin"
                InputProps={{ startAdornment: <Business /> }}
                value={formData.gstin}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Registration Type</InputLabel>
                <Select
                  value={formData.registrationType}
                  onChange={handleInputChange}
                  label="Registration Type"
                  name="registrationType"
                >
                  <MenuItem value="">Select Registration Type</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="Composition">Composition</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tax Rate"
                fullWidth
                name="taxRate"
                InputProps={{ startAdornment: <Money /> }}
                value={taxRate}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Drug Licence No"
                fullWidth
                name="drugLicenceNo"
                InputProps={{ startAdornment: <CreditCard /> }}
                value={formData.drugLicenceNo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel control={<Switch />} label="Other Tax" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tax Name"
                fullWidth
                name="otherTaxName"
                InputProps={{ startAdornment: <AccountBalance /> }}
                value={formData.otherTaxName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Number"
                fullWidth
                name="otherTaxNumber"
                InputProps={{ startAdornment: <CreditCard /> }}
                value={formData.otherTaxNumber}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Bank Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Bank Name"
                fullWidth
                name="bankName"
                InputProps={{ startAdornment: <AccountBalance /> }}
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Bank Address"
                fullWidth
                name="bankAddress"
                InputProps={{ startAdornment: <LocationOn /> }}
                value={formData.bankAddress}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="IFSC Code"
                fullWidth
                name="ifscCode"
                InputProps={{ startAdornment: <AccountBalance /> }}
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Account Holder Name"
                fullWidth
                name="accountHolderName"
                InputProps={{ startAdornment: <AccountBox /> }}
                value={formData.accountHolderName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Account Number"
                fullWidth
                name="accountNumber"
                InputProps={{ startAdornment: <CreditCard /> }}
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => {
              // Handle form submission
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SetUpBusiness;

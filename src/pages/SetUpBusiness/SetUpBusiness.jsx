import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Business,
  LocationOn,
  Mail,
  Phone,
  Language,
  AccountBalance,
  AccountBox,
  Money,
  CreditCard,
} from "@mui/icons-material";
import Flag from "react-world-flags";
import { addBusinessSetup } from "../../setBusinessApi";

const countryData = {
  India: {
    code: "IN",
    states: ["Madhya Pradesh", "Maharashtra", "Karnataka"],
    gst: "18%",
    taxRate: "5%",
  },
  USA: {
    code: "US",
    states: ["California", "Texas", "New York"],
    gst: "N/A",
    taxRate: "7%",
  },
  Canada: {
    code: "CA",
    states: ["Ontario", "Quebec", "British Columbia"],
    gst: "5%",
    taxRate: "10%",
  },
};

function SetUpBusiness() {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [gst, setGst] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [formData, setFormData] = useState({
    businessLogo: null,
    businessName: "",
    address: "",
    pinCode: "",
    country: "",
    email: "",
    website: "",
    phoneNumber: "",
    enableGst: false,
    stateRegistrationType: "",
    taxRate: "",
    gstin: "",
    drugLicenceNo: "",
    otherTax: false,
    taxName: "",
    taxNumber: "",
    bankName: "",
    bankAddress: "",
    ifscCode: "",
    accountHolderName: "",
    accountNumber: "",
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
    setFormData({ ...formData, country: event.target.value });
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setFormData({ ...formData, state: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, businessLogo: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "businessLogo") {
        data.append("businessLogo", formData.businessLogo); // Append file separately
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await addBusinessSetup(data);
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating business setup:", error);
      // Handle error appropriately (e.g., show user an error message)
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Set Up Business
        </Typography>
      </motion.div>
      <Card component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Business Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  type="file"
                  label="Business Logo"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Business Name"
                  name="businessName"
                  fullWidth
                  InputProps={{ startAdornment: <Business /> }}
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  InputProps={{ startAdornment: <LocationOn /> }}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Pin Code"
                  name="pinCode"
                  fullWidth
                  InputProps={{ startAdornment: <LocationOn /> }}
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select value={selectedCountry} onChange={handleCountryChange}>
                    <MenuItem value="">Select Country</MenuItem>
                    {Object.keys(countryData).map((country) => (
                      <MenuItem key={country} value={country}>
                        <Flag code={countryData[country].code} style={{ width: "24px", marginRight: "8px" }} />
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
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
                  name="email"
                  fullWidth
                  InputProps={{ startAdornment: <Mail /> }}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Website"
                  name="website"
                  fullWidth
                  InputProps={{ startAdornment: <Language /> }}
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Phone number"
                  name="phoneNumber"
                  fullWidth
                  InputProps={{ startAdornment: <Phone /> }}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Tax Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={<Switch checked={formData.enableGst} onChange={() => setFormData({ ...formData, enableGst: !formData.enableGst })} />}
                  label="Enable GST"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="GSTIN"
                  name="gstin"
                  fullWidth
                  InputProps={{ startAdornment: <AccountBalance /> }}
                  value={formData.gstin}
                  onChange={handleInputChange}
                  disabled={!formData.enableGst}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Drug Licence Number"
                  name="drugLicenceNo"
                  fullWidth
                  InputProps={{ startAdornment: <AccountBox /> }}
                  value={formData.drugLicenceNo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={<Switch checked={formData.otherTax} onChange={() => setFormData({ ...formData, otherTax: !formData.otherTax })} />}
                  label="Enable Other Tax"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Tax Name"
                  name="taxName"
                  fullWidth
                  InputProps={{ startAdornment: <Money /> }}
                  value={formData.taxName}
                  onChange={handleInputChange}
                  disabled={!formData.otherTax}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Tax Number"
                  name="taxNumber"
                  fullWidth
                  InputProps={{ startAdornment: <CreditCard /> }}
                  value={formData.taxNumber}
                  onChange={handleInputChange}
                  disabled={!formData.otherTax}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Bank Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Bank Name"
                  name="bankName"
                  fullWidth
                  InputProps={{ startAdornment: <AccountBalance /> }}
                  value={formData.bankName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Bank Address"
                  name="bankAddress"
                  fullWidth
                  InputProps={{ startAdornment: <LocationOn /> }}
                  value={formData.bankAddress}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="IFSC Code"
                  name="ifscCode"
                  fullWidth
                  InputProps={{ startAdornment: <CreditCard /> }}
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Account Holder Name"
                  name="accountHolderName"
                  fullWidth
                  InputProps={{ startAdornment: <AccountBox /> }}
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  fullWidth
                  InputProps={{ startAdornment: <AccountBalance /> }}
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SetUpBusiness;

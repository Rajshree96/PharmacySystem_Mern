import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

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
import {motion} from "framer-motion";
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
    FileUpload,
} from "@mui/icons-material";
import Flag from "react-world-flags";
import DynamicButton from "../../common-components/ButtonContainer/DynamicButton";
import {Add, Edit} from "@mui/icons-material";

// Updated country data to include country codes
const countryData = {
    India: {
        code: "IN",
        states: [ "Madhya Pradesh", "Maharashtra", "Karnataka" ],
        gst: "18%",
        taxRate: "5%",
    },
    USA: {
        code: "US",
        states: [ "California", "Texas", "New York" ],
        gst: "N/A",
        taxRate: "7%",
    },
    Canada: {
        code: "CA",
        states: [ "Ontario", "Quebec", "British Columbia" ],
        gst: "5%",
        taxRate: "10%",
    },
    // Add more countries as needed
};

function SetUpBusiness() {

  const navigate = useNavigate();
  
    const [ selectedCountry, setSelectedCountry ] = useState("");
    const [ selectedState, setSelectedState ] = useState("");
    const [ states, setStates ] = useState([]);
    const [ gst, setGst ] = useState("");
    const [ taxRate, setTaxRate ] = useState("");

    useEffect(() => {
        if (selectedCountry) {
            setStates(countryData[selectedCountry]?.states || []);
            setGst(countryData[selectedCountry]?.gst || "");
            setTaxRate(countryData[selectedCountry]?.taxRate || "");
        }
        else {
            setStates([]);
            setGst("");
            setTaxRate("");
        }
    }, [ selectedCountry ]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            setGst(countryData[selectedCountry]?.gst || "");
            setTaxRate(countryData[selectedCountry]?.taxRate || "");
        }
    }, [ selectedState, selectedCountry ]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState(""); // Reset state when country changes
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const selectedCountryCode = countryData[selectedCountry]?.code;

    return (
        <Container maxWidth="lg" sx={{mt: 5, mb: 5}}>
            <motion.div initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Set Up Business
                </Typography>
            </motion.div>
            <Card component={motion.div} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
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
                                InputProps={{startAdornment: <FileUpload />}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Business Name" fullWidth InputProps={{startAdornment: <Business />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Address" fullWidth InputProps={{startAdornment: <LocationOn />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Pin Code" fullWidth InputProps={{startAdornment: <LocationOn />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select value={selectedCountry} onChange={handleCountryChange}>
                                    <MenuItem value="">Select Country</MenuItem>
                                    {Object.keys(countryData).map((country) => (
                                        <MenuItem key={country} value={country}>
                                            <Flag
                                                code={countryData[country].code}
                                                style={{width: "24px", marginRight: "8px"}}
                                            />
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* {selectedCountryCode && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Flag code={selectedCountryCode} title={selectedCountry} style={{ width: '100px' }} />
                </motion.div>
              )} */}
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
                            <TextField label="Email Id" fullWidth InputProps={{startAdornment: <Mail />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Website" fullWidth InputProps={{startAdornment: <Language />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Phone number" fullWidth InputProps={{startAdornment: <Phone />}} />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                        Statutory Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel control={<Switch />} label="Enable GST" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="GSTIN" fullWidth InputProps={{startAdornment: <Business />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Tax Rate"
                                fullWidth
                                value={taxRate}
                                InputProps={{startAdornment: <Money />}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Tax Name" fullWidth InputProps={{startAdornment: <Money />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Number" fullWidth InputProps={{startAdornment: <CreditCard />}} />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                        Bank Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Bank Name" fullWidth InputProps={{startAdornment: <AccountBalance />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Bank Address" fullWidth InputProps={{startAdornment: <LocationOn />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="IFSC Code" fullWidth InputProps={{startAdornment: <AccountBalance />}} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Account Holder Name"
                                fullWidth
                                InputProps={{startAdornment: <AccountBox />}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField label="Account Number" fullWidth InputProps={{startAdornment: <CreditCard />}} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5, delay: 0.3}}
                        style={{display: "flex", justifyContent: "center", marginTop: "20px"}}
                    >
                        <DynamicButton
                            icon={Add}
                            label={"Create"}
                            onClick={() => navigate("/dashboard")}
                            sx={{
                                bgcolor: "#00796b",
                                "&:hover": {bgcolor: "#004d40"},
                                transition: "all 0.3s",
                            }}
                        />
                    </motion.div>
                    </Grid>
                    
                </CardContent>
            </Card>
        </Container>
    );
}

export default SetUpBusiness;

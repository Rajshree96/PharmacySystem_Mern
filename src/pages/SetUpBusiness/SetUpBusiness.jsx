import React, {useState, useEffect} from "react";
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
    Public,
    Mail,
    Phone,
    Language,
    AccountBalance,
    AccountBox,
    Money,
    CreditCard,
    FileUpload,
    DateRange,
} from "@mui/icons-material";

import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
// import Flag from "react-world-flags";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    formControl: {
        minWidth: 120,
    },
});

const FinancialYearSelector = () => {
    const classes = useStyles();
    const [ startYear, setStartYear ] = useState("");
    const [ endYear, setEndYear ] = useState("");
    const [ financialYear, setFinancialYear ] = useState("");
    const [ isSelectingYears, setIsSelectingYears ] = useState(false);

    const currentYear = new Date().getFullYear();
    // const yearOptions = Array.from(new Array(20), (val, index) => currentYear - index);
    const yearOptions = Array.from(new Array(100), (val, index) => currentYear - 50 + index);

    const handleStartYearChange = (event) => {
        const selectedYear = event.target.value;
        setStartYear(selectedYear);
        updateFinancialYear(selectedYear, endYear);
    };

    const handleEndYearChange = (event) => {
        const selectedYear = event.target.value;
        setEndYear(selectedYear);
        updateFinancialYear(startYear, selectedYear);
    };

    const updateFinancialYear = (start, end) => {
        if (start && end) {
            setFinancialYear(`${start}-${end}`);
            setIsSelectingYears(false);
        }
    };

    return (
        <Grid container spacing={2}>
            {/* Financial Year */}
            <Grid item xs={12} sm={6} md={12}>
                <TextField
                    label="Financial Year"
                    fullWidth
                    // name="financialYear"
                    value={financialYear}
                    InputProps={{
                        readOnly: true,
                        startAdornment: <DateRange />,
                    }}
                    onClick={() => setIsSelectingYears(true)}
                />
            </Grid>
            {isSelectingYears && (
                <>
                    {/* Start Year */}
                    <Grid item xs={12} sm={6} md={5} lg={6}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel id="start-year-label">Start Year</InputLabel>
                            <Select
                                labelId="start-year-label"
                                label="Start Year"
                                id="start-year-select"
                                value={startYear}
                                onChange={handleStartYearChange}
                            >
                                {yearOptions.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* End Year */}
                    <Grid item xs={12} sm={6} md={5} lg={6}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel id="end-year-label">End Year</InputLabel>
                            <Select
                                labelId="end-year-label"
                                label="End Year"
                                id="end-year-select"
                                value={endYear}
                                onChange={handleEndYearChange}
                            >
                                {yearOptions.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                                {/* Add more years as needed */}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

function SetUpBusiness() {
    const [ selectedCountry, setSelectedCountry ] = useState("");
    const [ selectedState, setSelectedState ] = useState("");
    const [ selectedStatutoryState, setSelectedStatutoryState ] = useState("");
    const [ formData, setFormData ] = useState({
        businessLogo: "",
        businessName: "",
        address: "",
        pinCode: "",
        email: "",
        website: "",
        phoneNumber: "",
        enableGst: false,
        gstin: "",
        taxRate: "",
        registrationType: "",
        drugLicenceNo: "",
        otherTax: false,
        otherTaxName: "",
        otherTaxNumber: "",
        bankName: "",
        bankAddress: "",
        ifscCode: "",
        accountHolderName: "",
        accountNumber: "",
    });

    const handleCountryChange = (val) => {
        setSelectedCountry(val);
        setSelectedState(""); // Reset state when country changes
        setSelectedStatutoryState(""); // Reset statutory state when country changes
    };

    const handleStateChange = (val) => {
        setSelectedState(val);
        setSelectedStatutoryState(val); // Set selected state for statutory details
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGstChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            enableGst: event.target.checked,
        }));
    };

    const handleRegistrationTypeChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            registrationType: event.target.value,
        }));
    };

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

                    {/* Business Information */}
                    <Grid container spacing={3} gutterBottom sx={{mt: 1}}>
                        {/* Business Logo */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                type="file"
                                label="Business Logo"
                                fullWidth
                                name="businessLogo"
                                InputProps={{startAdornment: <FileUpload />}}
                                value={formData.businessLogo}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Business Name */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Business Name"
                                fullWidth
                                name="businessName"
                                InputProps={{startAdornment: <Business />}}
                                value={formData.businessName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Address */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Address"
                                fullWidth
                                name="address"
                                InputProps={{startAdornment: <LocationOn />}}
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Pin Code */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Pin Code"
                                fullWidth
                                name="pinCode"
                                InputProps={{startAdornment: <LocationOn />}}
                                value={formData.pinCode}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Country */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth label>
                                <CountryDropdown
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    label="Country"
                                    classes="country-dropdown"
                                    style={{padding: "16.5px 14px", marginTop: "8px"}} // Adjust padding to align with other fields
                                />
                            </FormControl>
                        </Grid>
                        {/* State */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth>
                                <RegionDropdown
                                    country={selectedCountry}
                                    value={selectedState}
                                    onChange={handleStateChange}
                                    disabled={!selectedCountry}
                                    label="State"
                                    style={{padding: "16.5px 14px", marginTop: "8px"}} // Adjust padding to align with other fields
                                />
                            </FormControl>
                        </Grid>
                        {/* Email */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Email Id"
                                fullWidth
                                name="email"
                                InputProps={{startAdornment: <Mail />}}
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Website */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Website"
                                fullWidth
                                name="website"
                                InputProps={{startAdornment: <Language />}}
                                value={formData.website}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Phone Number */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Phone number"
                                fullWidth
                                name="phoneNumber"
                                InputProps={{startAdornment: <Phone />}}
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Finance Details */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth>
                                <FinancialYearSelector financialYear={formData.financialYear} />
                            </FormControl>
                        </Grid>
                        {/* Book Begning From */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Book Beginning From"
                                type="date"
                                name="bookBeginning"
                                InputLabelProps={{shrink: true}}
                                value={formData.bookBeginning}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    {/* Statutory Details */}
                    <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                        Statutory Details
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Enable GST */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControlLabel
                                control={<Switch checked={formData.enableGst} onChange={handleGstChange} />}
                                label="Enable GST"
                            />
                        </Grid>
                        {/* State */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="State"
                                fullWidth
                                name="selectedStatutoryState"
                                InputProps={{startAdornment: <Public />}}
                                value={selectedStatutoryState}
                                onChange={handleInputChange}
                                required={formData.enableGst}
                                disabled={!formData.enableGst}
                            />
                        </Grid>
                        {/* Registration Type */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth>
                                <InputLabel>Registration Type</InputLabel>
                                <Select
                                    value={formData.registrationType}
                                    onChange={handleRegistrationTypeChange}
                                    label="Registration Type"
                                    name="registrationType"
                                    disabled={!formData.enableGst}
                                >
                                    <MenuItem value="">Select Registration Type</MenuItem>
                                    <MenuItem value="Regular">Regular</MenuItem>
                                    <MenuItem value="Composition">Composition</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* GSTIN */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="GSTIN"
                                fullWidth
                                name="gstin"
                                InputProps={{startAdornment: <Business />}}
                                value={formData.gstin}
                                onChange={handleInputChange}
                                required={formData.enableGst}
                                disabled={!formData.enableGst}
                            />
                        </Grid>
                        {/* Tax Rate */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Tax Rate"
                                fullWidth
                                name="taxRate"
                                InputProps={{startAdornment: <Money />}}
                                value={formData.taxRate}
                                onChange={handleInputChange}
                                disabled={formData.registrationType !== "Composition" || !formData.enableGst}
                            />
                        </Grid>
                        {/* Drug Licence */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Drug Licence No"
                                fullWidth
                                name="drugLicenceNo"
                                InputProps={{startAdornment: <CreditCard />}}
                                value={formData.drugLicenceNo}
                                onChange={handleInputChange}
                                disabled={!formData.enableGst}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} gutterBottom sx={{mt: 3}}>
                        {/* Other Tax */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.otherTax}
                                        onChange={(event) =>
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                otherTax: event.target.checked,
                                            }))
                                        }
                                    />
                                }
                                label="Enable Other Tax"
                            />
                        </Grid>
                        {/* Other Tax Name */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Other Tax Name"
                                fullWidth
                                name="otherTaxName"
                                InputProps={{startAdornment: <Business />}}
                                value={formData.otherTaxName}
                                onChange={handleInputChange}
                                disabled={!formData.otherTax}
                            />
                        </Grid>
                        {/* Other Tax Number */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Other Tax Number"
                                fullWidth
                                name="otherTaxNumber"
                                InputProps={{startAdornment: <Business />}}
                                value={formData.otherTaxNumber}
                                onChange={handleInputChange}
                                disabled={!formData.otherTax}
                            />
                        </Grid>
                    </Grid>
                    {/* Bank Details */}
                    <Typography variant="h6" gutterBottom sx={{mt: 3}}>
                        Bank Details
                    </Typography>
                    <Grid container spacing={3} gutterBottom sx={{mt: 1}}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Bank Name"
                                fullWidth
                                name="bankName"
                                InputProps={{startAdornment: <AccountBalance />}}
                                value={formData.bankName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Bank Address */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Bank Address"
                                fullWidth
                                name="bankAddress"
                                InputProps={{startAdornment: <LocationOn />}}
                                value={formData.bankAddress}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* IFSC Code */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="IFSC Code"
                                fullWidth
                                name="ifscCode"
                                InputProps={{startAdornment: <LocationOn />}}
                                value={formData.ifscCode}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Account Holder Name */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Account Holder Name"
                                fullWidth
                                name="accountHolderName"
                                InputProps={{startAdornment: <AccountBox />}}
                                value={formData.accountHolderName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Account Number */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Account Number"
                                fullWidth
                                name="accountNumber"
                                InputProps={{startAdornment: <CreditCard />}}
                                value={formData.accountNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    {/* Save Button */}
                    <Grid container spacing={3} sx={{mt: 3}}>
                        <Grid item xs={12} lg={1}>
                            <Button variant="contained" color="primary" className="btn-design" fullWidth>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default SetUpBusiness;

import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    sectionIcon: {
        marginRight: theme.spacing(1),
    },
    formContainer: {
        marginTop: theme.spacing(4),
    },
}));

const ViewManufacturer = ({ selectedData }) => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <Box className={classes.formContainer}>
                <Paper elevation={3} sx={{ padding: '24px', borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Manufacturer Details
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Name */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Name:</Typography>
                            <Typography variant="body1">{selectedData.name}</Typography>
                        </Grid>
                        {/* Address */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Address:</Typography>
                            <Typography variant="body1">{selectedData.address}</Typography>
                        </Grid>
                        {/* Country */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Country:</Typography>
                            <Typography variant="body1">{selectedData.country}</Typography>
                        </Grid>
                        {/* State */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">State:</Typography>
                            <Typography variant="body1">{selectedData.state}</Typography>
                        </Grid>
                        {/* Pin Code */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Pin Code:</Typography>
                            <Typography variant="body1">{selectedData.pincode}</Typography>
                        </Grid>
                        {/* Contact */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Contact:</Typography>
                            <Typography variant="body1">{selectedData.contact}</Typography>
                        </Grid>
                        {/* Email */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Email:</Typography>
                            <Typography variant="body1">{selectedData.email}</Typography>
                        </Grid>
                        {/* Website */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Website:</Typography>
                            <Typography variant="body1">{selectedData.website}</Typography>
                        </Grid>
                        {/* Account Head */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Account Head:</Typography>
                            <Typography variant="body1">{selectedData.accountHead}</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" className={classes.sectionTitle}>
                        Bank Details
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Bank Name */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Bank Name:</Typography>
                            <Typography variant="body1">{selectedData.bankingDetails.bankName}</Typography>
                        </Grid>
                        {/* Bank Address */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Bank Address:</Typography>
                            <Typography variant="body1">{selectedData.bankingDetails.bankAddress}</Typography>
                        </Grid>
                        {/* IFSC Code */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">IFSC Code:</Typography>
                            <Typography variant="body1">{selectedData.bankingDetails.ifscCode}</Typography>
                        </Grid>
                        {/* Account Holder Name */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Account Holder Name:</Typography>
                            <Typography variant="body1">{selectedData.bankingDetails.accountHolderName}</Typography>
                        </Grid>
                        {/* Account Number */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Account Number:</Typography>
                            <Typography variant="body1">{selectedData.bankingDetails.accountNumber}</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" className={classes.sectionTitle}>
                        GST Details
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Registration Type */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Registration Type:</Typography>
                            <Typography variant="body1">{selectedData.statutoryDetails.registrationType}</Typography>
                        </Grid>
                        {/* GSTIN */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">GSTIN:</Typography>
                            <Typography variant="body1">{selectedData.statutoryDetails.gstin}</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" className={classes.sectionTitle}>
                        Opening Balance
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Opening Balance */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Opening Balance:</Typography>
                            <Typography variant="body1">{selectedData.openingBalance.asOnFirstDayOfFinancialYear}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
};

export default ViewManufacturer;

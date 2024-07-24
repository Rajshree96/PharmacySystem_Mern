import React, {useState} from "react";
import {Container, Paper, Typography, Grid, Box, Divider} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


const ViewSupplier = ({selectedData}) => {
    return (
        <Container maxWidth="lg">
            <Box>
                <Typography variant="h4" gutterBottom>
                    Supplier Details
                </Typography>

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <BusinessIcon /> Supplier Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Name: {selectedData.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Address: {selectedData.address}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Country: {selectedData.country}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>State: {selectedData.state}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Pin Code: {selectedData.pincode}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Contact: {selectedData.contact}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Email: {selectedData.email}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Website: {selectedData.website}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{marginTop: "40px", marginBottom: "30px"}} />

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <AccountBalanceIcon /> Bank Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Bank Name: {selectedData.bankingDetails.bankName}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Bank Address: {selectedData.bankingDetails.bankAddress}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>IFSC Code: {selectedData.bankingDetails.ifscCode}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>
                                Account Holder Name: {selectedData.bankingDetails.accountHolderName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Account Number: {selectedData.bankingDetails.accountNumber}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{marginTop: "40px", marginBottom: "30px"}} />

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <DescriptionIcon /> GST Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Registration Type: {selectedData.statutoryDetails.registrationType}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>GSTIN: {selectedData.statutoryDetails.gstin}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{marginTop: "40px", marginBottom: "30px"}} />

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <AccountBalanceWalletIcon /> Opening Balance
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>
                                Opening Balance: {selectedData.openingBalance.asOnFirstDayOfFinancialYear}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default ViewSupplier;

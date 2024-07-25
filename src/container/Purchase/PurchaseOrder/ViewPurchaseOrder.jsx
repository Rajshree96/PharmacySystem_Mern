import React from "react";
import { Container, Paper, Typography, Grid, Box, Divider, List, ListItem } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const ViewPurchaseOrder = ({ selectedData }) => {
    if (!selectedData) return <Typography>No Data Available</Typography>;

    return (
        <Container maxWidth="lg">
            <Box>
                <Typography variant="h4" gutterBottom>
                    Purchase Order Details
                </Typography>

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <BusinessIcon /> Order Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Date: {selectedData.date}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Order No: {selectedData.orderNo}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Supplier Name: {selectedData.supplierName}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Place of Supply: {selectedData.placeOfSupply}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Payment Terms: {selectedData.paymentTerm}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Due Date: {selectedData.dueDate}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Billing Address: {selectedData.billingAddress}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Reverse Charge: {selectedData.reverseCharge}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Tax Type: {selectedData.taxType}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <AccountBalanceIcon /> Transport Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Receipt Number: {selectedData.transPortDetails.receiptNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Dispatched Through: {selectedData.transPortDetails.dispatchedThrough}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Destination: {selectedData.transPortDetails.destination}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Carrier Name: {selectedData.transPortDetails.carrierName}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Bill of Lading: {selectedData.transPortDetails.billOfLading}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Vehicle Number: {selectedData.transPortDetails.vehicleNumber}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <DescriptionIcon /> Product Details
                    </Typography>
                    <List>
                        {selectedData.purchaseTable.map((row, index) => (
                            <ListItem key={index}>
                                Product {index + 1}: {JSON.stringify(row)}
                            </ListItem>
                            
                        ))}
                    </List>
                </Box>

                <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <AccountBalanceWalletIcon /> Amount Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Gross Amount: {selectedData.amounts.grossAmount}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>GST Amount: {selectedData.amounts.gstAmount}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Other Charges: {selectedData.amounts.otherCharge.join(", ")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography>Net Amount: {selectedData.amounts.netAmount}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ marginTop: "40px", marginBottom: "30px" }} />

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        <DescriptionIcon /> Narration
                    </Typography>
                    <Typography>{selectedData.Narration}</Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ViewPurchaseOrder;

import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PurchaseOrderPayment = () => {
  const [open, setOpen] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [dispatchedThrough, setDispatchedThrough] = useState("");
  const [destination, setDestination] = useState("");
  const [carrierName, setCarrierName] = useState("");
  const [billOfLading, setBillOfLading] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    console.log("Receipt Number:", receiptNumber);
    console.log("Dispatched Through:", dispatchedThrough);
    console.log("Destination:", destination);
    console.log("Carrier Name/Agent:", carrierName);
    console.log("Bill of Lading/LR-RR No.:", billOfLading);
    console.log("Motor Vehicle No.:", vehicleNumber);
    handleClose();
  };
  const [paymentType, setPaymentType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const [onlineTransaction, setOnlineTransaction] = useState("");
  const [chequeTransaction, setChequeTransaction] = useState("");


  return (
    <div>
      <Button variant="contained" className="btn-design" onClick={handleOpen}>
        Save & Payment
      </Button>
      <Modal open={open} onClose={handleClose} sx={{ maxWidth: "xl" }}>
        <Grid container spacing={1} sx={style} maxWidth="xl">
          <Grid item md={12} xs={12}>
            <Typography variant="h6" component="h2">
              Payment
            </Typography>
          </Grid>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={paymentType}
              onChange={handlePaymentTypeChange}
              sx={{ m: 1 }}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="bank" control={<Radio />} label="Bank" />
            </RadioGroup>

            {paymentType === "cash" && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Amount" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Advance" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Paid" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Balance" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Description" fullWidth />
                </Grid>
              </Grid>
            )}

            {paymentType === "bank" && (
              <Grid container spacing={2} >
                <Grid item xs={12} sm={12} >
                  <TextField select label="Select Bank" fullWidth>
                    <MenuItem value="bank1">Bank 1</MenuItem>
                    <MenuItem value="bank2">Bank 2</MenuItem>
                    <MenuItem value="bank3">Bank 3</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    select
                    label="Payment Method"
                    fullWidth
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="cheque">Cheque</MenuItem>
                  </TextField>
                </Grid>

                {paymentMethod === "online" && (
                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid item xs={12} sm={6}>
                      {/* <TextField label="Transaction Date" fullWidth /> */}
                      <TextField
                        label="Transaction Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={onlineTransaction}
                        onChange={(e) => setOnlineTransaction(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Transaction No" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Advance" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Paid" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Balance" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Description" fullWidth />
                    </Grid>
                  </Grid>
                )}

                {paymentMethod === "cheque" && (
                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid item xs={12} sm={6}>
                      {/* <TextField label="Transaction Date" fullWidth /> */}
                      <TextField
                        label="Transaction Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={chequeTransaction}
                        onChange={(e) => setChequeTransaction(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Cheque No" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Advance" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Paid" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Balance" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Description" fullWidth />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            )}
          </FormControl>
        </Grid>
      </Modal>
    </div>
  );
};

export default PurchaseOrderPayment;

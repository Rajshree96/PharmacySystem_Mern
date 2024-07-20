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

const PurchaseOrderPayment = ({ onClick, netAmount,orderNo }) => {
  const [open, setOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paid, setPaid] = useState("");
  const [advance, setAdvance] = useState("");
  const [balance, setBalance] = useState("");
  const [description, setDescription] = useState("");
  const [selectBank, setSelectBank] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionNo, setTransactionNo] = useState("");
  const [chequeNo, setChequeNo] = useState("");

  
  console.log(orderNo)
  const handleSave = async () => {
    let paymentData = {
      paymentType,
      orderNo: orderNo,
    };

    if (paymentType === "cash") {
      paymentData.cash = {
        amount:netAmount,
        advance,
        paid,
        balance,
        description,
      };
    } else if (paymentType === "bank") {
      paymentData.bank = {
        selectBank,
        paymentMethod,
      };
      if (paymentMethod === "online") {
        paymentData.bank.online = {
          transactionDate,
          transactionNo,
          amount:netAmount,
          advance,
          paid,
          balance,
          description,
        };
      } else if (paymentMethod === "cheque") {
        paymentData.bank.cheque = {
          transactionDate,
          chequeNo,
          amount:netAmount,
          advance,
          paid,
          balance,
          description,
        };
      }
    }
console.log(paymentData)
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const response = await fetch("http://localhost:4000/api/v1/payment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Payment added successfully:", data);
      } else {
        console.error("Error adding payment:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    handleClose();
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" className="btn-design" onClick={(e) => { onClick(e); handleOpen(); }}>
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
              // value={paymentType}
              onChange={handlePaymentTypeChange}
              sx={{ m: 1 }}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="bank" control={<Radio />} label="Bank" />
            </RadioGroup>

            {paymentType === "cash" && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Amount" fullWidth
                    value={netAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Advance"
                    fullWidth
                    value={advance}
                    onChange={(e) => setAdvance(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Paid"
                    fullWidth
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Balance"
                    fullWidth
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}

            {paymentType === "bank" && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    select
                    label="Select Bank"
                    fullWidth
                    value={selectBank}
                    onChange={(e) => setSelectBank(e.target.value)}
                  >
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
                      <TextField
                        label="Transaction Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                      />
                    </Grid>                   
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Transaction No"
                        fullWidth
                        value={transactionNo}
                        onChange={(e) => setTransactionNo(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Amount" fullWidth
                        value={netAmount}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Advance" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Paid"
                        fullWidth
                        value={paid}
                        onChange={(e) => setPaid(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Balance"
                        fullWidth
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                )}

                {paymentMethod === "cheque" && (
                  <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Transaction Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Cheque No"
                        fullWidth
                        value={chequeNo}
                        onChange={(e) => setChequeNo(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Amount" fullWidth
                        value={netAmount}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Advance" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Paid"
                        fullWidth
                        value={paid}
                        onChange={(e) => setPaid(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Balance"
                        fullWidth
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            )}
            <Button onClick={handleSave}
              className="btn-design" sx={{ color: 'white', mt: 3 }}
            >Save</Button>
          </FormControl>
        </Grid>
      </Modal>
    </div>
  );
};

export default PurchaseOrderPayment;

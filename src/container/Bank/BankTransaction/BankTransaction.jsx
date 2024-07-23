import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  AccountBalance,
  AttachMoney,
  DateRange,
  ConfirmationNumber,
  Save,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

//Date Picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import dayjs from "dayjs";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 300,
  marginBottom: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  backgroundColor: "#00796b",
  color: "#ffffff",
  '&:hover': {
    backgroundColor: "#004d40",
  },
}));

const MotionCard = styled(motion(Card))({
  borderRadius: 15,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

const MotionPaper = styled(motion(Paper))({
  borderRadius: 10,
  padding: 30,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
});

const transactionTypes = [
  {
    value: "Bank to Bank",
    title: "Bank to Bank",
    fromAccountLabel: "Bank Name",
    toAccountLabel: "Bank Name",
    fromAccountIcon: <AccountBalance />,
    toAccountIcon: <AccountBalance />,
  },
  {
    value: "Cash Deposit in Bank",
    title: "Cash Deposit in Bank",
    fromAccountLabel: "Cash",
    toAccountLabel: "Bank Name",
    fromAccountIcon: <AttachMoney />,
    toAccountIcon: <AccountBalance />,
  },
  {
    value: "Cash Withdrawal from Bank",
    title: "Cash Withdrawal from Bank",
    fromAccountLabel: "Bank Name",
    toAccountLabel: "Cash",
    fromAccountIcon: <AccountBalance />,
    toAccountIcon: <AttachMoney />,
  },
];

const TransactionForm = ({ type, handleSave }) => {

  const [formData, setFormData] = useState({
    date: null,
    contraNo: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleDateChange = (date) => {
  //   setFormData({ ...formData, date: date.format('YYYY-MM-DD') });
  // };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const transaction = transactionTypes.find((t) => t.value === type);
  if (!transaction) return null;

  

  return (
    <Grid item xs={12} md={6} lg={4}>
      <MotionCard
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader
          title={transaction.title}
          titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            textAlign: "center",
            borderRadius: "15px 15px 0 0",
          }}
        />
        <CardContent>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item md={12} xs={12} sx={{ mb:'12px'}} >        
        <DatePicker
          label="Select date"
          value={formData.date}
          onChange={handleDateChange}
          // InputLabelProps={{ shrink: true }}
            variant="outlined"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <DateRange />
            //     </InputAdornment>
            //   ),
            // }}
            renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </LocalizationProvider>

{/* 
          <StyledTextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRange />
                </InputAdornment>
              ),
            }}
          /> */}
          <StyledTextField
            fullWidth
            label="Contra No"
             name="contraNo"
             value={formData.contraNo}
             onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumber />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            fullWidth
            label="From Account"
            name="fromAccount"
            value={formData.fromAccount}
            onChange={handleChange}
            variant="outlined"
            helperText={transaction.fromAccountLabel}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {transaction.fromAccountIcon}
                </InputAdornment>
              ),
            }}
          />

            
          <StyledTextField
            fullWidth
            label="To Account"
            name="toAccount"
            value={formData.toAccount}
            onChange={handleChange}
            variant="outlined"
            helperText={transaction.toAccountLabel}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {transaction.toAccountIcon}
                </InputAdornment>
              ),
            }}
          />
            {(type === 'cashDeposit' || type === 'Cash Withdrawal from Bank') && (
            <StyledTextField
              fullWidth
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              variant="outlined"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <Box sx={{ textAlign: "center" }}>
            <StyledButton
              variant="contained"
              startIcon={<Save />}
              onClick={() => handleSave(formData)}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </StyledButton>
          </Box>
        </CardContent>
      </MotionCard>
    </Grid>
  );
};

const BankTransaction = () => {
  const [transactionType, setTransactionType] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = async (formData) => {
    // const transactionTitle = transactionTypes.find(
    //   (t) => t.value === transactionType
    // )?.title;
    // toast.success(`${transactionTitle} saved`);
    // setIsSaved(true);
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth || !auth.token) {
        toast.error("No authentication token found");
        return;
      }

      const transactionData = {
        transactionType: transactionTypes.find(t => t.value === transactionType).title,
        ...formData,
        date: formData.date ? dayjs(formData.date).format('YYYY-MM-DD') : null, // Format the date

      };
      const response = await axios.post(
        "http://localhost:4000/api/v1/transaction/add",
        transactionData,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      toast.success(`${transactionData.transactionType} saved`);
      setIsSaved(true);
      console.log("response", response);

    } catch (error) {
      toast.error(`Error saving transaction: ${error.response?.data?.message || error.message}`);

    }
  };



  
  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Toaster />
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <MotionPaper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold", color: "#00796b" }}
            >
              Choose Transaction Type
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <StyledFormControl variant="outlined">
              <InputLabel>Select Transaction Type</InputLabel>
              <Select
                value={transactionType}
                onChange={(e) => {
                  setTransactionType(e.target.value);
                  setIsSaved(false);
                }}
                label="Select Transaction Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {transactionTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.title}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </MotionPaper>
        </Grid>
        {!isSaved && (
          <TransactionForm type={transactionType} handleSave={handleSave} />
        )}
      </Grid>
    </Container>
  );
};

export default BankTransaction;

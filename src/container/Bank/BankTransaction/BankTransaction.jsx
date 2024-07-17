import React from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";

const BankTransaction = () => {
  const handleSave = (type) => {
    console.log(`transaction saved`);
  };

  const transactionTypes = [
    {
      title: "Bank to Bank Transaction",
      fromAccountLabel: "Bank Name",
      toAccountLabel: "Bank Name",
    },
    {
      title: "Cash Deposit in Bank",
      fromAccountLabel: "Cash",
      toAccountLabel: "Bank Name",
    },
    {
      title: "Cash Withdraw from Bank",
      fromAccountLabel: "Bank Name",
      toAccountLabel: "Cash",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={3}>
      {/* Bank to Bank Transaction */}
          <Grid item xs={12} md={4} >
            <Paper elevation={3} sx={{ p: 2, backgroundColor: "#fff" }}>
              <Typography variant="h6" gutterBottom>
              Bank to Bank Transaction
              </Typography>
              <Divider sx={{ my: 1 }} />
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Contra No"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="From Account"
                variant="outlined"
                margin="normal"
                helperText="Bank Name"
              />
              <TextField
                fullWidth
                label="To Account"
                variant="outlined"
                margin="normal"
                helperText="Bank Name"
              />
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  className="btn-design"
                  onClick={() => handleSave()}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Cash Deposit in Bank */}
          <Grid item xs={12} md={4} >
            <Paper elevation={3} sx={{ p: 2, backgroundColor: "#fff" }}>
              <Typography variant="h6" gutterBottom>
              Cash Deposit in Bank
              </Typography>
              <Divider sx={{ my: 1 }} />
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Contra No"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="From Account"
                variant="outlined"
                margin="normal"
                helperText="Cash"
              />
              <TextField
                fullWidth
                label="To Account"
                variant="outlined"
                margin="normal"
                helperText="Bank Name"
              />
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  className="btn-design"
                  onClick={() => handleSave()}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Cash Withdraw from Bank */}
          <Grid item xs={12} md={4} >
            <Paper elevation={3} sx={{ p: 2, backgroundColor: "#fff" }}>
              <Typography variant="h6" gutterBottom>
              Cash Withdraw from Bank
              </Typography>
              <Divider sx={{ my: 1 }} />
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Contra No"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="From Account"
                variant="outlined"
                margin="normal"
                helperText="Bank Name"
              />
              <TextField
                fullWidth
                label="To Account"
                variant="outlined"
                margin="normal"
                helperText="Cash"
              />
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  className="btn-design"
                  onClick={() => handleSave()}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          </Grid>


      </Grid>
    </Container>
  );
};

export default BankTransaction;

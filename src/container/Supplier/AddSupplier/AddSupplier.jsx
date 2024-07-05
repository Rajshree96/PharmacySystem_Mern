import React from 'react';
import {
  Box, Button, Card, CardContent, Grid, MenuItem, TextField, Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#ffe6e6",
    // padding: theme.spacing(2),
  },
  card: {
    width: '100%',
    maxWidth: 800,
    margin: '1rem',
    // padding: theme.spacing(2),
    // backgroundColor: '#ffcccc',
  },
  section: {
    // marginTop: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: theme.spacing(2),
  },
  button: {
    width: '100px',
  },
}));

const registrationTypes = [
  { value: 'Composition', label: 'Composition' },
  { value: 'Regular', label: 'Regular' },
];

const AddSupplier = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState({
    name: '',
    address: '',
    state: '',
    pinCode: '',
    country: '',
    contact: '',
    email: '',
    website: '',
    bankName: '',
    bankAddress: '',
    ifscCode: '',
    accountHolderName: '',
    accountNumber: '',
    registrationType: '',
    gstin: '',
    openingBalance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Supplier Details:</Typography>
          <Grid container spacing={2}>
            {['name', 'address', 'state', 'pinCode', 'country', 'contact', 'email', 'website'].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  variant="outlined"
                  name={field}
                  value={formValues[field]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" gutterBottom className={classes.section}>Banking Details:</Typography>
          <Grid container spacing={2}>
            {['bankName', 'bankAddress', 'ifscCode', 'accountHolderName', 'accountNumber'].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field.split(/(?=[A-Z])/).join(' ')}
                  variant="outlined"
                  name={field}
                  value={formValues[field]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" gutterBottom className={classes.section}>Statutory Details:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Registration Type"
                variant="outlined"
                name="registrationType"
                value={formValues.registrationType}
                onChange={handleChange}
              >
                {registrationTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GSTIN"
                variant="outlined"
                name="gstin"
                value={formValues.gstin}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom className={classes.section}>Opening Balance:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opening Balance"
                variant="outlined"
                name="openingBalance"
                value={formValues.openingBalance}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box className={classes.buttonContainer}>
            <Button variant="contained" color="primary" className={classes.button}>
              Create
            </Button>
            <Button variant="contained" className={classes.button}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddSupplier;

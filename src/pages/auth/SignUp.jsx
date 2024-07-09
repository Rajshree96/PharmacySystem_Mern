import React from 'react'
import { Box, Button, Card, CardContent, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import sign from '../../assets/signup.png';
import PersonIcon from '@mui/icons-material/Person';
import MaleIcon from '@mui/icons-material/Male';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PasswordIcon from '@mui/icons-material/Password';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const genderOptions = [
  { value: 'Male' },
  { value: 'Female' },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  pinCode: Yup.string().required('Pin Code is required'),
  country: Yup.string().required('Country is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      state: '',
      pinCode: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/user/register', values, {
          headers: {
            'content-type': 'application/json',
          },
        });

        console.log('Form submitted successfully:', response.data);
        navigate('/login');
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <Grid p={2} container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', bgcolor: "#e0f7fa" }}>
      <Card>
        <CardContent>
          <Box style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <Box>
              <img src={sign} alt='lock' height='120px' />
            </Box>
            <Box style={{ margin: '10px' }}>
              <Typography variant='h4' style={{ fontWeight: 'bold', color: "#00796b" }}>
                Sign Up
              </Typography>
              <Typography style={{ fontWeight: 'bold', color: "#00796b" }}>Please enter your registration Information</Typography>
            </Box>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={5} mt={0}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
            </Grid>
            <Grid container mt={4}>
              <Grid item xs={12} sm={12} md={5.7} lg={5.7}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MaleIcon />
                      </InputAdornment>
                    ),
                  }}
                  select
                  label="Gender"
                  fullWidth
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} mt={3}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mt={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <RegionDropdown
                  name="state"
                  country={formik.values.country}
                  value={formik.values.state}
                  onChange={(val) => formik.setFieldValue('state', val)}
                  classes="my-custom-select"
                  style={{
                    height: '50px',
                    width: '100%',
                    border: '1px solid #c4c4c4',
                    borderRadius: '4px',
                    color: 'grey',
                  }}            
                />
                {formik.touched.state && formik.errors.state && (
                  <Typography variant="caption" color="error">
                    {formik.errors.state}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="PinCode"
                  variant="outlined"
                  name="pinCode"
                  value={formik.values.pinCode}
                  onChange={formik.handleChange}
                  error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                  helperText={formik.touched.pinCode && formik.errors.pinCode}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mt={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CountryDropdown
                  name="country"
                  value={formik.values.country}
                  onChange={(val) => formik.setFieldValue('country', val)}
                  classes="my-custom-select"
                  style={{
                    height: '50px',
                    width: '100%',
                    border: '1px solid #c4c4c4',
                    borderRadius: '4px',
                    color: 'grey',
                  }}

                />
                {formik.touched.country && formik.errors.country && (
                  <Typography variant="caption" color="error" >
                    {formik.errors.country}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Grid mt={2} container>
              <Button fullWidth variant="contained" style={{ backgroundColor: "#00796b" }} type="submit">
                Register
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default SignUp;

import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import sign from '../../assets/signup.png';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import MaleIcon from '@mui/icons-material/Male';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';

const theme = createTheme({
  overrides: {
    MuiInputBase: {
      TextField: {
        background: "red",
      },
    },
  },
});
const styles = (theme) => ({
  large: {


  },
});
const gender = [
  {
    value: 'Male',
  },
  {
    value: 'Female',
  },
];
const states = [
  {
    value: 'Madhya Pradesh',
  },
  {
    value: 'Uttar Pradesh',
  },
  {
    value: 'Assam',
  },
  {
    value: 'Gujarat',
  },
];
const countries = [
  {
    value: 'India',
  },
  {
    value: 'Australia',
  },
  {
    value: 'America',
  },
  {
    value: 'China',
  },
]

const SignUp = () => {
  const classes = styles();
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [inpval, setInpval] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    state: "",
    pinCode: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getData = (e) => {
    // console.log(e.target.value)
    const { value, name } = e.target;
    // console.log(value,name)
    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })

  }
  const addData = async (e) => {
    e.preventDefault();

    const getUserArr = localStorage.getItem("userCredential");
    console.log(getUserArr);

    const { firstName, lastName, gender, address, state, country, pinCode ,email, password, confirmPassword } = inpval;

    if (firstName === "") {
      alert("firstName field is required")
    } else if (lastName === "") {
      alert("lastName field is required")
    }  else if (gender === "") {
      alert("gender field is required")
    }  else if (address === "") {
      alert("address field is required")
    } else if (state === "") {
      alert("state field is required")
    } else if (country === "") {
      alert("country field is required")
    } else if (pinCode === "") {
      alert("pincode field is required")
    } else if (email === "") {
      alert("email field is required")
    } else if (!email.includes("@")) {
      alert("enter valid email address")
    } else if (password === "") {
      alert("password field is required")
    } else if (password.length < 6) {
      alert("password length greater than 6")
    }  else if (confirmPassword === "") {
      alert("confirmPassword field is required")
    } else {
      console.log(inpval);
      try {
        const response = await axios.post('http://localhost:4000/api/v1/user/register', inpval, {
          headers: {
            "content-type": "application/json",
          }
        });
        
        console.log('Form submitted successfully:', response.data);
        history('/login');
      } catch (error) {
        alert(response.data.message);
      }

    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid p={2} container sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', bgcolor: "#e0f7fa"
      }}>
        <Card >
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
            <Grid container spacing={5} mt={0}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px',
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                  label="First Name" variant="outlined" type="text"
                  name="firstName" value={inpval.firstName} onChange={getData} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                  label="Last Name" variant="outlined" type="text"
                  name="lastName" value={inpval.lastName} onChange={getData} />
              </Grid>

            </Grid>
            <Grid container mt={4} >
              <Grid item xs={12} sm={12} md={5.7} lg={5.7}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <MaleIcon />
                      </InputAdornment>
                    )
                  }}
                  id="outlined-select-gender"
                  select
                  defaultValue="Gender"
                  label='Gender' fullWidth
                  name="gender" value={inpval.gender} onChange={getData}
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} mt={3}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    )
                  }}
                  label='Address' type="text" fullWidth
                  name="address" value={inpval.address} onChange={getData}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mt={0} >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                  }}
                  select
                  defaultValue="State"
                  label='State' fullWidth
                  name="state" value={inpval.state} onChange={getData}
                >
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                  }}
                  label='PinCode' type="text" fullWidth
                  name="pinCode" value={inpval.pinCode} onChange={getData}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mt={0} >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                  }}
                  select
                  defaultValue="Country"
                  label='Country'
                  fullWidth
                  name="country" value={inpval.country} onChange={getData}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                  type='text'
                  label='Email'
                  fullWidth
                  name="email" value={inpval.email} onChange={getData}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    )
                  }}
                  type='password'
                  label='Password'
                  fullWidth
                  name="password" value={inpval.password} onChange={getData}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    style: {
                      height: '50px'
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    )
                  }}
                  type='password'
                  label='Confirm Password'
                  fullWidth
                  name="confirmPassword" value={inpval.confirmPassword} onChange={getData}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={addData} variant="contained"
                sx={{
                  width: "200px", color: 'white', marginTop: '15px', height: '40px',
                  backgroundColor: '#00796b', "&:hover": { bgcolor: '#004d40' }
                }} >
                Sign Up
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

    </ThemeProvider>
  )
}

export default SignUp
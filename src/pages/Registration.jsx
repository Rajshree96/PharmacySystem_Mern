import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import sign from '../assets/signup.png';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
 '& .MuiInputBase-root': {
    height: '600px',
  },
});

const Registration = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [inpval, setInpval] = useState({
    email: "",
    password: ""
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
  const addData = (e) => {
    e.preventDefault();

    const getUserArr = localStorage.getItem("userCredential");
    console.log(getUserArr);

    const { email, password } = inpval;

    if (email === "") {
      alert("email field is required")
    } else if (!email.includes("@")) {
      alert("enter valid email address")
    } else if (password === "") {
      alert("password field is required")
    } else if (password.length < 6) {
      alert("password length greater than 6")
    } else {

      if (getUserArr && getUserArr.length) {
        const userData = JSON.parse(getUserArr);
        // const userLogin = userData.email === email && userData.password === password ;

        if (userData.email === email && userData.password === password) {
          alert("user login sucessfully")
          history("/medicalCenter")
        } else {
          alert("invalid details")

        }
      }

    }
  }
  return (
    <ThemeProvider theme={theme}>
    <Grid container style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
    }}>
      <Grid item lg={6} md={5} sm={7} xs={12} >
        <Card>
          <CardContent>
            <Box style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Box >
                <img src={sign} alt='lock' height='120px' />
              </Box>
              <Box style={{ margin: '5px' }}>
                <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                  Sign Up
                </Typography>
                <Typography style={{ fontWeight: 'bold' }}>Please enter your registration Information</Typography>
              </Box>
            </Box>
            <Grid conatiner spacing={0} mt={3}>
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item lg={6}>
                  <TextField id="outlined-search" placeholder='First Name' type="text" />
                </Grid>
                <Grid item lg={6}>
                  <TextField id="outlined-search" placeholder='Last Name' type="text" />
                </Grid>    
                <Button>red</Button>            
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </ThemeProvider>
  )
}

export default Registration
import React, { useState } from "react";
import {
  Button, Card, CardContent, Grid, TextField, Typography, Box, FormControl,
  OutlinedInput, InputAdornment, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import lock from "../../assets/lock.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../../component/context/auth";

const styles = () => ({
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    bgcolor: "#e0f7fa",
    '@media(maxWidth:600px)': {
      width: 'auto'
    }
  },
});

const Login = () => {
  const classes = styles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const { auth, setAuth } = useAuth(); // Correct usage of useAuth hook
  const [inpval, setInpval] = useState({
    email: "",
    password: ""
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getData = (e) => {
    const { value, name } = e.target;
    setInpval({
      ...inpval,
      [name]: value
    });
  };

  const addData = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("email field is required");
    } else if (!email.includes("@")) {
      alert("enter valid email address");
    } else if (password === "") {
      alert("password field is required");
    } else if (password.length < 6) {
      alert("password length greater than 6");
    } else {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/user/login", inpval, {
          headers: {
            "Content-Type": "application/json",
          }
        });

        setAuth({
          user: response.data.result.user,
          token: response.data.result.token,
        });
        localStorage.setItem("auth", JSON.stringify({
          user: response.data.result.user,
          token: response.data.result.token,
        }));

        navigate("/admin/dashboard");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Grid container sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', bgcolor: "#e0f7fa", padding: "121px 0 121px 0"
    }}>
      <Grid item lg={4} md={5} sm={7} xs={12} m={1} >
        <Card >
          <CardContent  >
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Box>
                <img src={lock} alt='lock' />
              </Box>
              <Box sx={{ margin: '5px' }}>
                <Typography variant='h4' sx={{ fontSize: '20px', fontWeight: 'bold', color: "#00796b" }}>
                  Login
                </Typography>
                <Typography sx={{ color: "#00796b" }}>Please enter your login information.</Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography sx={{ color: "#00796b" }}>Email</Typography>
              <TextField variant='outlined' name="email" value={inpval.email} onChange={getData}
                placeholder='Email' fullWidth />
            </Box>
            <Box mt={2}>
              <Typography sx={{ color: "#00796b" }}>Password</Typography>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder='Password'
                  name="password"
                  value={inpval.password}
                  onChange={getData}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'grid', justifyContent: 'start' }} mt={2} >
              <Typography sx={{ color: "#00796b" }}>Your strong password</Typography>
              <Box>
                <Button onClick={addData} variant="contained"
                  sx={{ width: "80px", color: 'white', marginTop: '15px', backgroundColor: '#00796b', "&:hover": { bgcolor: '#004d40' } }} >
                  Login</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
};

export default Login;

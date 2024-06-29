import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography, Box, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import lock from '../assets/lock.png'


const Login = () => {
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
        <Grid container style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
        }}>
            <Grid item lg={4} md={5} sm={7} xs={12} >
                <Card>
                    <CardContent>
                        <Box style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <Box>
                                <img src={lock} alt='lock' />
                            </Box>
                            <Box style={{ margin: '5px' }}>
                                <Typography variant='h4' style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    Login
                                </Typography>
                                <Typography>Please enter your login information.</Typography>
                            </Box>
                        </Box>
                        <Box mt={2}>
                            <Typography>Email</Typography>
                            <TextField variant='outlined' name="email" value={inpval.email} onChange={getData}
                                placeholder='Email' fullWidth />
                        </Box>
                        <Box mt={2}>
                            <Typography>Password</Typography>
                            <TextField variant='outlined' name="password" value={inpval.password} onChange={getData}
                                placeholder='Password' fullWidth />
                        </Box>
                        <Box style={{ display: 'grid', justifyContent: 'start' }} mt={2} >
                            <Typography>Your strong password</Typography>
                            <Box>
                                <Button onClick={addData} variant="contained"
                                    style={{ width: "80px", color: 'white', marginTop: '15px', backgroundColor: '#14950A' }} >
                                    Login</Button>
                            </Box>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login
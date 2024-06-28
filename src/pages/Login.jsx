import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography, Box, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [inpval, setInpval] = useState({
        name: "",
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

        const { name, email, password } = inpval;

        if (name === "") {
            alert("name field is required")
        } else if (email === "") {
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
        <Grid item lg={3} xs={10} md={4}>
            <Card>
                <CardContent>
                    <Typography variant='h6' style={{ fontSize: '20px', fontWeight: 'bold' }}>Hi!
                        Log in to Dashboard</Typography>
                    <Box mt={2}>
                        <TextField variant='outlined' name="name" value={inpval.name} onChange={getData} placeholder='Enter Your Name' fullWidth />
                    </Box>
                    <Box mt={2}>
                        <TextField variant='outlined' name="email" value={inpval.email} onChange={getData} placeholder='Enter Your Email' fullWidth />
                    </Box>
                    <Box mt={2}>
                        <TextField variant='outlined' name="password" value={inpval.password} onChange={getData} placeholder='Enter your Password' fullWidth />
                    </Box>
                    <Box style={{ display: 'flex', justifyContent: 'end' }} mt={2}>
                        <Typography>Don't have account, <Link to='/signup'>click here</Link></Typography>
                    </Box>
                    <Box style={{ display: 'grid', justifyContent: 'center' }} mt={2} >
                        <Button onClick={addData} style={{ width: "150px", color: 'white', backgroundImage: "linear-gradient(#D1CCF4,#E6CECE)" }}>Login</Button>
                    </Box>
                    
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default Login
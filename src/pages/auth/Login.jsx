import React, { useState } from 'react';
import {
    Button, Card, CardContent, Grid, TextField, Typography, Box, FormControl,
    OutlinedInput, InputAdornment, IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import lock from '../../assets/lock.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    cover: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: "#e0f7fa",      
        // padding:"121px 0px 120px 0px",
        '@media (max-width:600px)': {
            padding:" 10px"

        },
        // [theme.breakpoints.down('sm')]: {
        //     width: 'auto',
        // }
    },
    card: {
        margin: '1rem',
    },
    cardContent: {
        display: 'flex', 
        justifyContent: 'start', 
        alignItems: 'center'
    },
    lockImage: {
        margin: '5px'
    },
    formControl: {
        width: '100%',
    },
    loginButton: {
        width: "80px",
        color: 'white',
        marginTop: '15px',
        backgroundColor: '#00796b',
        "&:hover": {
            backgroundColor: '#004d40'
        }
    }
}));

const Login = () => {
    const classes = useStyles();
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState([]);
    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validate = () => {
        let temp = {};
        temp.email = inpval.email ? "" : "Email field is required";
        temp.email = /.+@.+..+/.test(inpval.email) ? "" : "Email is not valid";
        temp.password = inpval.password ? "" : "Password field is required";
        temp.password = inpval.password.length > 5 ? "" : "Password length must be greater than 6";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    };

    const getData = (e) => {
        const { value, name } = e.target;
        setInpval({ ...inpval, [name]: value });
    };

    const addData = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post('http://localhost:4000/api/v1/user/login', inpval, {
                    headers: { "content-type": "application/json" }
                });

                localStorage.setItem('token', response.data.result);
                history('/dashboard');
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <Grid container className={classes.cover}>
            <Grid item lg={4} md={5} sm={7} xs={12} className={classes.card}>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Box>
                            <img src={lock} alt='lock' />
                        </Box>
                        <Box className={classes.lockImage}>
                            <Typography variant='h4' sx={{ fontSize: '20px', fontWeight: 'bold', color: "#00796b" }}>
                                Login
                            </Typography>
                            <Typography sx={{ color: "#00796b" }}>Please enter your login information.</Typography>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Box mt={2}>
                            <Typography sx={{ color: "#00796b" }}>Email</Typography>
                            <TextField 
                                variant='outlined' 
                                name="email" 
                                value={inpval.email} 
                                onChange={getData}
                                placeholder='Email' 
                                fullWidth 
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                        </Box>
                        <Box mt={2}>
                            <Typography sx={{ color: "#00796b" }}>Password</Typography>
                            <FormControl className={classes.formControl} error={Boolean(errors.password)}>
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
                                {errors.password && <Typography color="error" variant="body2">{errors.password}</Typography>}
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'grid', justifyContent: 'start' }} mt={2}>
                            <Typography sx={{ color: "#00796b" }}>Your strong password</Typography>
                            <Box>
                                <Button onClick={addData} variant="contained" className={classes.loginButton}>
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login;

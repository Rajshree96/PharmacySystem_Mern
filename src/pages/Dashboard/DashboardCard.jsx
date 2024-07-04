import React, { useState } from "react";
import { styled, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Card, CardContent, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import graph from "../../assets/graph.png";
import image1 from "../../assets/img1.png";
import dumy from "../../assets/dumy.png";
import circle from '../../assets/circleGraph.jpeg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import InventoryIcon from '@mui/icons-material/Inventory';
import HealingIcon from '@mui/icons-material/Healing';
import DescriptionIcon from '@mui/icons-material/Description';
import sales from '../../assets/sales.png'
import pie from '../../assets/pieGraph.png'
import purchase from '../../assets/credit.png'
import stock from '../../assets/stock.png'
import day from '../../assets/day.png'
import customer from '../../assets/customer.png'
import store from '../../assets/store.png'
import medicine from '../../assets/medicine.png'
import inventry from '../../assets/inventry.png'
import expire from '../../assets/expire.png'
import invoice from '../../assets/invoice.png'
import { useNavigate } from "react-router-dom";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#086070",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const createData = (name, calories, fat, carbs) => {
    return { name, calories, fat, carbs };
};

const rows = [
    createData('syruf', 159, 6.0, 24, 4.0),
    createData('capsules', 237, 9.0, 37, 4.3),
    createData('tablets', 262, 16.0, 24, 6.0),
    createData('syrum', 305, 3.7, 67, 4.3),
    createData('cold tab', 356, 16.0, 49, 3.9),
];
const styles ={
    tableCard: {
     width: 'auto',
      height: 'auto'
    },
};

const DashboardCard = () => {
const classes = styles;
    // const handleCard =()=>{
    //     console.log("medicine")
    //     return(<AddMedicine/>)
    // };
    return (
        <>
            <Box className="dashboardcard">
                <Grid container spacing={2}>
                    <Grid item lg={2} md={2} sm={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 'auto' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                            <img src={customer} alt="logo" height={50} width={50} />
                                        <Typography variant="h6" sx={{ fontWeight: '700' ,color:"#78A75A",fontSize:"25px"}}> 15</Typography>
                                    </Box>
                                    <Box mt='8px'>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                                            Total Customer
                                        </Typography>
                                        <img src={graph} alt='graph' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid item lg={2} md={2} sm={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 'auto' }}>
                                <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                            <img src={store} alt="logo" height={50} width={50} />
                                        <Typography variant="h6" sx={{ fontWeight: '700' ,color:"#EA33F7",fontSize:"25px"}}> 546</Typography>
                                    </Box>
                                    <Box mt='8px'>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '17px', width: '155px' }} >
                                            Total Manufacturer
                                        </Typography>
                                        <img src={graph} alt='graph' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid item lg={2} md={2} sm={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 'auto' ,cursor:'pointer'}} >
                                <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                            <img src={medicine} alt="logo" height={50} width={50} />
                                        <Typography variant="h6" sx={{ fontWeight: '700' ,color:"#2854C5",fontSize:"25px"}}> 375</Typography>
                                    </Box>
                                    <Box mt='8px'>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                                            Total Medicine
                                        </Typography>
                                        <img src={graph} alt='graph' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid item lg={2} md={2} sm={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 'auto' }}>
                                <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                            <img src={inventry} alt="logo" height={50} width={50} />
                                        <Typography variant="h6" sx={{ fontWeight: '700' ,color:"#BB271A",fontSize:"25px"}}> 285</Typography>
                                    </Box>
                                    <Box mt='8px'>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                                            Out of Stock
                                        </Typography>
                                        <img src={graph} alt='graph' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid item lg={2} md={2} sm={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 'auto' }}>
                                <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                            <img src={expire} alt="logo" height={50} width={50} />
                                        <Typography variant="h6" sx={{ fontWeight: '700' ,color:"#8C1AF6",fontSize:"25px"}}> 895</Typography>
                                    </Box>
                                    <Box mt='8px'>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                                            Expired
                                        </Typography>
                                        <img src={graph} alt='graph' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid item lg={2} md={2} sm={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 'auto' }}>
                                <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                            <img src={invoice} alt="logo" height={50} width={50} />
                                        <Typography variant="h6" sx={{ fontWeight: '700' ,color:"#F19E39",fontSize:"25px"}}> 785</Typography>
                                    </Box>
                                    <Box mt='8px'>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                                            Total Invoice
                                        </Typography>
                                        <img src={graph} alt='graph' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                </Grid>

                <Grid container spacing={2} mt='1rem'>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <CardContent >
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
                                    <Box sx={{ display: 'grid', justifyContent: 'start', gap: '5px', alignItems: 'start' }}>
                                        <img src={sales} alt='graph' height={50} width={50} />
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#EA3323', fontWeight: '600', fontSize: '19px' }} >
                                            Sales Report
                                        </Typography>
                                    </Box>
                                    <img src={pie} alt='graph' height={50} width={50} />
                                </Box>
                            </CardContent>
                        </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <CardContent >
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
                                    <Box sx={{ display: 'grid', justifyContent: 'start', gap: '5px', alignItems: 'start' }}>
                                        <img src={purchase} alt='graph' height={50} width={50} />
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#8C1AF6', fontWeight: '600', fontSize: '18px' }} >
                                            Purchase Report
                                        </Typography>
                                    </Box>
                                    <img src={pie} alt='graph' height={50} width={50} />
                                </Box>
                            </CardContent>
                        </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <CardContent >
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
                                    <Box sx={{ display: 'grid', justifyContent: 'start', gap: '5px', alignItems: 'start' }}>
                                        <img src={stock} alt='graph' height={50} width={50} />
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#78A75A', fontWeight: '600', fontSize: '18px' }} >
                                            Stock Report
                                        </Typography>
                                    </Box>
                                    <img src={pie} alt='graph' height={50} width={50} />
                                </Box>
                            </CardContent>
                        </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <CardContent >
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
                                    <Box sx={{ display: 'grid', justifyContent: 'start', gap: '5px', alignItems: 'start' }}>
                                        <img src={day} alt='graph' height={50} width={50} />
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#0000F5', fontWeight: '600', fontSize: '18px' }} >
                                            Day Book
                                        </Typography>
                                    </Box>
                                    <img src={pie} alt='graph' height={50} width={50} />
                                </Box>
                            </CardContent>
                        </Card>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={4} mt='1rem' >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Card sx={{ width: 'auto', height: '420px' }}>
                            <CardContent>
                                <Box sx={{ display: 'grid', justifyContent: 'start', alignItems: 'center' }}>
                                    <Typography variant='h6' sx={{ color: 'grey' }}>Statistics</Typography>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '700', fontSize: '25px' }} >
                                        Monthly Progress Report
                                    </Typography>
                                    <Box>
                                        <img src={dumy} alt='graph' style={{ width: '530px', height: '320px' }} />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Card sx={{ width: 'auto', height: '420px' }}>
                            <CardContent>
                                <Box sx={{ display: 'grid', justifyContent: 'start', alignItems: 'center' }}>
                                    <Typography variant='h6' sx={{ color: 'grey' }}>Statistics</Typography>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '700', fontSize: '25px' }} >
                                        Inventory Report
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={circle} alt='graph' />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={4} mt='1rem' >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Card sx={classes.tableCard} >
                            <CardContent>
                                <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography variant='h6' sx={{ color: 'grey' }}>Data Table</Typography>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '700', fontSize: '25px' }} >
                                        Medicine Report
                                    </Typography>
                                    <Box >
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                                                <TableHead >
                                                    <TableRow >
                                                        <StyledTableCell>Medicine Name</StyledTableCell>
                                                        <StyledTableCell align="right">Category</StyledTableCell>
                                                        <StyledTableCell align="right">Medicine Type</StyledTableCell>
                                                        <StyledTableCell align="right">Unit</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <StyledTableRow key={row.name}>
                                                            <StyledTableCell component="th" scope="row" sx={{ color: '#086070' }}>
                                                                {row.name}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" sx={{ color: '#086070' }}>{row.calories}</StyledTableCell>
                                                            <StyledTableCell align="right" sx={{ color: '#086070' }}>{row.fat}</StyledTableCell>
                                                            <StyledTableCell align="right" sx={{ color: '#086070' }}>{row.carbs}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Card sx={{ width: 'auto', height: 'auto' }} >
                            <CardContent>
                                <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography variant='h6' sx={{ color: 'grey' }}>Data Table</Typography>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '700', fontSize: '25px' }} >
                                        Invoice Report
                                    </Typography>
                                    <Box>
                                        <TableContainer component={Paper} >
                                            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                                                <TableHead sx={{ bgcolor: 'red' }}>
                                                    <TableRow >
                                                        <StyledTableCell>Sale Invoice</StyledTableCell>
                                                        <StyledTableCell align="right">POS Scale</StyledTableCell>
                                                        <StyledTableCell align="right">GUI Scale</StyledTableCell>
                                                        <StyledTableCell align="right">Sale Return</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <StyledTableRow key={row.name}>
                                                            <StyledTableCell component="th" scope="row" sx={{ color: '#086070' }}>
                                                                {row.name}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" sx={{ color: '#086070' }}>{row.calories}</StyledTableCell>
                                                            <StyledTableCell align="right" sx={{ color: '#086070' }}>{row.fat}</StyledTableCell>
                                                            <StyledTableCell align="right" sx={{ color: '#086070' }}>{row.carbs}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default DashboardCard
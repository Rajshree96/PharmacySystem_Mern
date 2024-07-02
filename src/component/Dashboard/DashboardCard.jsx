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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DashboardCard = () => {
    return (
        <>
            <Box className="dashboardcard">
                <Grid container spacing={1}>
                    <Grid item lg={2} md={2} sm={3} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 'auto' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                                            <PersonIcon sx={{ color: 'black' }} />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: '700' }}> 15</Typography>
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
                                        <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                                            <PersonIcon sx={{ color: 'black' }} />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: '700' }}> 566</Typography>
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
                            <Card sx={{ maxWidth: 'auto' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                                            <PersonIcon sx={{ color: 'black' }} />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: '700' }}> 878</Typography>
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
                                        <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                                            <PersonIcon sx={{ color: 'black' }} />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: '700' }}> 563</Typography>
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
                                        <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                                            <PersonIcon sx={{ color: 'black' }} />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: '700' }}> 563</Typography>
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
                                        <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                                            <PersonIcon sx={{ color: 'black' }} />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: '700' }}> 764</Typography>
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

                <Grid container spacing={1} mt='2rem'>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CardContent >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                                        <Box style={{ backgroundColor: '#086070', color: 'white', height: '50px', width: '50px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                                        </Box>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                                            Sales Report
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CardContent >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                                        <Box style={{ backgroundColor: '#086070', color: 'white', height: '50px', width: '50px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                                        </Box>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                                            Purchase Report
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CardContent >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                                        <Box style={{ backgroundColor: '#086070', color: 'white', height: '50px', width: '50px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                                        </Box>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                                            Stock Report
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Card sx={{ width: '280px', height: '130px', bgcolor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CardContent >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                                        <Box style={{ backgroundColor: '#086070', color: 'white', height: '50px', width: '50px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                                        </Box>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                                            Day Book
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={0} mt='2rem' >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '580px', height: '420px' }}>
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
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '580px', height: '420px' }}>
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
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3} mt='2rem' >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
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
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
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
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default DashboardCard
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
import CountUp from 'react-countup';
import { makeStyles } from '@mui/styles';

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

const theme = createTheme({
    spacing: 0, 
  });

const useStyles = makeStyles ({
    dashboardcard: {
        padding: theme.spacing(2),
    },
    cardBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        maxWidth: 'auto',
        height:'160px'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    countUpBox: {
        display: 'flex',
        justifyContent: 'start',
        gap: '5px',
        alignItems: 'center',
    },
    cardTypography: {
        color: '#086070',
        fontWeight: 700,
        // fontSize: '18px',
        width: '150px',
        '@media(max-width(600))':{
            width:"auto"
        }
    },
    graphImage: {
        width: '530px',
        height: '320px',
    },
    tableCard: {
        width: 'auto',
        height: 'auto',
    },
    tableContainer: {
        minWidth: 500,
    },
    statisticTable: {
        minWidth: 500,
    },
    statisticTableCell: {
        color: '#086070',
    },
    graphCard:{
        maxWidth: 'auto',
        height:'450px'
    },
    saleBox: {
        display: 'grid',
        justifyContent: 'start',
        gap: '5px',
        alignItems: 'center',
    },
    saleCard:{
        display:'flex',     
    },
    saleBoxIcon:{
        display:'flex',
        justifyContent:'end',
        alignItems:'end'
    }
});
const DashboardCard = () => {
    const classes = useStyles();
    // const handleCard =()=>{
    //     console.log("medicine")
    //     return(<AddMedicine/>)
    // };
    return (
        <>
          <Box className={classes.dashboardcard}>
            <Grid container spacing={2}>
                
                {[{ img: customer, end: 180, color: "#78A75A", title: "Total Customer" },
                { img: store, end: 120, color: "#EA33F7", title: "Total Manufacturer" },
                { img: medicine, end: 70, color: "#2854C5", title: "Total Medicine" },
                { img: inventry, end: 89, color: "#BB271A", title: "Out of Stock" },
                { img: expire, end: 56, color: "#8C1AF6", title: "Expired" },
                { img: invoice, end: 69, color: "#F19E39", title: "Total Invoice" }
                ].map((item, index) => (
                    <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
                        <Box className={classes.cardBox}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Box className={classes.countUpBox}>
                                        <img src={item.img} alt="logo" height={50} width={50} />
                                        <CountUp start={0} end={item.end} delay={0} style={{ fontWeight: '700', color: item.color, fontSize: "25px" }} />
                                    </Box>
                                    <Box mt='8px'>
                                        <Typography gutterBottom variant="p" component="div" className={classes.cardTypography}>
                                            {item.title}
                                        </Typography>
                                        <img src={graph} alt='graph' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Additional Grids for Reports */}
            <Grid container spacing={2} mt='1rem'>
                {[{ img: sales, color: "#EA3323", title: "Sales Report" },
                { img: purchase, color: "#8C1AF6", title: "Purchase Report" },
                { img: stock, color: "#78A75A", title: "Stock Report" },
                { img: day, color: "#0000F5", title: "Day Book" }
                ].map((item, index) => (
                    <Grid item lg={3} md={3} sm={6} xs={12} key={index}>
                        <Box>
                            <Card >
                                <CardContent className={classes.saleCard}>
                                    <Box className={classes.saleBox}>
                                        <img src={item.img} alt="logo" height={50} width={50} />
                                        <Typography gutterBottom variant="h6" component="div" style={{ color: item.color, fontWeight: '600', fontSize: '19px' }}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.saleBoxIcon}>
                                    <img src={pie} alt='graph' height={50} width={50} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Statistics Grids */}
            <Grid container spacing={4} mt='1rem'>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card className={classes.graphCard} >
                        <CardContent>
                            <Box>
                                <Typography variant='h6' style={{ color: 'grey' }}>Statistics</Typography>
                                <Typography gutterBottom variant="h6" component="div" style={{ color: 'black', fontWeight: '700', fontSize: '25px' }}>
                                    Monthly Progress Report
                                </Typography>
                                <img src={dumy} alt='graph' className={classes.graphImage} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card className={classes.graphCard}>
                        <CardContent>
                                <Typography variant='h6' style={{ color: 'grey' }}>Statistics</Typography>
                                <Typography gutterBottom variant="h6" component="div" style={{ color: 'black', fontWeight: '700', fontSize: '25px' }}>
                                    Inventory Report
                                </Typography>
                            <Box style={{display:'grid',justifyContent:'center'}}>
                                <img src={circle} alt='graph'/>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Data Table Grids */}
            <Grid container spacing={4} mt='1rem'>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card className={classes.tableCard}>
                        <CardContent>
                            <Box>
                                <Typography variant='h6' style={{ color: 'grey' }}>Data Table</Typography>
                                <Typography gutterBottom variant="h6" component="div" style={{ color: 'black', fontWeight: '700', fontSize: '25px' }}>
                                    Medicine Report
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table className={classes.statisticTable}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Medicine Name</StyledTableCell>
                                                <StyledTableCell align="right">Category</StyledTableCell>
                                                <StyledTableCell align="right">Medicine Type</StyledTableCell>
                                                <StyledTableCell align="right">Unit</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row" className={classes.statisticTableCell}>
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right" className={classes.statisticTableCell}>{row.calories}</StyledTableCell>
                                                    <StyledTableCell align="right" className={classes.statisticTableCell}>{row.fat}</StyledTableCell>
                                                    <StyledTableCell align="right" className={classes.statisticTableCell}>{row.carbs}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card className={classes.tableCard}>
                        <CardContent>
                            <Box>
                                <Typography variant='h6' style={{ color: 'grey' }}>Data Table</Typography>
                                <Typography gutterBottom variant="h6" component="div" style={{ color: 'black', fontWeight: '700', fontSize: '25px' }}>
                                    Invoice Report
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table className={classes.tableContainer}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Sale Invoice</StyledTableCell>
                                                <StyledTableCell align="right">POS Scale</StyledTableCell>
                                                <StyledTableCell align="right">GUI Scale</StyledTableCell>
                                                <StyledTableCell align="right">Sale Return</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row" className={classes.statisticTableCell}>
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right" className={classes.statisticTableCell}>{row.calories}</StyledTableCell>
                                                    <StyledTableCell align="right" className={classes.statisticTableCell}>{row.fat}</StyledTableCell>
                                                    <StyledTableCell align="right" className={classes.statisticTableCell}>{row.carbs}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
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
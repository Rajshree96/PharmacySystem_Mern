import React, { useEffect, useState } from "react";
import {
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sales from "../../assets/sales.png";
import purchase from "../../assets/credit.png";
import stock from "../../assets/stock.png";
import day from "../../assets/day.png";
import customer from "../../assets/customer.png";
import store from "../../assets/store.png";
import medicine from "../../assets/medicine.png";
import inventry from "../../assets/inventry.png";
import expire from "../../assets/expire.png";
import invoice from "../../assets/invoice.png";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { makeStyles } from "@mui/styles";
import { PieChart } from "react-minimal-pie-chart";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import hexToRgba from "hex-to-rgba";
import SalesEstimate from "../../container/Sales/SalesEstimate/SalesEstimate"
import { getAllCategories } from "../../categoriesApi";
import axios from "axios";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const createData = (name, calories, fat, carbs) => {
  return { name, calories, fat, carbs };
};

const rows = [
  createData("syruf", 159, 6.0, 24, 4.0),
  createData("capsules", 237, 9.0, 37, 4.3),
  createData("tablets", 262, 16.0, 24, 6.0),
  createData("syrum", 305, 3.7, 67, 4.3),
  createData("cold tab", 356, 16.0, 49, 3.9),
];

const theme = createTheme({
  spacing: 15,
});

// inline css
const useStyles = makeStyles({
  dashboardcard: {
    padding: theme.spacing(2),
  },
  cardBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: "auto",
    height: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  countUpBox: {
    display: "flex",
    justifyContent: "start",
    gap: "5px",
    alignItems: "center",
  },
  cardTypography: {
    color: "black",
    fontWeight: 700,
    fontSize: "15px",
    // width: '150px',
    "@media(max-width(600))": {
      width: "auto",
    },
  },
  graphImage: {
    width: "530px",
    height: "320px",
  },
  tableCard: {
    width: "auto",
    height: "auto",
  },
  tableContainer: {
    minWidth: 500,
  },
  statisticTable: {
    minWidth: 500,
  },
  statisticTableCell: {
    color: "#086070",
  },
  graphCard: {
    maxWidth: "auto",
    height: "450px",
  },
  saleBox: {
    display: "grid",
    justifyContent: "start",
    // gap: '5px',
    alignItems: "center",
  },
  saleCard: {
    display: "flex",
    maxWidth: "auto",
    height: "130px",
    cursor:'pointer'
  },
  saleBoxIcon: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  mobCard: {
    display: "block",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  // graphCard: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     textAlign: 'center',
  //     height: '100%',
  // },
  pieChart: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "300px", // adjust this value as needed
    // position: 'relative',
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    gap:"15px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
  },
  legendColor: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
  },

});

const MiniLineGraph = ({ color }) => {
  const data = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      {
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.2),
        fill: true,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

const DashboardCard = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [ manufacturer, setmanufacturer ] = useState([]);
   const[medicines, setMedcine] = useState([]);
   const [invoices, setInvoice] = useState([]);


  useEffect(() => {
    fetchCustomer();
  }, []);
  

  const fetchCustomer = async () => {
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth || !auth.token) {
            console.error("No token found in local storage");
            return;
        }
        const response = await axios.get("http://localhost:4000/api/v1/customer/getall", {
            headers: {Authorization: `Bearer ${auth.token}`},
        });
        console.log("API Response:", response);

        if (Array.isArray(response.data)) {
              setCustomers(response.data);
        }
        else {
            console.error("API response does not contain cutomer array:", response.data);
        }
    } catch (error) {
        console.error("Error fetching manufacturer:", error);
    }
};

const fetchManufacturer = async () => {
  try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth || !auth.token) {
          console.error("No token found in local storage");
          return;
      }
      const response = await axios.get("http://localhost:4000/api/v1/admin/getAllManufacturer", {
          headers: {Authorization: `Bearer ${auth.token}`},
      });
      console.log("API Response:", response.data.result);

      if (Array.isArray(response.data.result)) {
          setmanufacturer(response.data.result);
      }
      else {
          console.error("API response does not contain manufacturer array:", response.data);
      }
  } catch (error) {
      console.error("Error fetching manufacturer:", error);
  }
};

useEffect(() => {
  fetchManufacturer();
  fetchMedicine();
  fetchSales();
}, []);




const fetchMedicine = async () => {
  try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth || !auth.token) {
          console.error("No token found in local storage");
          return;
      }
      const response = await axios.get("http://localhost:4000/api/v1/admin/getallmedicine", {
          headers: {Authorization: `Bearer ${auth.token}`},
      });
      console.log("API Response:", response.data.result);

      if (Array.isArray(response.data.result)) {
           setMedcine(response.data.result);
      }
      else {
          console.error("API response does not contain medicine array:", response.data);
      }
  } catch (error) {
      console.error("Error fetching medcine:", error);
  }
};


const fetchSales = async () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }
    const response = await axios.get("http://localhost:4000/api/v1/salesinvoice/getAll", {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    console.log("API Response:", response.data);

    if (Array.isArray(response.data)) {
      setInvoice(response.data);
    } else {
      console.error("API response does not contain invoice array:", response.data.result);
    }
  } catch (error) {
    console.error("Error fetching invoice:", error);
  }
};
  const cardData = [
    {
      img: customer,
      end: customers.length,
      color: "#78A75A",
      title: "Total Customer",
    },
    {
      img: store,
      end: manufacturer.length,
      color: "#EA33F7",
      title: "Total Manufacturer",
    },
    {
      img: medicine,
      end: medicines.length,
      color: "#2854C5",
      title: "Total Medicine",
    },
    { img: inventry, end: 89, color: "#BB271A", title: "Out of Stock" },
    { img: expire, end: 56, color: "#8C1AF6", title: "Expired" },
    { img: invoice, end: invoices.length, color: "#F19E39", title: "Total Invoice" },
  ];
  const pieData = [
    { title: "Total Medicine", value: 10, color: "#E38627" },
    { title: "Out of Stock", value: 15, color: "#C13C37" },
    { title: "Total Invoice", value: 20, color: "#6A2135" },
  ];
  const reports = [
    { value: 70, color: "#EA3323", title: "Sales Report", img: sales,  route: <SalesEstimate/> },
    { value: 50, color: "#8C1AF6", title: "Purchase Report", img: purchase,  route:<SalesEstimate/> },
    { value: 90, color: "#78A75A", title: "Stock Report", img: stock,  route:<SalesEstimate/> },
    { value: 30, color: "#0000F5", title: "Day Book", img: day,  route:<SalesEstimate/> },
  ];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Progress",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Monthly Progress",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "#086070",
        borderColor: "#086070",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
  };

  const navigate = useNavigate();
  const handleCardClick = (route) => {
    navigate(route);
  };
  return (
    <>
      <Box className={classes.dashboardcard}>
        <Grid container spacing={2}>
          {cardData.map((item, index) => (
            <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
              <Card className={classes.card}>
                <CardContent>
                  <Box className={classes.countUpBox}>
                    <img src={item.img} alt="logo" height={50} width={50} />
                    <CountUp
                      start={0}
                      end={item.end}
                      delay={0}
                      style={{
                        fontWeight: "700",
                        color: item.color,
                        fontSize: "25px",
                      }}
                    />
                  </Box>
                  <Box mt="8px">
                    <Typography
                      gutterBottom
                      variant="p"
                      component="div"
                      className={classes.cardTypography}
                    >
                      {item.title}
                    </Typography>
                    <MiniLineGraph color={item.color} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional Grids for Reports */}
        <Grid container spacing={2} mt="1rem">
        {reports.map((item, index) => (
          <Grid item lg={3} md={3} sm={6} xs={12} key={index}>
            <Box>
              <Card onClick={() => handleCardClick(item.route)}>
                <CardContent className={classes.saleCard}>
                  <Grid item md={12} sm={12} className={classes.saleBox}>
                    <img src={item.img} alt="logo" height={50} width={50} />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        color: item.color,
                        fontWeight: "600",
                        fontSize: "19px",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
        </Grid>

        {/* Statistics Grids */}
        <Grid container spacing={4} mt="1rem">
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.mobCard}>
            <Card className={classes.graphCard}>
              <CardContent>
                <Typography variant="h6" style={{ color: "grey" }}>
                  Statistics
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontSize: "25px",
                  }}
                >
                  Monthly Progress Report
                </Typography>
                <Box className={classes.pieChart}>
                  <Bar data={data} options={options} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.mobCard}>
            <Card className={classes.graphCard}>
              <CardContent>
                <Typography variant="h6" style={{ color: "grey" }}>
                  Statistics
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontSize: "25px",
                  }}
                >
                  Inventory Report
                </Typography>
                <Box className={classes.pieChart}>
                <Box className={classes.legend}>
                    {pieData.map((entry, index) => (
                      <div key={index} className={classes.legendItem}>
                        <div
                          className={classes.legendColor}
                          style={{ backgroundColor: entry.color }}
                        />
                        <Typography
                          variant="p"
                          sx={{ lineHeight: "25px", fontWeight: "600" }}
                        >
                          {entry.title}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                  <PieChart
                    data={pieData}
                    label={({ dataEntry }) =>
                      `${Math.round(dataEntry.percentage)}%`
                    }
                    labelStyle={{
                      fontSize: "8px",
                      fontColor: "white",
                      fontWeight: "800",
                    }}
                    paddingAngle={5}
                    animate="true"
                    animationDuration={600}
                    style={{ height: "250px" }} // adjust this value as needed
                  />
                 
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Data Table Grids */}
        <Grid container spacing={4} mt="1rem">
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.mobCard}>
            <Card className={classes.tableCard}>
              <CardContent>
                <Box>
                  <Typography variant="h6" style={{ color: "grey" }}>
                    Data Table
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontSize: "25px",
                    }}
                  >
                    Medicine Report
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table className={classes.statisticTable}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Medicine Name</StyledTableCell>
                          <StyledTableCell align="right">
                            Category
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Medicine Type
                          </StyledTableCell>
                          <StyledTableCell align="right">Unit</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              className={classes.statisticTableCell}
                            >
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.statisticTableCell}
                            >
                              {row.calories}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.statisticTableCell}
                            >
                              {row.fat}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.statisticTableCell}
                            >
                              {row.carbs}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.mobCard}>
            <Card className={classes.tableCard}>
              <CardContent>
                <Box>
                  <Typography variant="h6" style={{ color: "grey" }}>
                    Data Table
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontSize: "25px",
                    }}
                  >
                    Invoice Report
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table className={classes.tableContainer}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Sale Invoice</StyledTableCell>
                          <StyledTableCell align="right">
                            POS Scale
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            GUI Scale
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Sale Return
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              className={classes.statisticTableCell}
                            >
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.statisticTableCell}
                            >
                              {row.calories}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.statisticTableCell}
                            >
                              {row.fat}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.statisticTableCell}
                            >
                              {row.carbs}
                            </StyledTableCell>
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
  );
};

export default DashboardCard;

import React, { useEffect, useState } from "react";
import {
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Menu from "../../layouts/Navbar/Menu";
import logo from "../../assets/service3.png";
// medicines
import Categories from "../../container/Medicine/Categories/Categories";
import MedicineType from "../../container/Medicine/MedicineType/MedicineType";
import Units from "../../container/Medicine/Units/Units";
import AddMedicine from "../../container/Medicine/AddMedicine/AddMedicine";
import DashboardCard from "../Dashboard/DashboardCard";
//manufacture

import AddManufacturer from "../../container/Manufacturer/AddManufacturer/AddManufacturer";
import ManageManufacturer from "../../container/Manufacturer/ManageManufacturer/ManageManufacturer";
import ManufacturerLedger from "../../container/Manufacturer/ManufacturerLedger/ManufacturerLedger";

//Supplier
import AddSupplier from "../../container/Supplier/AddSupplier/AddSupplier";
import ManageSupplier from "../../container/Supplier/ManageSupplier/ManageSupplier";
import SupplierLedger from "../../container/Supplier/SupplierLedger/SupplierLedger";
import AddBrand from "../../container/Brand/AddBrand";

//Customer
import AddCustomer from "../../container/Customer/AddCustomer/AddCustomer";
import ManageCustomer from "../../container/Customer/ManageCustomer/ManageCustomer";
import CustomerLedger from "../../container/Customer/CustomerLedger/CustomerLedger";

//Purchase
import PurchaseInvoice from "../../container/Purchase/PurchaseInvoice/PurchaseInvoice";
import ManagePurchaseInvoice from "../../container/Purchase/ManagePurchaseInvoice/ManagePurchaseInvoice";
import PurchaseReturn from "../../container/Purchase/PurchaseReturn/PurchaseReturn";
import PurchaseOrder from "../../container/Purchase/PurchaseOrder/PurchaseOrder";
import ManagePurchaseOrder from "../../container/Purchase/ManagePurchaseOrder/ManagePurchaseOrder";

//Sales
import SalesEstimate from "../../container/Sales/SalesEstimate/SalesEstimate";
import ManageSalesEstimate from "../../container/Sales/ManageSalesEstimate/ManageSalesEstimate";
import SalesInvoice from "../../container/Sales/SalesInvoice/SalesInvoice";
import ManageSalesInvoice from "../../container/Sales/ManageSalesInvoice/ManageSalesInvoice";
import DeliveryChallan from "../../container/Sales/DeliveryChallan/DeliveryChallan";
import ManageDeliveryChallan from "../../container/Sales/ManageDeliveryChallan/ManageDeliveryChallan";
import PosSale from "../../container/Sales/POS_Sale/PosSale";
import GuiSale from "../../container/Sales/GUI_Sale/GuiSale";
import SalesReturn from "../../container/Sales/SalesReturn/SalesReturn";

//Account
import PaymentIn from "../../container/Account/PaymentIn/PaymentIn";
import PaymentOut from "../../container/Account/PaymentOut/PaymentOut";
import Expense from "../../container/Account/Expense/Expense";
import FixedAssets from "../../container/Account/FixedAssets/FixedAssets";
import Income from "../../container/Account/Income/Income";
import Journal from "../../container/Account/Journal/Journal";

//Bank
import AddBank from "../../container/Bank/AddBank/AddBank";
import ManageBank from "../../container/Bank/ManageBank/ManageBank";
import BankTransaction from "../../container/Bank/BankTransaction/BankTransaction";
import ManageBankTransaction from "../../container/Bank/ManageBankTransaction/ManageBankTransaction";

// Cash
import AddCash from "../../container/Bank/Cash/AddCash";
import ManageCash from "../../container/Bank/Cash/ManageCash";
import axios from "axios";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const drawerWidth = 270;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor:'red',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({
    name: "Loading...",
    logo: "",
});

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const config = {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        };
        const response = await axios.get('http://localhost:4000/api/v1/business-setup/get', config);
        console.log("response", response);

        setBusinessDetails({
          name: response.data.businessInfo.businessName,
          logo: response.data.businessInfo.businessLogo,
        });
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDashboard = () => {
    window.location.reload(false);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Categories":
        return <Categories />;
      case "Medicine Type":
        return <MedicineType />;
      case "Units":
        return <Units />;
      case "Add Medicine":
        return <AddMedicine />;
      case "Add Manufacturer":
        return <AddManufacturer />;
      case "Manage Manufacturer":
        return <ManageManufacturer />;
      case "Manufacturer Ledger":
        return <ManufacturerLedger />;
      case "Add Brand":
        return <AddBrand />;
      case "Add Supplier":
        return <AddSupplier />;
      case "Manage Supplier":
        return <ManageSupplier />;
      case "Supplier Ledger":
        return <SupplierLedger />;
      case "Add Customer":
        return <AddCustomer />;
      case "Manage Customer":
        return <ManageCustomer />;
      case "Customer Ledger":
        return <CustomerLedger />;
      case "Purchase Order":
        return <PurchaseOrder />;
      case "Manage Purchase Order":
        return <ManagePurchaseOrder />;
      case "Purchase Invoice":
        return <PurchaseInvoice />;
      case "Manage Purchase Invoice":
        return <ManagePurchaseInvoice />;
      case "Purchase Return":
        return <PurchaseReturn />;
      case "Sales Estimate":
        return <SalesEstimate />;
      case "Manage Sales Estimate":
        return <ManageSalesEstimate />;
      case "Sales Invoice":
        return <SalesInvoice />;
      case "Manage Sales Invoice":
        return <ManageSalesInvoice />;
      case "Delivery Challan":
        return <DeliveryChallan />;
      case "Manage Delivery Challan":
        return <ManageDeliveryChallan />;
      case "POS Sale":
        return <PosSale />;
      case "GUI Sale":
        return <GuiSale />;
      case "Sales Return":
        return <SalesReturn />;
      case "Payment In":
        return <PaymentIn />;
      case "Payment Out":
        return <PaymentOut />;
      case "Expense":
        return <Expense />;
      case "Income":
        return <Income />;
      case "Journal":
        return <Journal />;
      case "Fixed Assets":
        return <FixedAssets />;
      case "Add Bank":
        return <AddBank />;
      case "Manage Bank":
        return <ManageBank />;
      case "Bank Transaction":
        return <BankTransaction />;
      case "Manage Bank Transaction":
        return <ManageBankTransaction />;
      case "Add Cash":
        return <AddCash />;
      default:
        return null;
    }
  };

   const main = {
      bgcolor: "#e0f7fa", 
      minHeight: "100vh",
      maxHeight:'auto'
   };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#086070" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={handleDashboard}
            sx={{ cursor: "pointer" }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        
      >
         
          <DrawerHeader sx={{ bgcolor: "#086070" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={businessDetails.businessLogo}  height="50px" width="50px" />
            <Typography
              sx={{ fontWeight: "400", color: "white", fontSize: "19px" }}
            >
             {businessDetails.name}
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? <ArrowRight /> : <ArrowRight />}
          </IconButton>
        </DrawerHeader>

        <Menu setActiveComponent={setActiveComponent} />
        <Divider />
      </Drawer>

      <Main open={open} sx={main}>
        <DrawerHeader />
        {!activeComponent ? <DashboardCard /> : renderActiveComponent()}
      </Main>
    </Box>
  );
};

export default Dashboard;

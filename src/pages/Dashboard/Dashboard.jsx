import React, { useState } from "react";
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
    padding: theme.spacing(3),
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
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
        return <AddBrand/>;
      case "Add Supplier":
        return <AddSupplier />;
      case "Manage Supplier":
        return <ManageSupplier />;
        case "Supplier Ledger":
          return <SupplierLedger />;
      default:
        return null;
    }
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
            <img src={logo} alt="logo" height="50px" width="50px" />
            <Typography
              sx={{ fontWeight: "400", color: "white", fontSize: "19px" }}
            >
              Business Name
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? <ArrowRight /> : <ArrowRight />}
          </IconButton>
        </DrawerHeader>

        <Menu setActiveComponent={setActiveComponent} />
        <Divider />
      </Drawer>

      <Main open={open} sx={{ bgcolor: "#e0f7fa", height: "auto" }}>
        <DrawerHeader />
        {!activeComponent ? <DashboardCard /> : renderActiveComponent()}
      </Main>
    </Box>
  );
};

export default Dashboard;

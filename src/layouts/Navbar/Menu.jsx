import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// const data = [
//   { label: 'Categories' },
//   { label: 'Medicine Type' },
//   { label: 'Units' },
//   { label: 'Add Medicine' },
// ];

const medicines = [
  { label: "Categories" },
  { label: "Medicine Type" },
  { label: "Units" },
  { label: "Add Medicine" },
];
const manufactuer = [
  { label: "Add Manufacturer" },
  { label: "Manage Manufacturer" },
  { label: "Manufacturer Ledger" },
];
const brands = [{ label: "Add Brand" }, { label: "Manage Brand" }];
const suppliers = [
  { label: "Add Supplier" },
  { label: "Manage Supplier" },
  { label: "Supplier Ledger" },
];
const purchases = [
  { label: "Purchase" },
  { label: "Manage Purchase" },
  { label: "Purchase Peturn" },
];
const sales = [
  { label: "Sale Invoice" },
  { label: "Manage Invoice" },
  { label: "POS Sale" },
  { label: "GUI Sale" },
  { label: "Sale Return" },
];
const customers = [{ label: "Add Customer" }, { label: "Manage Customer" }];
const accounts = [
  { label: "Payment In" },
  { label: "Payment Out" },
  { label: "Expense" },
  { label: "Income" },
  { label: "Journal" },
  { label: "Fixed Assets" },
];
const banks = [
  { label: "Add Bank" },
  { label: "Manage Bank" },
  { label: "Bank Transaction" },
];
const reports = [
  { label: "Stock Report" },
  { label: "Sales Report" },
  { label: "Purchase Report" },
];
const searchs = [
  { label: "Invoice" },
  { label: "Medicine" },
  { label: "Supplier" },
  { label: "Purchase" },
];
const settings = [{ label: "Profile" }];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Menu = ({ setActiveComponent }) => {
  const [opens, setOpens] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const [manufacturer, setManufacturer] = useState(false);
  const [brand, setBrand] = useState(false);
  const [supplier, setSupplier] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [sale, setSale] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [account, setAccount] = useState(false);
  const [bank, setBank] = useState(false);
  const [report, setReport] = useState(false);
  const [search, setSearch] = useState(false);
  const [setting, setSetting] = useState(false);
  const [logout, setLogout] = useState(false);

  //  Handle all menus item click and set active component  in dashboard
  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setOpen(false);
    navigate("/login");
  };

  //   const handleDrawerClose = () => {
  //     setOpens(false);
  //     setMedicine(false);
  //     setManufacturer(false);
  //     setBrand(false);
  //     setSupplier(false);
  //     setPurchase(false);
  //     setSale(false);
  //     setCustomer(false);
  //     setAccount(false);
  //     setBank(false);
  //     setReport(false);
  //     setSearch(false);

  //   };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: medicine ? "#086070" : "#086070",
          pb: medicine ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setMedicine(!medicine)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: medicine ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: medicine ? 1 : 0 } },
          }}
        >
          {/* <ListItemIcon sx={{ color: 'white' }}>
                    icon
                  </ListItemIcon> */}
          <ListItemText
            primary="Medicine"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: medicine ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: medicine ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>

        {/* medicines */}
        {medicine &&
          medicines.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
              component={Link}
              onClick={() => handleMenuItemClick(item.label)} // handle menus item click
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      {/* manufacturer */}
      <Box
        sx={{
          bgcolor: manufacturer ? "#086070" : "#086070",
          pb: manufacturer ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setManufacturer(!manufacturer)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: manufacturer ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: manufacturer ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Manufacturer"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: manufacturer ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: manufacturer ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {manufacturer &&
          manufactuer.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
              onClick={() => handleMenuItemClick(item.label)} // handle menus item click
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: brand ? "#086070" : "#086070",
          pb: brand ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setBrand(!brand)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: brand ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: brand ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Brand"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: brand ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: brand ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {brand &&
          brands.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: supplier ? "#086070" : "#086070",
          pb: supplier ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setSupplier(!supplier)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: supplier ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: supplier ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Supplier"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: supplier ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: supplier ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {supplier &&
          suppliers.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
              onClick={() => handleMenuItemClick(item.label)} // handle menus item click
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: purchase ? "#086070" : "#086070",
          pb: purchase ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setPurchase(!purchase)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: purchase ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: purchase ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Purchase"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: purchase ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: purchase ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {purchase &&
          purchases.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: sale ? "#086070" : "#086070",
          pb: sale ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setSale(!sale)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: sale ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: sale ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Sale"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: sale ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: sale ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {sale &&
          sales.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: customer ? "#086070" : "#086070",
          pb: customer ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setCustomer(!customer)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: customer ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: customer ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Customer"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: customer ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: customer ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {customer &&
          customers.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: account ? "#086070" : "#086070",
          pb: account ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setAccount(!account)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: account ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: account ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Account"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: account ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: account ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {account &&
          accounts.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: bank ? "#086070" : "#086070",
          pb: bank ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setBank(!bank)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: bank ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: bank ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Bank"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: bank ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: bank ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {bank &&
          banks.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: report ? "#086070" : "#086070",
          pb: report ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setReport(!report)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: report ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: report ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Report"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: report ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: report ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {report &&
          reports.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: search ? "#086070" : "#086070",
          pb: search ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setSearch(!search)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: search ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: search ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Search"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: search ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: search ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {search &&
          searchs.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: setting ? "#086070" : "#086070",
          pb: setting ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setSetting(!setting)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: setting ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: setting ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Setting"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: setting ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: setting ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {setting &&
          settings.map((item) => (
            <Link to="/setupbusiness" style={{ textDecoration: "none" }}>
              <ListItemButton
                key={item.label}
                sx={{ pl: 6, minHeight: 32, color: "white" }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                    color: "white",
                    textDecoration: "none",
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
      </Box>

      <Box
        sx={{
          bgcolor: logout ? "#086070" : "#086070",
          pb: logout ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          // onClick={() => setLogout(!logout)}
          onClick={handleOpen}
          sx={{
            px: 3,
            pt: 2.5,
            pb: logout ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: logout ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: logout ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
        </ListItemButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure want to Logout
            </Typography>
            <Button onClick={handleLogout}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Menu;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import SetUpBusiness from "./pages/SetUpBusiness/SetUpBusiness";
import AdminRoute from "./component/routes/adminRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <>
    <ThemeProvider theme={theme} >
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="setupbusiness" element={<SetUpBusiness />} />

          </Route>
          {/* <Route path="/form/:formType" element={<DynamicMedicineForm />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  );
}

export default App;

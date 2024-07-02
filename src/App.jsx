import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Medicine from "./container/AddMedicine/Medicine/Medicine";
import Dashboard from "./pages/Dashboard";
import DynamicMedicineForm from "./common-components/Forms/medicineForms/DynamicMedicineForm";
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/medicine" element={<Medicine />} />
                    <Route path="/form/:formType" element={<DynamicMedicineForm />} />

                 
                </Routes>
            </Router>
        </>
    );
}
export default App;

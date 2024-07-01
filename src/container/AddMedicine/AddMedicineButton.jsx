import { Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddMedicineButton = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>AddMedicine</div>
            <Link
                component="button"
                variant="body2"
                onClick={() => {
                   navigate("/medicine");
                }}
            >
               Add Medicine
            </Link>
           
        </>
    );
};

export default AddMedicineButton;

import React, {useState, useEffect} from "react";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle, Box} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import AddCategoryModal from "./addMedicineModals/AddCategoryModal";
import AddMedicineModal from "./addMedicineModals/AddMedicineModal";
import AddUnitsModal from "./addMedicineModals/AddUnitsModal";
import AddMedicineTypeModal from "./addMedicineModals/AddMedicineTypeModal";

const AllMedicineModals = ({open, handleClose, formType, selectedData, style}) => {
    const [ success, setSuccess ] = useState(false);

    const resetForm = () => {
        setSuccess(false);
    };

    const handleDialogClose = () => {
        resetForm();
        handleClose();
    };

    const renderForm = () => {
        switch (formType) {
            case "add category":
            case "edit category":
                return <AddCategoryModal setSuccess={setSuccess} formType={formType} selectedData={selectedData} />;
            case "add medicine":
            case "edit medicine":
                return <AddMedicineModal setSuccess={setSuccess} formType={formType} selectedData={selectedData} />;
            case "add medicinetype":
            case "edit medicinetype":
                return <AddMedicineTypeModal setSuccess={setSuccess} formType={formType} selectedData={selectedData} />;
            case "add units":
            case "edit units":
                return <AddUnitsModal setSuccess={setSuccess} formType={formType} selectedData={selectedData} />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={handleDialogClose} PaperProps={{style}}>
            <CloseIcon sx={{position: "absolute", top: 10, right: 10, cursor: "pointer"}} onClick={handleDialogClose} />
            <DialogTitle sx={{color: "#086070", fontWeight: "600"}}>
                {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </DialogTitle>
            <DialogContent>
                {!success ? (
                    renderForm()
                ) : (
                    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", py: 2}}>
                        <CheckCircleOutlineIcon color="success" sx={{fontSize: 60}} />
                        <DialogContentText sx={{mt: 2}}>
                            {formType.charAt(0).toUpperCase() + formType.slice(1)} successfully!
                        </DialogContentText>
                        <Button onClick={handleDialogClose} variant="contained" color="primary">
                            Close
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AllMedicineModals;

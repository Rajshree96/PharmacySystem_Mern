import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddBrandModal from "./AddBrandModal";



const AllBrandModals = ({open, handleClose, formType, style}) => {
    const [ brandName, setBrandName ] = useState("");
    const [ success, setSuccess ] = useState(false);
    const handleAddBrand = () => {
        setTimeout(() => {
            setSuccess(true);
        }, 500);
    };

    const resetForm = () => {
        setBrandName("");
        setSuccess(false);
    };

    const handleDialogClose = () => {
        resetForm();
        handleClose();
    };

    const renderForm = () => {
        switch (formType) {
            case "add brand":
                // return <AddUnitsModal unitName={unitName} setUnitName={setUnitName} />;
                return <AddBrandModal/>;
            default:
                return null;
        }
    };

    const handleSubmit = () => {
        switch (formType) {
            case "add brand":
                handleAddBrand();
                break;
            default:
                break;
        }
    };

    return (
        <Dialog open={open} onClose={handleDialogClose} PaperProps={{style}}>
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
                            {formType.charAt(0).toUpperCase() + formType.slice(1)} added successfully!
                        </DialogContentText>
                    </Box>
                )}
            </DialogContent>
            {/* <DialogActions>
        {!success ? (
          <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
        ) : (
          <Button onClick={handleDialogClose} variant="contained" color="primary">Close</Button>
        )}
      </DialogActions> */}
        </Dialog>
    );
};

export default AllBrandModals;

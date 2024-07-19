import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle, Box} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import AddBrandModal from "./AddBrandModal";

const AllBrandModals = ({open, handleClose, formType, selectedData, style}) => {
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
            case "add brand":
            case "edit brand":
                return <AddBrandModal setSuccess={setSuccess} formType={formType} selectedData={selectedData} />;
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
                            {formType.charAt(0).toUpperCase() + formType.slice(1)}{" "}
                            {formType === "edit brand" ? "updated" : "added"} successfully!
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

export default AllBrandModals;

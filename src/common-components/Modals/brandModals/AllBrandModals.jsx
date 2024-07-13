import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle, Box} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddBrandModal from "./AddBrandModal";

const AllBrandModals = ({open, handleClose, formType, brandData, style}) => {
    const [ brandName, setBrandName ] = useState("");
    const [ selectedManufacturer, setSelectedManufacturer ] = useState("");
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        if (brandData && formType === "edit brand") {
            setBrandName(brandData.brand);
            setSelectedManufacturer(brandData.manufactureId);
        }
    }, [ brandData, formType ]);

    const handleAddBrand = () => {
        setTimeout(() => {
            setSuccess(true);
        }, 500);
    };

    const resetForm = () => {
        setBrandName("");
        setSelectedManufacturer("");
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
                return (
                    <AddBrandModal
                        brandName={brandName}
                        setBrandName={setBrandName}
                        selectedManufacturer={selectedManufacturer}
                        setSelectedManufacturer={setSelectedManufacturer}
                        setSuccess={setSuccess}
                        formType={formType}
                        brandData={brandData}
                    />
                );
            default:
                return null;
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

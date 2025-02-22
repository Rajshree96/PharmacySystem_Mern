import React, {useState} from "react";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle, Box} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import SalesEstimate from "../../../container/Sales/SalesEstimate/SalesEstimate";
import SalesInvoice from "../../../container/Sales/SalesInvoice/SalesInvoice";
import DeliveryChallan from "../../../container/Sales/DeliveryChallan/DeliveryChallan";


const AllSalesModal = ({open, handleClose, formType, selectedData, style}) => {
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
            case "add salesestimate":
            case "edit salesestimate":
                return (
                    <>
                      <SalesEstimate setSuccess={setSuccess} formType={formType} selectedData={selectedData} />
                    </>
                );
            case "add salesinvoice":
            case "edit salesinvoice":
                case "create salesinvoice":
                return (
                    <>
                      <SalesInvoice setSuccess={setSuccess} formType={formType} selectedData={selectedData} />
                    </>
                );
            case "add salesdeliverychalan":
            case "edit salesdeliverychalan":
                return (
                    <>
                      <DeliveryChallan setSuccess={setSuccess} formType={formType} selectedData={selectedData} />
                    </>
                );
            
            default:
                return null;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            // display popup width based on success state
            PaperProps={{
                style: {
                    width: success ? "40%" : "80%", // Change Modal width based on success state
                    maxWidth: success ? "600px" : "100vw", // Adjust max width if needed
                    transition: "width 0.3s ease", // Smooth transition for width change
                },
            }}
        >
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

export default AllSalesModal;

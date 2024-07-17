import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCategoryModal from "./addMedicineModals/AddCategoryModal";
import AddMedicineModal from "./addMedicineModals/AddMedicineModal";
import AddUnitsModal from "./addMedicineModals/AddUnitsModal";
import AddMedicineTypeModal from "./addMedicineModals/AddMedicineTypeModal";

const AllMedicineModals = ({ open, handleClose, formType, selectedData, style }) => {
    const [categoryName, setCategoryName] = useState("");
    const [medicineName, setMedicineName] = useState("");
    const [unitName, setUnitName] = useState("");
    const [medicineTypeName, setMedicineTypeName] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (selectedData) {
            switch (formType) {
                case "edit category":
                    setCategoryName(selectedData.name);
                    break;
                case "edit units":
                    setUnitName(selectedData.name);
                    break;
                case "edit medicinetype":
                    setMedicineTypeName(selectedData.name);
                    break;
                default:
                    break;
            }
        }
    }, [selectedData, formType]);

    const resetForm = () => {
        setCategoryName("");
        setMedicineName("");
        setUnitName("");
        setMedicineTypeName("");
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
                return (
                    <AddCategoryModal
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                        setSuccess={setSuccess}
                        formType={formType}
                        categoryData={selectedData}
                    />
                );
            case "add medicine":
                return (
                    <AddMedicineModal
                        medicineName={medicineName}
                        setMedicineName={setMedicineName}
                        setSuccess={setSuccess}
                    />
                );
            case "add medicinetype":
            case "edit medicinetype":
                return (
                    <AddMedicineTypeModal
                        medicineTypeName={medicineTypeName}
                        setMedicineTypeName={setMedicineTypeName}
                        setSuccess={setSuccess}
                        formType={formType}
                        medicineTypeData={selectedData}
                    />
                );
            case "add units":
            case "edit units":
                return (
                    <AddUnitsModal
                        unitName={unitName}
                        setUnitName={setUnitName}
                        setSuccess={setSuccess}
                        formType={formType}
                        unitData={selectedData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={handleDialogClose} PaperProps={{ style }}>
            <DialogTitle sx={{ color: "#086070", fontWeight: "600" }}>
                {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </DialogTitle>
            <DialogContent>
                {!success ? (
                    renderForm()
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", py: 2 }}>
                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
                        <DialogContentText sx={{ mt: 2 }}>
                            {formType.charAt(0).toUpperCase() + formType.slice(1)} successfully!
                        </DialogContentText>
                        <Button onClick={handleDialogClose} variant="contained" color="primary">Close</Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AllMedicineModals;

import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCategoryModal from "./addMedicineModals/AddCategoryModal";
import AddMedicineModal from "./addMedicineModals/AddMedicineModal";
import AddUnitsModal from "./addMedicineModals/AddUnitsModal";
import AddMedicineTypeModal from "./addMedicineModals/AddMedicineTypeModal";

const AllMedicineModals = ({ open, handleClose, formType, style }) => {
  const [categoryName, setCategoryName] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [medicineTypeName, setMedicineTypeName] = useState('');
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setCategoryName('');
    setMedicineName('');
    setUnitName('');
    setMedicineTypeName('');
    setSuccess(false);
  };

  const handleDialogClose = () => {
    resetForm();
    handleClose();
  };

  const renderForm = () => {
    switch (formType) {
      case 'add category':
        return <AddCategoryModal categoryName={categoryName} setCategoryName={setCategoryName}   setSuccess={setSuccess}/>;
      case 'add medicine':
        return <AddMedicineModal medicineName={medicineName} setMedicineName={setMedicineName}  setSuccess={setSuccess} />;
      case 'add medicinetype':
        return <AddMedicineTypeModal medicineTypeName={medicineTypeName} setMedicineTypeName={setMedicineTypeName} setSuccess={setSuccess} />;
      case 'add units':
        return <AddUnitsModal unitName={unitName} setUnitName={setUnitName} setSuccess={setSuccess} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} PaperProps={{ style }}>
      <DialogTitle sx={{ color: '#086070', fontWeight: '600' }}>{formType.charAt(0).toUpperCase() + formType.slice(1)}</DialogTitle>
      <DialogContent>
        {!success ? (
          renderForm()
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', py: 2 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
            <DialogContentText sx={{ mt: 2 }}>
              {formType.charAt(0).toUpperCase() + formType.slice(1)} added successfully!
            </DialogContentText>
            <Button onClick={handleDialogClose} variant="contained" color="primary">Close</Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AllMedicineModals;

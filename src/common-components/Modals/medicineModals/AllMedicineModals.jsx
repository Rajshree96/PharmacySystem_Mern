import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCategoryModal from "./addMedicineModals/AddCategoryModal";
import AddMedicineModal from "./addMedicineModals/AddMedicineModal";
import AddUnitsModal from "./addMedicineModals/AddUnitsModal";
import AddMedicineTypeModal from "./addMedicineModals/AddMedicineTypeModal";

const AllMedicineModals = ({ open, handleClose, formType , style}) => {
  const [categoryName, setCategoryName] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [medicineTypeName, setMedicineTypeName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddCategory = () => {
    setTimeout(() => {
      setSuccess(true);
    }, 500);
  };

  const handleAddMedicine = () => {
    setTimeout(() => {
      setSuccess(true);
    }, 500);
  };

  const handleAddUnit = () => {
    setTimeout(() => {
      setSuccess(true);
    }, 500);
  };

  const handleAddMedicineType = () => {
    setTimeout(() => {
      setSuccess(true);
    }, 500);
  };

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
        return <AddCategoryModal categoryName={categoryName} setCategoryName={setCategoryName} />;
      case 'add medicine':
        return <AddMedicineModal medicineName={medicineName} setMedicineName={setMedicineName} />;
      case 'add medicinetype':
        return <AddMedicineTypeModal medicineTypeName={medicineTypeName} setMedicineTypeName={setMedicineTypeName} />;
      case 'add units':
        return <AddUnitsModal unitName={unitName} setUnitName={setUnitName} />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    switch (formType) {
      case 'add category':
        handleAddCategory();
        break;
      case 'add medicine':
        handleAddMedicine();
        break;
      case 'add medicinetype':
        handleAddMedicineType();
        break;
      case 'add units':
        handleAddUnit();
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} PaperProps={{ style }}>
      <DialogTitle sx={{color:'#086070',fontWeight:'600'}}>{formType.charAt(0).toUpperCase() + formType.slice(1)}</DialogTitle>
      <DialogContent>
        {!success ? (
          renderForm()
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', py: 2 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
            <DialogContentText sx={{ mt: 2 }}>
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

export default AllMedicineModals;

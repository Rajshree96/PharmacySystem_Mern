import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const AddModal = ({ open, handleClose, formType }) => {
  const [categoryName, setCategoryName] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [unitName, setUnitName] = useState('');
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

  const resetForm = () => {
    setCategoryName('');
    setMedicineName('');
    setUnitName('');
    setSuccess(false);
  };

  const handleDialogClose = () => {
    resetForm();
    handleClose();
  };

  const renderForm = () => {
    switch (formType) {
      case 'category':
        return (
          <>
            <DialogContentText>
              Enter the name of the category you want to add.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </>
        );
      case 'medicine':
        return (
          <>
            <DialogContentText>
              Enter the details of the medicine you want to add.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Medicine Name"
              type="text"
              fullWidth
              variant="standard"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
            {/* Add other medicine fields here */}
          </>
        );
      case 'unit':
        return (
          <>
            <DialogContentText>
              Enter the details of the unit you want to add.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Unit Name"
              type="text"
              fullWidth
              variant="standard"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
            {/* Add other unit fields here */}
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    switch (formType) {
      case 'category':
        handleAddCategory();
        break;
      case 'medicine':
        handleAddMedicine();
        break;
      case 'unit':
        handleAddUnit();
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>Add {formType.charAt(0).toUpperCase() + formType.slice(1)}</DialogTitle>
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
      <DialogActions>
        {!success ? (
          <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
        ) : (
          <Button onClick={handleDialogClose} variant="contained" color="primary">Close</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;

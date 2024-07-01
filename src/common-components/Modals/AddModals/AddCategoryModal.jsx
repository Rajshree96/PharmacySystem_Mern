import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const AddCategoryModal = ({ open, onClose }) => {
  const [success, setSuccess] = useState(false);

  const AddCategoryModal = () => {
    // Simulate API call to manage category
    setTimeout(() => {
      setSuccess(true);
    }, 500);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        {!success ? (
          <>
            <DialogContentText>
              Add your categories here.
            </DialogContentText>
            {/* Add your form fields or content for managing categories here */}
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', py: 2 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
            <DialogContentText sx={{ mt: 2 }}>
              Category managed successfully!
            </DialogContentText>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {!success ? (
          <Button onClick={handleManageCategory} variant="contained" color="primary">Manage</Button>
        ) : (
          <Button onClick={onClose} variant="contained" color="primary">Close</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;

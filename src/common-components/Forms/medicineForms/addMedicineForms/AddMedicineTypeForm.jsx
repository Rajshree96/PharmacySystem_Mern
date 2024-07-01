import React, { useState } from "react";
import { DialogContentText, TextField, Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";

const AddMedicineTypeForm = () => {
  const [medicineTypeName, setMedicineTypeName] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Add Medicine Type</Typography>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DialogContentText>Enter the name of the medicine type you want to add.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Medicine Type Name"
          type="text"
          fullWidth
          variant="outlined"
          value={medicineTypeName}
          onChange={(e) => setMedicineTypeName(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Medicine Type
        </Button>
      </motion.div>
    </Box>
  );
};

export default AddMedicineTypeForm;

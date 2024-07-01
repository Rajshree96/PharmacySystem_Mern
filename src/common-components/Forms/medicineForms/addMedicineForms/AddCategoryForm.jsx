import React, { useState } from "react";
import { DialogContentText, TextField, Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Add Category</Typography>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DialogContentText>Enter the name of the category you want to add.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          type="text"
          fullWidth
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Category
        </Button>
      </motion.div>
    </Box>
  );
};

export default AddCategoryForm;

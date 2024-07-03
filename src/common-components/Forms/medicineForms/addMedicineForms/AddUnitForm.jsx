import React, { useState } from "react";
import { DialogContentText, TextField, Grid, MenuItem, Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";
import { addUnit } from "../../../../unitapi";

const AddUnitForm = () => {
  const [type, setType] = useState('Single');
  const [symbol, setSymbol] = useState('');
  const [formalName, setFormalName] = useState('');
  const [primaryUnit, setPrimaryUnit] = useState('');
  const [conversion, setConversion] = useState('');
  const [secondaryUnit, setSecondaryUnit] = useState('');

  const handleAddUnit = async () => {
    const unitData = {
      name: formalName,
      // Add other fields if necessary
    };

    try {
      const response = await addUnit(unitData);
      console.log('Unit added successfully:', response);
      // onUnitAdded(response.data); // Notify parent component with the newly added unit data
      // Handle success (e.g., clear form, show success message, etc.)
    } catch (error) {
      console.error("Error adding unit:", error.response?.data || error.message);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Add Unit</Typography>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <DialogContentText>Enter the details of the unit you want to add.</DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              margin="dense"
              label="Type"
              fullWidth
              variant="outlined"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ mb: 3 }}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Compounded">Compounded</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Symbol"
              type="text"
              fullWidth
              variant="outlined"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{ mb: 3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Formal Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formalName}
              onChange={(e) => setFormalName(e.target.value)}
              sx={{ mb: 3 }}
            />
          </Grid>

          {type === 'Compounded' && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Primary Unit"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={primaryUnit}
                  onChange={(e) => setPrimaryUnit(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Conversion"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={conversion}
                  onChange={(e) => setConversion(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Secondary Unit"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={secondaryUnit}
                  onChange={(e) => setSecondaryUnit(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleAddUnit}
        >
          Add Unit
        </Button>
      </motion.div>
    </Box>
  );
};

export default AddUnitForm;

import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Grid, Paper, IconButton, Modal
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const TaxRate = () => {
  const [taxName, setTaxName] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [savedTaxRates, setSavedTaxRates] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTaxName, setEditedTaxName] = useState('');
  const [editedTaxRate, setEditedTaxRate] = useState('');

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedTaxRates = [...savedTaxRates];
      updatedTaxRates[editIndex] = { name: editedTaxName, rate: editedTaxRate };
      setSavedTaxRates(updatedTaxRates);
      setEditIndex(null);
      setIsModalOpen(false);
    } else {
      setSavedTaxRates([...savedTaxRates, { name: taxName, rate: taxRate }]);
    }
    setTaxName('');
    setTaxRate('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTaxName(savedTaxRates[index].name);
    setEditedTaxRate(savedTaxRates[index].rate);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    setSavedTaxRates(savedTaxRates.filter((_, i) => i !== index));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  return (
    <> 

      <Grid container spacing={4} mt={5}>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Create Tax Rate
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
               
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Tax Rate (%)"
                    variant="outlined"
                    margin="normal"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                  />
               
                  <Box display="flex" justifyContent="start" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      {editIndex !== null ? 'Update' : 'Save'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>      

        <Grid item xs={12}>
            <Grid container alignItems="center" style={{ padding: 5, marginTop: 16 }}>              
              <Grid item xs={4}>
                <Typography variant="h6">Tax Rate (%)</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Typography variant="h6">Actions</Typography>
              </Grid>
            </Grid>

          {savedTaxRates.map((tax, index) => (
              <Grid container alignItems="center" style={{ padding: 5 }}>               
                <Grid item xs={4}>
                  <Typography variant="h6">{tax.rate}</Typography>
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
          ))}
        </Grid>
        </Paper>
        </Grid>
      </Grid>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Paper style={{ width: 400, padding: 16, margin: '100px auto' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Edit Tax Rate
          </Typography>
          <Grid container spacing={2}>           
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Tax Rate (%)"
                variant="outlined"
                margin="normal"
                value={editedTaxRate}
                onChange={(e) => setEditedTaxRate(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Update
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default TaxRate;

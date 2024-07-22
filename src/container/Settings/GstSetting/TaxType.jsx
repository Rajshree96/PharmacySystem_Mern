import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Grid, Paper, IconButton, Modal
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const TaxType = () => {
    const [taxType, setTaxType] = useState('');
  const [savedTaxTypes, setSavedTaxTypes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTaxType, setEditedTaxType] = useState('');

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedTaxTypes = [...savedTaxTypes];
      updatedTaxTypes[editIndex] = editedTaxType;
      setSavedTaxTypes(updatedTaxTypes);
      setEditIndex(null);
      setIsModalOpen(false);
    } else {
      setSavedTaxTypes([...savedTaxTypes, taxType]);
    }
    setTaxType('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTaxType(savedTaxTypes[index]);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    setSavedTaxTypes(savedTaxTypes.filter((_, i) => i !== index));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Create Tax Type
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <Grid item md={4}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={taxType}
                onChange={(e) => setTaxType(e.target.value)}
              />
              <Box display="flex" justifyContent="start" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  {editIndex !== null ? 'Update' : 'Save'}
                </Button>
              </Box>
              </Grid>
            </Box>
            <Grid item xs={12}>
            <Grid container alignItems="center" style={{ padding: 5, marginTop: 16 }}>
              <Grid item xs={4}>
                <Typography variant="h6">Tax Type</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Typography variant="h6">Actions</Typography>
              </Grid>
            </Grid>
          {savedTaxTypes.map((tax, index) => (
            <Box key={index} elevation={3} style={{ padding: 5 }}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Typography variant="h6">{tax}</Typography>
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
            </Box>
          ))}
        </Grid>

          </Paper>
        </Grid>
       
      </Grid>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Paper style={{ width: 400, padding: 16, margin: '100px auto' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Edit Tax Type
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={editedTaxType}
            onChange={(e) => setEditedTaxType(e.target.value)}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Update
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  )
}

export default TaxType
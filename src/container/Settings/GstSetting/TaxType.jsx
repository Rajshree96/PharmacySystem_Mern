import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Grid, Paper, IconButton, Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  styled,
  TableBody,
  tableCellClasses 
} from '@mui/material';
import { Edit, Delete } from "@mui/icons-material";
import EditButton from '../../../common-components/ButtonContainer/EditButton';
import DeleteButton from '../../../common-components/ButtonContainer/DeleteButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#086070",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
            <Typography variant="h6" align="start" gutterBottom>
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
                  <Button variant="contained" className='btn-design' onClick={handleSave}>
                    {editIndex !== null ? 'Update' : 'Save'}
                  </Button>
                </Box>
              </Grid>
            </Box>
            <Grid item xs={12}>
              <Grid container alignItems="center" style={{ padding: 5, marginTop: 16 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Tax Type</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: 'center' }}>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {savedTaxTypes.map((tax, index) => (
                      <StyledTableRow>
                        <StyledTableCell>{tax}</StyledTableCell>

                        <StyledTableCell>
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >                        
                        <EditButton
                          sx={{ mr: 1, color: "#1976d2" }}
                          label="edit"
                          icon={Edit}
                          onClick={() => handleEdit(index)}
                        />
                        <DeleteButton
                          sx={{ mr: 1, color: "red" }}
                          label="delete"
                          icon={Delete}
                          onClick={() => handleDelete(index)}
                        />
                      </Box>
                    </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
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
            <Button variant="contained" className='btn-design' onClick={handleSave}>
              Update
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  )
}

export default TaxType
import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

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
  
  useEffect(() => {
    fetchTaxTypes();
  }, []);


  const fetchTaxTypes = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const response = await axios.get('http://localhost:4000/api/v1/gstSettings/getAllgst', {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });
      setSavedTaxTypes(response.data);
    } catch (error) {
      console.error("Error fetching tax types:", error);
    }
  };

  const handleSave = async ({gstName}) => {
    try {
      if (editIndex !== null) {
        // const updatedTaxTypes = [...savedTaxTypes];
        // updatedTaxTypes[editIndex] = editedTaxType;
        // setSavedTaxTypes(updatedTaxTypes);
        // setEditIndex(null);
        // setIsModalOpen(false);
        // await updateTaxRate(savedTaxTypes[editIndex], editedTaxType);
        const taxTypeToUpdate = savedTaxTypes[editIndex];
      await updateTaxType(taxTypeToUpdate._id, editedTaxType);
      } else {
        // setSavedTaxTypes([...savedTaxTypes, taxType]);
        await addTaxType({gstName: taxType});
  
      }
      setTaxType('');
      setIsModalOpen(false);
      fetchTaxTypes();
    
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
    
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTaxType(savedTaxTypes[index].gstName);
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      const taxTypeToDelete = savedTaxTypes[index];
      await deleteTaxType(taxTypeToDelete._id);
      fetchTaxTypes();
    } catch (error) {
      console.error("Error in handleDelete:", error);

    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  const addTaxType = async({gstName})=>{
    console.log(gstName);
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
       const  response = await axios.post('http://localhost:4000/api/v1/gstSettings/addgstType',
       { gstName},
        {
          headers:{
            "content-type": "application/json",
             "Authorization": `Bearer ${auth.token}`
          }
        }
       );
       console.log("gstSettings response", response);
       if (response.data.status === 201) {
        console.log("Gst Settings  created successfully ");
        } 
        else {
          console.log("Unexpected response status:", response.data.status);

        }
        return response.data;
      

    } catch (error) {
      console.log("Somthing went wrong");
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      throw error; // Re-throw the error so it can be handled by the caller
    

    }
  }

  const updateTaxType = async (id, newName) => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
     const response =  await axios.put(`http://localhost:4000/api/v1/gstSettings/editgst/${id}`,
        { gstName: newName },
        {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${auth.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating tax type:", error);
      throw error;
    }
  };

  const deleteTaxType = async (id) => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const response = await axios.delete(`http://localhost:4000/api/v1/gstSettings/deletegst/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${auth.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting tax type:", error);
      throw error;
    }
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
                      <StyledTableRow key={tax._id}>
                        <StyledTableCell>{tax.gstName}</StyledTableCell>

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
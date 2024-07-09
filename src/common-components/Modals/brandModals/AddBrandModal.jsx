
import React from 'react';
import { Button, TextField } from '@mui/material';

const AddBrandModal = ({ brandName, setBrandName }) => {
  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        label="Brand Name"
        type="text"
        fullWidth
        variant="standard"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <Button
        variant="contained" 
        className='btn-design'
        sx={{ mt: 2 }}
        onClick={() => setBrandName("")}
      >
        Cancel  
      </Button>
    </>
  );
};

export default AddBrandModal;

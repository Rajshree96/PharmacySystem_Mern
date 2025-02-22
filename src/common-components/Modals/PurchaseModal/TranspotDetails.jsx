import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const TransportDetails = ({ transPortDetails, setTransPortDetails }) => {
  const [open, setOpen] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [dispatchedThrough, setDispatchedThrough] = useState("");
  const [destination, setDestination] = useState("");
  const [carrierName, setCarrierName] = useState("");
  const [billOfLading, setBillOfLading] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (field) => (e) => {
    setTransPortDetails({
      ...transPortDetails,
      [field]: e.target.value
    });
  };

  const handleSave = () => {
    console.log('Transport Details:', transPortDetails);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" className="btn-design" onClick={handleOpen}>
        Transport Details
      </Button>
      <Modal open={open} onClose={handleClose} sx={{maxWidth:"xl"}}>
        <Grid container spacing={1} sx={style}>
          <Typography variant="h6" component="h2">
            Add Transport Details
          </Typography>
          <Grid item md={6} xs={12}>
            <TextField
              label="Receipt Doc No."
              variant="outlined"
              fullWidth
              value={transPortDetails.receiptNumber}
              onChange={handleChange('receiptNumber')}
              margin="normal"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Dispatched through"
              variant="outlined"
              fullWidth
              value={transPortDetails.dispatchedThrough}
              onChange={handleChange('dispatchedThrough')}
              margin="normal"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Destination"
              variant="outlined"
              fullWidth
              value={transPortDetails.destination}
              onChange={handleChange('destination')}
              margin="normal"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Carrier Name/Agent"
              variant="outlined"
              fullWidth
              value={transPortDetails.carrierName}
              onChange={handleChange('carrierName')}
              margin="normal"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Bill of Lading/LR-RR No."
              variant="outlined"
              fullWidth
              value={transPortDetails.billOfLading}
              onChange={handleChange('billOfLading')}
              margin="normal"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Motor Vehicle No."
              variant="outlined"
              fullWidth
              value={transPortDetails.vehicleNumber}
              onChange={handleChange('vehicleNumber')}
              margin="normal"
            />
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              variant="contained"
              className="btn-design"
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Modal>
    </div>
  );
};

export default TransportDetails;
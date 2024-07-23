import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';

const UserSetting = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = () => {
    // Handle the password update logic here
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <Grid container spacing={4} mt={2} mb={7}>
      <Grid item xs={12} md={12} style={{ display: 'grid', justifyContent: 'center' }}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5" sx={{ color: 'black', marginBottom: 3 }}>
            User Settings
          </Typography>
          <Typography variant="h6" sx={{ color: 'black', marginBottom: 1 }}>
            Change Password
          </Typography>
          <Box style={{ display: 'grid', justifyContent: 'center' }}>
          <TextField
            label="Old Password"
            type="password"
            margin="normal"
            variant="outlined"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ width: '300px' }} // Add width here
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ width: '300px' }} // Add width here
          />
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ width: '300px' }} // Add width here
          />
          <Button
            variant="contained"
            sx={{ marginTop: 3 }}
            className='btn-design'
            onClick={handleUpdate}
          >
            Update
          </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserSetting;

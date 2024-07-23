import React, { useState } from 'react';
import {
    Container, Typography, TextField, Button, Box, Grid, Paper, IconButton, Modal
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import TaxType from "./TaxType"
import TaxRate from "./TaxRate"

const GstSetting = () => {


    return (
        <Container>
            <Typography variant="h5" align="center" gutterBottom mt={4} mb={3}>
                GST Settings
            </Typography>
            <TaxType />
            <TaxRate/>
        </Container>
    );
};

export default GstSetting;

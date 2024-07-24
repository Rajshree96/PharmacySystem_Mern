import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import ViewManufacturer from '../../container/Manufacturer/AddManufacturer/ViewManufacturer';


const ViewModal = ({ open, handleClose, formType, formData }) => {
    // Function to render the form based on formType
    const renderFormContent = () => {
        switch (formType) {
            case 'view manufacturer':
                return <ViewManufacturer />;
          
            default:
                return <Typography>No form available</Typography>;
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: '80%', margin: 'auto', padding: '20px', backgroundColor: 'white' }}>
                {renderFormContent()}
            </Box>
        </Modal>
    );
};

export default ViewModal;

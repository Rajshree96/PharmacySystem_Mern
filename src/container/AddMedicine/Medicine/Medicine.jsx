import React, { useState } from "react";
import { Box, Container, Typography, Grid, Card, Breadcrumbs, Link } from "@mui/material";
import Categories from "./Categories/Categories";
import MedicineType from "./MedicineType/MedicineType";
import Units from "./Units/Units";
import AddMedicine from "./AddMedicine/AddMedicine";

const Medicine = () => {
  const [activeComponent, setActiveComponent] = useState('Categories');

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Categories':
        return <Categories />;
      case 'Medicine Type':
        return <MedicineType />;
      case 'Units':
        return <Units />;
      case 'Add Medicine':
        return <AddMedicine />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: "#e0f7fa", py: 5 }}>
      <Container>
        <Typography variant="h3" gutterBottom sx={{ color: "#00695c", fontWeight: "bold", textAlign: "center" }}>
          {activeComponent}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }} onClick={() => handleComponentChange('Categories')}>
              <Typography variant="h6" gutterBottom sx={{ color: "black", fontWeight: "bold" }}>Categories</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }} onClick={() => handleComponentChange('Medicine Type')}>
              <Typography variant="h6" gutterBottom sx={{ color: "black", fontWeight: "bold" }}>Medicine Type</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }} onClick={() => handleComponentChange('Units')}>
              <Typography variant="h6" gutterBottom sx={{ color: "black", fontWeight: "bold" }}>Units</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }} onClick={() => handleComponentChange('Add Medicine')}>
              <Typography variant="h6" gutterBottom sx={{ color: "black", fontWeight: "bold" }}>Add Medicine</Typography>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          {renderActiveComponent()}
        </Box>
      </Container>
    </Box>
  );
};

export default Medicine;

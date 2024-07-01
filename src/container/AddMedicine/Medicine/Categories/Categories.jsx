import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import BreadcrumbContainer from "../../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import MedicineTable from "../../../../common-components/TableContainer/MedicineTable";
import DynamicButton from "../../../../common-components/ButtonContainer/DynamicButton";
import AddModal from "../../../../common-components/Modals/AddModals/AddModal";
import { Add, Edit } from "@mui/icons-material";

const Categories = () => {
  const [modalType, setModalType] = useState("");

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType("");
  };

  return (
    <>
      <Box sx={{ bgcolor: "#e0f7fa", py: 5 }}>
        <Container>
          <Paper elevation={6} sx={{ p: 4 }}>
            {/* Breadcrumb */}
            <BreadcrumbContainer />

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
                  Categories
                </Typography>
              </Grid>
            </Grid>
            {/* Add and Manage Buttons */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <DynamicButton
                  icon={Add}
                  label={"Add Category"}
                  onClick={() => handleOpenModal("category")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DynamicButton
                  icon={Edit}
                  label={"Manage Category"}
                  onClick={() => handleOpenModal("medicine")} // Example for other form types
                />
              </Grid>
            </Grid>

            {/* Medicine Table */}
            <MedicineTable />
          </Paper>
        </Container>
      </Box>

      {/* Modals */}
      <AddModal open={!!modalType} handleClose={handleCloseModal} formType={modalType} />
    </>
  );
};

export default Categories;

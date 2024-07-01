import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import BreadcrumbContainer from "../../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import MedicineTable from "../../../../common-components/TableContainer/MedicineTable";
import DynamicButton from "../../../../common-components/ButtonContainer/DynamicButton";
import { Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const breadcrumbs = ["Medicine", "Categories"];

  return (
    <Box sx={{ bgcolor: "#e0f7fa", py: 5 }}>
      <Container>
        <Paper elevation={6} sx={{ p: 4 }}>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
                Categories
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <DynamicButton
                icon={Add}
                label={"Add Category"}
                onClick={() => navigate("/form/addcategory")}
                sx={{
                  bgcolor: "#00816b",
                  "&:hover": { bgcolor: "#004d40" },
                  transition: "all 0.3s",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DynamicButton
                icon={Edit}
                label={"Manage Category"}
                onClick={() => navigate("/form/managecategory")}
                sx={{
                  bgcolor: "#00796b",
                  "&:hover": { bgcolor: "#004d40" },
                  transition: "all 0.3s",
                }}
              />
            </Grid>
          </Grid>
          <MedicineTable />
        </Paper>
      </Container>
    </Box>
  );
};

export default Categories;

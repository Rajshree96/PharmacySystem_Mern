import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import MedicineCategoryTable from "../../../common-components/TableContainer/MedicineCategoryTable";
import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
import { Add } from "@mui/icons-material";
import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";

const Categories = () => {
    const breadcrumbs = ["Medicine", "Categories"];
    const [modalType, setModalType] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleOpenModal = (type, category = null) => {
        setModalType(type);
        setSelectedCategory(category);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedCategory(null);
    };

    return (
        <>
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
                                    onClick={() => handleOpenModal("add category")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": { bgcolor: "#004d40" },
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <MedicineCategoryTable onEditCategory={(category) => handleOpenModal("edit category", category)} />
                    </Paper>
                </Container>
            </Box>

            {/* Modals */}
            <AllMedicineModals
                open={!!modalType}
                handleClose={handleCloseModal}
                formType={modalType}
                selectedData={selectedCategory}
                style={{ width: '100%' }}
            />
        </>
    );
};

export default Categories;



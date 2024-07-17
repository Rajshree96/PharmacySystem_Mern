import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
import { Add } from "@mui/icons-material";
import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";
import MedicineTypeTable from "../../../common-components/TableContainer/MedicineTypeTable";

const MedicineTypes = () => {
    const breadcrumbs = ["Medicine", "Medicine Types"];
    const [modalType, setModalType] = useState("");
    const [selectedMedicineType, setSelectedMedicineType] = useState(null);

    const handleOpenModal = (type, medicineType = null) => {
        setModalType(type);
        setSelectedMedicineType(medicineType);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedMedicineType(null);
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
                                    Medicine Types
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <DynamicButton
                                    icon={Add}
                                    label={"Add Medicine Type"}
                                    onClick={() => handleOpenModal("add medicinetype")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": { bgcolor: "#004d40" },
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <MedicineTypeTable onEditMedicineType={(medicineType) => handleOpenModal("edit medicinetype", medicineType)} />
                    </Paper>
                </Container>
            </Box>
            <AllMedicineModals
                open={!!modalType}
                handleClose={handleCloseModal}
                formType={modalType}
                selectedData={selectedMedicineType}
                style={{ width: '100%' }}
            />
        </>
    );
};

export default MedicineTypes;

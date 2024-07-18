import React, {useState} from "react";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
import {Add} from "@mui/icons-material";
import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";
import AddMedicineTable from "../../../common-components/TableContainer/AddMedicineTable";

const AddMedicine = () => {
    const breadcrumbs = [ "Medicine", "Add Medicine" ];
    const [ modalType, setModalType ] = useState("");
    const [ selectedAddMedicine, setSelectedAddMedicine ] = useState(null);

    const handleOpenModal = (type, medicine = null) => {
        setModalType(type);
        setSelectedAddMedicine(medicine);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedAddMedicine(null);
    };

    return (
        <>
            <Box sx={{bgcolor: "#e0f7fa", py: 5}}>
                <Container>
                    <Paper elevation={6} sx={{p: 4}}>
                        <BreadcrumbContainer breadcrumbs={breadcrumbs} />
                        <Grid container spacing={3} sx={{mb: 3}}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="h6" sx={{color: "black", fontWeight: "bold"}}>
                                    Add Medicine
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{mb: 3}}>
                            <Grid item xs={12} sm={6} md={3}>
                                <DynamicButton
                                    icon={Add}
                                    label={"Add Medicine"}
                                    onClick={() => handleOpenModal("add medicine")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": {bgcolor: "#004d40"},
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <AddMedicineTable
                            onEditAddMedicine={(medicine) => handleOpenModal("edit medicine", medicine)}
                        />
                    </Paper>
                </Container>
            </Box>

            {/* Modals */}
            <AllMedicineModals
                open={!!modalType}
                handleClose={handleCloseModal}
                formType={modalType}
                selectedData={selectedAddMedicine}
                style={{width: "100%"}}
            />
        </>
    );
};

export default AddMedicine;

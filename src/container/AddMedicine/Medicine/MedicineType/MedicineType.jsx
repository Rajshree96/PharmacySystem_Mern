import React, {useState} from "react";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import BreadcrumbContainer from "../../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import MedicineTable from "../../../../common-components/TableContainer/MedicineTable";
import DynamicButton from "../../../../common-components/ButtonContainer/DynamicButton";
import {Add, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import AllMedicineModals from "../../../../common-components/Modals/AllMedicineModals";

const MedicineType = () => {
    // const navigate = useNavigate();
    const breadcrumbs = [ "Medicine", "Medicine Type" ];
    const [ modalType, setModalType ] = useState("");

    const handleOpenModal = (type) => {
        setModalType(type);
    };

    const handleCloseModal = () => {
        setModalType("");
    };

    return (
        <>
            <Box sx={{bgcolor: "#e0f7fa", py: 5}}>
                <Container>
                    <Paper elevation={6} sx={{p: 4}}>
                        <BreadcrumbContainer breadcrumbs={breadcrumbs} />
                        <Grid container spacing={3} sx={{mb: 3}}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="h6"  sx={{color: "black", fontWeight: "bold"}}>
                                    Medicine Type
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{mb: 3}}>
                            <Grid item xs={12} sm={6} md={3}>
                                <DynamicButton
                                    icon={Add}
                                    label={"Add Medicine Type"}
                                    onClick={() => handleOpenModal("add medicinetype")}
                                    // onClick={() => navigate("/form/addmedicinetype")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": {bgcolor: "#004d40"},
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <MedicineTable />
                    </Paper>
                </Container>
            </Box>

            {/* Modals */}
            <AllMedicineModals open={!!modalType} handleClose={handleCloseModal} formType={modalType} style={{ width: '100%' }} />
        </>
    );
};

export default MedicineType;

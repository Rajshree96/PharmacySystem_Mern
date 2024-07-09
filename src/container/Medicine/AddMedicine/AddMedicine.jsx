import React, {useState} from "react";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import AddMedicineTable from "../../../common-components/TableContainer/AddMedicineTable";

import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
import {Add, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";
const AddMedicine = () => {
    // const navigate = useNavigate();
    const breadcrumbs = [ "Medicine", "AddMedicine" ];

    const [ modalType, setModalType ] = useState("");

    const handleOpenModal = (type) => {
        console.log('add medicine modal open successfully')
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
                                <Typography variant="h6" sx={{color: "black", fontWeight: "bold"}}>
                                AddMedicine
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{mb: 3}}>
                            <Grid item xs={12} sm={6} md={3}>
                                <DynamicButton
                                    icon={Add}
                                    label={"Add Medicine"}
                                    onClick={() => handleOpenModal("add medicine")}
                                    // onClick={() => navigate("/form/addmedicine")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": {bgcolor: "#004d40"},
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <AddMedicineTable />
                    </Paper>
                </Container>
            </Box>

            {/* Modals */}
            <AllMedicineModals open={!!modalType} handleClose={handleCloseModal} formType={modalType} maxWidth="xl"
        fullWidth={true}
        style={{ width: '100%' }}/>
            
            
        </>
    );
};

export default AddMedicine;

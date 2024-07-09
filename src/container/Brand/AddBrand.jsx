import React, {useState} from "react";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import BreadcrumbContainer from "../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import DynamicButton from "../../common-components/ButtonContainer/DynamicButton";
import {Add, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import AllBrandModals from "../../common-components/Modals/brandModals/AllBrandModals";
import AddBrandTable from "../../common-components/TableContainer/brandTable/AddBrandTable";

const AddBrand = () => {
    //const navigate = useNavigate();
    const breadcrumbs = [ "Add Brand", "Add Brand" ];
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
                                <Typography variant="h6" sx={{color: "black", fontWeight: "bold"}}>
                                    Add Brand
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{mb: 3}}>
                            <Grid item xs={12} sm={6} md={3}>
                                <DynamicButton
                                    icon={Add}
                                    label={"Add Brand"}
                                    onClick={() => handleOpenModal("add brand")}
                                    // onClick={() => navigate("/form/addunit")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": {bgcolor: "#004d40"},
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <AddBrandTable/>
                    </Paper>
                </Container>
            </Box>
            {/* Modals */}
            <AllBrandModals open={!!modalType} handleClose={handleCloseModal} formType={modalType} style={{ width: '100%' }}/>
        </>
    );
};

export default AddBrand;

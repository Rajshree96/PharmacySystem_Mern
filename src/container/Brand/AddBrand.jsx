import React, {useState} from "react";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import BreadcrumbContainer from "../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import DynamicButton from "../../common-components/ButtonContainer/DynamicButton";
import {Add} from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import AllBrandModals from "../../common-components/Modals/brandModals/AllBrandModals";
import AddBrandTable from "../../common-components/TableContainer/brandTable/AddBrandTable";

const AddBrand = () => {
    // const navigate = useNavigate();
    const breadcrumbs = [ "Add Brand", "Add Brand" ];
    const [ modalType, setModalType ] = useState("");
    const [ selectedBrand, setSelectedBrand ] = useState(null); // State to store selected brand for editing

    const handleOpenModal = (type, brand = null) => {
        setModalType(type);
        setSelectedBrand(brand);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedBrand(null);
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
                                        bgcolor: "#086070",
                                        "&:hover": {bgcolor: "#095561"},
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <AddBrandTable onEditBrand={(brand) => handleOpenModal("edit brand", brand)} />
                    </Paper>
                </Container>
            </Box>
            {/* Modals */}
            <AllBrandModals
                open={!!modalType}
                handleClose={handleCloseModal}
                formType={modalType}
                selectedData={selectedBrand}
                style={{width: "100%"}}
            />
        </>
    );
};

export default AddBrand;

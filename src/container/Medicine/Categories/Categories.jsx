import React, {useState} from "react";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import MedicineCategoryTable from "../../../common-components/TableContainer/MedicineCategory";
import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
import {Add, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";


const Categories = () => {
    const breadcrumbs = [ "Medicine", "Categories" ];

    // const [ modalType, setModalType ] = useState("");
    const [ modalType, setModalType ] = useState("");
    const [currentCategory, setCurrentCategory] = useState({ name: '' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    const handleOpenModal = (category = null) => {
        if (category) {
          setCurrentCategory(category);
          setIsEditMode(true);
        } else {
          setCurrentCategory({ name: '' });
          setIsEditMode(false);
        }
        setModalOpen(true);
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
                                    Categories
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{mb: 3}}>
                            <Grid item xs={12} sm={6} md={3}>
                                {/* <DynamicButton
                                    icon={Add}
                                    label={"Add Category"}
                                    onClick={() => handleOpenModal("add category")}
                                    // onClick={() => navigate("/form/addcategory")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": {bgcolor: "#004d40"},
                                        transition: "all 0.3s",
                                    }}
                                /> */}
                            </Grid>
                        </Grid>
                        <MedicineCategoryTable
                        />
                    </Paper>
                </Container>
            </Box>

            {/* Modals */}
            <AllMedicineModals open={!!modalType} handleClose={handleCloseModal} formType={modalType}  style={{ width: '100%' }}/>
            
            
        </>
    );
};

export default Categories;

// import React, {useState} from "react";
// import {Box, Container, Grid, Paper, Typography} from "@mui/material";
// import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
// import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
// import {Add, Edit} from "@mui/icons-material";
// import {useNavigate} from "react-router-dom";
// import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";
// import MedicineTable from "../../../common-components/TableContainer/MedicineUnit";

// const Units = () => {
//     //const navigate = useNavigate();
//     const breadcrumbs = [ "Medicine", "Units" ];
//     const [ modalType, setModalType ] = useState("");

//     const handleOpenModal = (type) => {
//         setModalType(type);
//     };

//     const handleCloseModal = () => {
//         setModalType("");
//     };

//     return (
//         <>
//             <Box sx={{bgcolor: "#e0f7fa", py: 5}}>
//                 <Container>
//                     <Paper elevation={6} sx={{p: 4}}>
//                         <BreadcrumbContainer breadcrumbs={breadcrumbs} />
//                         <Grid container spacing={3} sx={{mb: 3}}>
//                             <Grid item xs={12} sm={6} md={4}>
//                                 <Typography variant="h6" sx={{color: "black", fontWeight: "bold"}}>
//                                     Units
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                         <Grid container spacing={3} sx={{mb: 3}}>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <DynamicButton
//                                     icon={Add}
//                                     label={"Add Units"}
//                                     onClick={() => handleOpenModal("add units")}
//                                     // onClick={() => navigate("/form/addunit")}
//                                     sx={{
//                                         bgcolor: "#00816b",
//                                         "&:hover": {bgcolor: "#004d40"},
//                                         transition: "all 0.3s",
//                                     }}
//                                 />
//                             </Grid>
//                         </Grid>
//                         <MedicineTable />
//                     </Paper>
//                 </Container>
//             </Box>
//             {/* Modals */}
//             <AllMedicineModals open={!!modalType} handleClose={handleCloseModal} formType={modalType} style={{ width: '100%' }}/>
//         </>
//     );
// };

// export default Units;


// import React, { useState } from "react";
// import { Box, Container, Grid, Paper, Typography } from "@mui/material";
// import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
// import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
// import { Add } from "@mui/icons-material";
// import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";
// import MedicineUnitTable from "../../../common-components/TableContainer/MedicineUnitTable";

// const Units = () => {
//     const breadcrumbs = ["Medicine", "Units"];
//     const [modalType, setModalType] = useState("");
//     const [selectedUnit, setSelectedUnit] = useState(null);

//     const handleOpenModal = (type, unit = null) => {
//         setModalType(type);
//         setSelectedUnit(unit);
//     };

//     const handleCloseModal = () => {
//         setModalType("");
//         setSelectedUnit(null);
//     };

//     return (
//         <>
//             <Box sx={{ bgcolor: "#e0f7fa", py: 5 }}>
//                 <Container>
//                     <Paper elevation={6} sx={{ p: 4 }}>
//                         <BreadcrumbContainer breadcrumbs={breadcrumbs} />
//                         <Grid container spacing={3} sx={{ mb: 3 }}>
//                             <Grid item xs={12} sm={6} md={4}>
//                                 <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
//                                     Units
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                         <Grid container spacing={3} sx={{ mb: 3 }}>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <DynamicButton
//                                     icon={Add}
//                                     label={"Add Units"}
//                                     onClick={() => handleOpenModal("add units")}
//                                     sx={{
//                                         bgcolor: "#00816b",
//                                         "&:hover": { bgcolor: "#004d40" },
//                                         transition: "all 0.3s",
//                                     }}
//                                 />
//                             </Grid>
//                         </Grid>
//                         <MedicineUnitTable onEditUnit={(unit) => handleOpenModal("edit units", unit)} />
//                     </Paper>
//                 </Container>
//             </Box>
//             <AllMedicineModals
//                 open={!!modalType}
//                 handleClose={handleCloseModal}
//                 formType={modalType}
//                 selectedData={selectedUnit}
//                 style={{ width: '100%' }}
//             />
//         </>
//     );
// };

// export default Units;

import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import DynamicButton from "../../../common-components/ButtonContainer/DynamicButton";
import { Add } from "@mui/icons-material";
import AllMedicineModals from "../../../common-components/Modals/medicineModals/AllMedicineModals";
import MedicineUnitTable from "../../../common-components/TableContainer/MedicineUnitTable";

const Units = () => {
    const breadcrumbs = ["Medicine", "Units"];
    const [modalType, setModalType] = useState("");
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleOpenModal = (type, unit = null) => {
        setModalType(type);
        setSelectedUnit(unit);
    };

    const handleCloseModal = () => {
        setModalType("");
        setSelectedUnit(null);
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
                                    Units
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <DynamicButton
                                    icon={Add}
                                    label={"Add Units"}
                                    onClick={() => handleOpenModal("add units")}
                                    sx={{
                                        bgcolor: "#00816b",
                                        "&:hover": { bgcolor: "#004d40" },
                                        transition: "all 0.3s",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <MedicineUnitTable onEditUnit={(unit) => handleOpenModal("edit units", unit)} />
                    </Paper>
                </Container>
            </Box>
            <AllMedicineModals
                open={!!modalType}
                handleClose={handleCloseModal}
                formType={modalType}
                selectedData={selectedUnit}
                style={{ width: '100%' }}
            />
        </>
    );
};

export default Units;

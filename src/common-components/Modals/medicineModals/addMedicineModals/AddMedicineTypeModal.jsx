// import React, { useState } from "react";
// import { Button, TextField } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import axios from "axios";

// const API_URL = 'http://localhost:4000/api/v1/medicine-type';

// const AddMedicineTypeModal = ({ onClose, isEditMode, initialCategory,setSuccess }) => {
//   const [medicineTypeName, setMedicineTypeName] = useState(initialCategory?.mediType || "");
//   const handleSaveMedicineType = async () => {
//     try {
//       if (isEditMode && initialCategory?._id) {
//         await axios.put(`${API_URL}/edit/${initialCategory._id}`, { mediType: medicineTypeName }, getConfig());
//       } else {
//         await axios.post(`${API_URL}/add`, { mediType: medicineTypeName }, getConfig());
//       }
//       handleAddType();
//       // onClose(true); // Close modal after successful save
//     } catch (error) {
//       console.error("Error saving medicine type:", error);
//       // alert("Error saving medicine type");
//     }
//   };

//   const getConfig = () => {
//     const auth = JSON.parse(localStorage.getItem('auth'));

//     return {
//       headers: {
//         Authorization: `Bearer ${auth.token}`
//       }
//     };
//   };

//   const handleAddType = () => {
//     setTimeout(() => {
      
//       setSuccess(true);
//     }, 300);
//   };

//   return (
//     <>
//       <TextField
//         autoFocus
//         margin="dense"
//         label="Medicine Type Name"
//         type="text"
//         fullWidth
//         variant="standard"
//         value={medicineTypeName}
//         onChange={(e) => setMedicineTypeName(e.target.value)}
//       />
//       <Button
//         variant="contained"
//         startIcon={<Add />}
//         color="primary"
//         sx={{ mt: 2, mr: 2 }}
//         onClick={handleSaveMedicineType}
//       >
//         {isEditMode ? "Update" : "Add"}
//       </Button>
//       {/* <Button
//         variant="outlined"
//         color="secondary"
//         sx={{ mt: 2 }}
//         onClick={() => onClose(false)} // Close modal on cancel
//       >
//         Cancel
//       </Button> */}
//     </>
//   );
// };

// export default AddMedicineTypeModal;

import React, { useEffect } from "react";
import { Box, Button, TextField, Grid, Paper } from "@mui/material";


const AddMedicineTypeModal = ({ medicineTypeName, setMedicineTypeName, setSuccess, formType, medicineTypeData }) => {
     
    const handleSaveMedicineType = async () => {
      try {
          if (formType === "edit medicinetype") {
              // Call API to update medicinetype
              console.log("Medicine Type updated successfully");
          } else {
              // Call API to add  medicinetype
              console.log("Medicine Type added successfully");
          }
          setSuccess(true);
          setMedicineTypeName("");
      } catch (error) {
          console.error(`Error ${formType === "edit unit" ? "editing" : "adding"} unit:`, error);
      }
  };

    return (
        <Box component="form" onSubmit={handleSaveMedicineType} sx={{ mt: 2 }}>
            <Paper elevation={0} sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Medicine Type Name"
                            value={medicineTypeName}
                            onChange={(e) => setMedicineTypeName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleSaveMedicineType} >
                            {formType === "edit medicinetype" ? "Update Medicine Type" : "Add Medicine Type"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AddMedicineTypeModal;

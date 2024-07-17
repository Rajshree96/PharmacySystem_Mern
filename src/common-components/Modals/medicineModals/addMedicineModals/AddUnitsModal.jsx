// import React, { useState, useEffect } from "react";
// import { TextField, Grid, MenuItem, Button } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import { addUnit, editUnit } from "../../../../unitapi";

// const AddUnitsModal = ({ unitData, onSave, setSuccess }) => {
//   const [formalName, setFormalName] = useState('');
//   const [type, setType] = useState('Single');
//   const [symbol, setSymbol] = useState('');
//   const [primaryUnit, setPrimaryUnit] = useState('');
//   const [conversion, setConversion] = useState('');
//   const [secondaryUnit, setSecondaryUnit] = useState('');
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     if (unitData) {
//       setFormalName(unitData.name);
//       setType(unitData.type);
//       setSymbol(unitData.symbol);
//       setIsEditMode(true);
//     } else {
//       setIsEditMode(false);
//       resetForm();
//     }
//   }, [unitData]);

//   const resetForm = () => {
//     setFormalName('');
//     setType('Single');
//     setSymbol('');
//     setPrimaryUnit('');
//     setConversion('');
//     setSecondaryUnit('');
//   };

//   const handleAddUnit = () => {
//     setTimeout(() => {
//       setSuccess(true);
//     }, 300);
//   };

//   const handleSaveUnit = async () => {
//     const unitToUpdate = {
//       name: formalName,
//       type,
//       symbol,
//       primaryUnit: type === 'Compounded' ? primaryUnit.trim() || null : null,
//       conversion: type === 'Compounded' ? conversion.trim() || null : null,
//       secondaryUnit: type === 'Compounded' ? secondaryUnit.trim() || null : null,
//     };

//     try {
//       if (isEditMode) {
//         await editUnit(unitData._id, unitToUpdate);
//       } else {
//         await addUnit(unitToUpdate);
//       }
//       handleAddUnit();
//     } catch (error) {
//       console.error(isEditMode ? "Error editing unit:" : "Error adding unit:", error);
//     }
//   };

//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             select
//             margin="dense"
//             label="Type"
//             fullWidth
//             variant="standard"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <MenuItem value="Single">Single</MenuItem>
//             <MenuItem value="Compounded">Compounded</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             margin="dense"
//             label="Symbol"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             margin="dense"
//             label="Formal Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={formalName}
//             onChange={(e) => setFormalName(e.target.value)}
//           />
//         </Grid>
//         {type === 'Compounded' && (
//           <>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 label="Primary Unit"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={primaryUnit}
//                 onChange={(e) => setPrimaryUnit(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 margin="dense"
//                 label="Conversion"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={conversion}
//                 onChange={(e) => setConversion(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 margin="dense"
//                 label="Secondary Unit"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={secondaryUnit}
//                 onChange={(e) => setSecondaryUnit(e.target.value)}
//               />
//             </Grid>
//           </>
//         )}
//       </Grid>
//       <Button
//         variant="contained"
//         startIcon={<Add />}
//         color="primary"
//         sx={{ mt: 3 }}
//         onClick={handleSaveUnit}
//       >
//         {isEditMode ? "Save" : "Add Unit"}
//       </Button>
//     </>
//   );
// };

// export default AddUnitsModal;

import React, { useEffect } from "react";
import { Box, Button, TextField, Grid, Paper } from "@mui/material";
// import { createUnit, updateUnit } from "../../../unitapi";
import { addUnit, editUnit } from "../../../../unitapi";

const AddUnitsModal = ({ unitName, setUnitName, setSuccess, formType, unitData }) => {
   
    const handleSaveUnit = async () => {
      try {
          if (formType === "edit unit") {
              // Call API to update category
              console.log("Unit updated successfully");
          } else {
              // Call API to add category
              console.log("Unit added successfully");
          }
          setSuccess(true);
          setUnitName("");
      } catch (error) {
          console.error(`Error ${formType === "edit unit" ? "editing" : "adding"} unit:`, error);
      }
  };

    return (
        <Box component="form" onSubmit={handleSaveUnit} sx={{ mt: 2 }}>
            <Paper elevation={0} sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Unit Name"
                            value={unitName}
                            onChange={(e) => setUnitName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleSaveUnit}>
                            {formType === "edit units" ? "Update Unit" : "Add Unit"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AddUnitsModal;

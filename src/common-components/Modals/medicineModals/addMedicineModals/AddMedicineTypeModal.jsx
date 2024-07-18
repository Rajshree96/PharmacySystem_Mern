import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Grid, Paper } from "@mui/material";
import { addMedicineType, editMedicineType } from "../../../../medicineTypeapi";

const AddMedicineTypeModal = ({ setSuccess, formType, selectedData }) => {
    const [medicineTypeName, setMedicineTypeName] = useState("");

    useEffect(() => {
        if (formType === "edit medicinetype" && selectedData) {
            setMedicineTypeName(selectedData.mediType);
        } else {
            resetForm();
        }
    }, [formType, selectedData]);

    const resetForm = () => {
        setMedicineTypeName("");
    };

    const handleSaveMedicineType = async () => {
        try {
            if (formType === "edit medicinetype") {
                await editMedicineType(selectedData._id, { mediType: medicineTypeName });
                console.log("Medicine Type updated successfully");
            } else {
                await addMedicineType({ mediType: medicineTypeName });
                console.log("Medicine Type added successfully");
            }
            setSuccess(true);
            setMedicineTypeName("");
        } catch (error) {
            console.error(`Error ${formType === "edit medicinetype" ? "editing" : "adding"} medicinetype:`, error);
        }
    };

    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSaveMedicineType(); }} sx={{ mt: 2 }}>
            <Paper elevation={0} sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Medicine Type Name"
                            variant="standard"
                            value={medicineTypeName}
                            onChange={(e) => setMedicineTypeName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Button type="submit" variant="contained" color="primary">
                            {formType === "edit medicinetype" ? "Update Medicine Type" : "Add Medicine Type"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AddMedicineTypeModal;

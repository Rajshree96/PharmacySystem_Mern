import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Grid, Paper, MenuItem } from "@mui/material";
import { addUnit, editUnit } from "../../../../unitapi";

const AddUnitsModal = ({ setSuccess, formType, selectedData }) => {
    const [unitName, setUnitName] = useState("");
    const [formalName, setFormalName] = useState("");
    const [type, setType] = useState("Single");
    const [symbol, setSymbol] = useState("");
    const [primaryUnit, setPrimaryUnit] = useState("");
    const [conversion, setConversion] = useState("");
    const [secondaryUnit, setSecondaryUnit] = useState("");

    useEffect(() => {
        if (formType === "edit units" && selectedData) {
            setFormalName(selectedData.name);
            setType(selectedData.type);
            setSymbol(selectedData.symbol);
            setPrimaryUnit(selectedData.primaryUnit || "");
            setConversion(selectedData.conversion || "");
            setSecondaryUnit(selectedData.secondaryUnit || "");
        } else {
            resetForm();
        }
    }, [formType, selectedData]);

    const resetForm = () => {
        setFormalName("");
        setType("Single");
        setSymbol("");
        setPrimaryUnit("");
        setConversion("");
        setSecondaryUnit("");
    };

    const handleSaveUnit = async (e) => {
        e.preventDefault();
        const unitToUpdate = {
            name: formalName,
            type,
            symbol,
            primaryUnit: type === 'Compounded' ? primaryUnit.trim() || null : null,
            conversion: type === 'Compounded' ? conversion.trim() || null : null,
            secondaryUnit: type === 'Compounded' ? secondaryUnit.trim() || null : null,
        };

        try {
            if (formType === "edit units") {
                await editUnit(selectedData._id, unitToUpdate);
                console.log("Unit updated successfully");
            } else {
                await addUnit(unitToUpdate);
                console.log("Unit added successfully");
            }
            setSuccess(true);
            resetForm();
        } catch (error) {
            console.error(`Error ${formType === "edit units" ? "editing" : "adding"} unit:`, error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSaveUnit} sx={{ mt: 2 }}>
            <Paper elevation={0} sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            margin="dense"
                            label="Type"
                            fullWidth
                            variant="standard"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Compounded">Compounded</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            label="Symbol"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            label="Formal Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formalName}
                            onChange={(e) => setFormalName(e.target.value)}
                        />
                    </Grid>
                    {type === "Compounded" && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    label="Primary Unit"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={primaryUnit}
                                    onChange={(e) => setPrimaryUnit(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    margin="dense"
                                    label="Conversion"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={conversion}
                                    onChange={(e) => setConversion(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    margin="dense"
                                    label="Secondary Unit"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={secondaryUnit}
                                    onChange={(e) => setSecondaryUnit(e.target.value)}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "#1976d2", color: "#fff", "&:hover": { bgcolor: "#004ba0" } }}
                            type="submit"
                        >
                            {formType === "edit units" ? "Update Unit" : "Add Unit"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AddUnitsModal;

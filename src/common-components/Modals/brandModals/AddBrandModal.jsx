import React from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const AddBrandModal = ({ brandName, setBrandName, manufacture, setManufacture }) => {
    return (
        <>
            <Grid container spacing={2}>
                {/* Brand name */}
                <Grid item xs={12} sm={6} md={4} lg={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Brand Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                    />
                </Grid>
                {/* Manufacture */}
                <Grid item xs={12} sm={6} md={4} lg={12}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel>Manufacture</InputLabel>
                        <Select
                            value={manufacture}
                            onChange={(e) => setManufacture(e.target.value)}
                            label="Manufacture"
                            name="manufacture"
                        >
                            <MenuItem value="">Select Manufacture</MenuItem>
                            <MenuItem value="manufacture 1">Manufacture 1</MenuItem>
                            <MenuItem value="manufacture 2">Manufacture 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Button className="btn-design" variant="contained" sx={{ mt: 2 }} onClick={() => setBrandName("")}>
                Cancel
            </Button>
        </>
    );
};

export default AddBrandModal;

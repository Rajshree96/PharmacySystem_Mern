import React, {useState, useEffect} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import {addCategory, editCategory} from "../../../../categoriesApi";

const AddCategoryModal = ({setSuccess, formType, selectedData}) => {
    const [ categoryName, setCategoryName ] = useState("");

    useEffect(() => {
        if (formType === "edit category" && selectedData) {
            setCategoryName(selectedData.name);
        }
        else {
            resetForm();
        }
    }, [ formType, selectedData ]);

    const resetForm = () => {
        setCategoryName("");
    };

    const handleSaveCategory = async () => {
        try {
            if (formType === "edit category") {
                await editCategory(selectedData._id, {name: categoryName});
                console.log("Category updated successfully");
            }
            else {
                await addCategory({name: categoryName});
                console.log("Category added successfully");
            }
            setSuccess(true);
            setCategoryName("");
        } catch (error) {
            console.error(`Error ${formType === "edit category" ? "editing" : "adding"} category:`, error);
        }
    };

    return (
        <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={12}>
                    <TextField
                        label="Category Name"
                        variant="standard"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Button variant="contained" color="primary" onClick={handleSaveCategory} className="btn-design">
                        {formType === "edit category" ? "Update Category" : "Add Category"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddCategoryModal;
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addbrand } from "../../../brandApi";
import axios from "axios";

const AddBrandModal = () => {
    const [brandName, setBrandName] = useState("");
    // const [manufactureId, setManufactureId] = useState([]);
      const [manufacturers, setManufacturers] = useState([]);
      const [selectedManufacturer, setSelectedManufacturer] = useState('');

      const fetchManufacturer = async () => {
        try {
          const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth || !auth.token) {
          console.error("No token found in local storage");
          return;
        }
          const response = await axios.get("http://localhost:4000/api/v1/admin/getAllManufacturer",
            {
              headers: { Authorization: `Bearer ${auth.token}`}
             }
          );

          console.log("API Response:", response.data.result);
    
          if (Array.isArray(response.data.result)) {
            setManufacturers(response.data.result);
          } else {
            console.error("API response does not contain manufacturer array:", response.data);
          }
        } catch (error) {
          console.error("Error fetching manufacturer:", error);
        }
      };

      useEffect(() => {
        fetchManufacturer();
        
      }, []);
    

const handleAddBrand = async () => {
    const brandData = {
        brand: brandName,
        manufactureId: selectedManufacturer,
    };

    try {
        const response = await addbrand(brandData);
        console.log("Brand added successfully", response);
        setBrandName("");
        setSelectedManufacturer("");

    } catch (error) {
        console.error("Error adding brand", error);
    }

};


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
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              label="Manufacture"
              name="manufacture"
            >
                 {manufacturers.map((manufacturer) => (
                                <MenuItem  key={manufacturer._id} value={manufacturer._id}>
                                    {manufacturer.name}
                                </MenuItem>
                            ))}
                
              {/* <MenuItem value="">Select Manufacture</MenuItem>
              <MenuItem value="manufacture 1">Manufacture 1</MenuItem>
              <MenuItem value="manufacture 2">Manufacture 2</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        className="btn-design"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleAddBrand}
      >
        Add
      </Button>
    </>
  );
};

export default AddBrandModal;

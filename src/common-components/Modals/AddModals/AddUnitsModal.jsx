import React, { useState } from "react";
import { DialogContentText, TextField, Grid, MenuItem } from "@mui/material";

const AddUnitsModal = ({ unitName, setUnitName }) => {
  const [type, setType] = useState('Single');
  const [symbol, setSymbol] = useState('');
  const [formalName, setFormalName] = useState('');
  const [primaryUnit, setPrimaryUnit] = useState('');
  const [conversion, setConversion] = useState('');
  const [secondaryUnit, setSecondaryUnit] = useState('');

  return (
    <>
      <DialogContentText>Enter the details of the unit you want to add.</DialogContentText>
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

        {type === 'Compounded' && (
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
      </Grid>
    </>
  );
};

export default AddUnitsModal;

import React from "react";
import { Button } from "@mui/material";

const DynamicButton = ({ icon: Icon, label, onClick }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={Icon ? <Icon /> : null}
      sx={{
        bgcolor: "#00796b",
        "&:hover": { bgcolor: "#004d40" },
        transition: "all 0.3s",
      }}
      onClick={onClick} // Added onClick handler
    >
      {label}
    </Button>
  );
};

export default DynamicButton;

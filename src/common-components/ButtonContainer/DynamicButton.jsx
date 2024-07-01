import React from "react";
import {Button} from "@mui/material";

const DynamicButton = ({icon: Icon, label, onClick, ...props}) => {
    return (
        <Button
            variant="contained"
            fullWidth
            startIcon={Icon ? <Icon /> : null}
            onClick={onClick} // Added onClick handler
            {...props} // Added props here for additional styling
            // sx={{
            //   bgcolor: "#00796b",
            //   "&:hover": { bgcolor: "#004d40" },
            //   transition: "all 0.3s",
            // }}
        >
            {label}
        </Button>
    );
};

export default DynamicButton;

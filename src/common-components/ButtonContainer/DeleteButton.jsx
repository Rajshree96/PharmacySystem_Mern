import React from "react";
import { IconButton, Tooltip } from "@mui/material";

const DeleteButton = ({ icon: Icon, label, onClick, ...props }) => {
    return (
        <Tooltip title={label}>
            <IconButton
                onClick={onClick} 
                {...props}
            >
                {Icon && <Icon />}
            </IconButton>
        </Tooltip>
    );
};

export default DeleteButton;

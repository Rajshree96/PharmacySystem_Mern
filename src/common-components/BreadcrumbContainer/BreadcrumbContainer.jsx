import React from "react";
import {Breadcrumbs, Link} from "@mui/material";

const BreadcrumbContainer = () => {
    return (
        <>

            <Breadcrumbs aria-label="breadcrumb" sx={{mb: 3}}>
                <Link color="inherit" href="#" sx={{textDecoration: "none", color: "#00695c"}}>
                    Medicine
                </Link>
            </Breadcrumbs>
        </>
    );
};

export default BreadcrumbContainer;

import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadcrumbContainer = ({ breadcrumbs }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <Typography key={index} color="textPrimary" sx={{ textDecoration: "none", color: "#00695c", fontWeight: "bold" }}>
            {breadcrumb}
          </Typography>
        ) : (
          <Link
            key={index}
            color="inherit"
            href="#"
            sx={{ textDecoration: "none", color: "#00695c" }}
            onClick={(e) => e.preventDefault()}
          >
            {breadcrumb}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbContainer;

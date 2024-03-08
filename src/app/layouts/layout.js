import React from "react";
import { Box } from "@mui/material";

const FormLayout = ({ children, minHeight }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: minHeight || "100vh",
        backgroundColor: "#eef2f6",
      }}
    >
      {children}
    </Box>
  );
};

export default FormLayout;

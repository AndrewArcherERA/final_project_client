import { Box, Typography } from "@mui/material";
import React from "react";

function SupplierCard({ name }) {
    return (
        <Box
            p={1}
            borderBottom={1}
            sx={{ textDecoration: "none" }}
            height={'100px'}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography variant="h4">Company Name</Typography>
        </Box>
    );
}

export default SupplierCard;

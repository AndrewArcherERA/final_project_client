import {Box, Typography} from "@mui/material";
import React from "react";

function SupplierCard({company_name}) {
    return (
        <Box
            p={1}
            borderBottom={1}
            sx={{textDecoration: "none"}}
            height={'100px'}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography variant="h5">{company_name}</Typography>
        </Box>
    );
}

export default SupplierCard;

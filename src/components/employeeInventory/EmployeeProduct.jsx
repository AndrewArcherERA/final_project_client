import { Box, Button, Grid2, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

function EmployeeProduct() {
    return (
        <Box borderBottom={2}>
            <Grid2 container alignItems={"center"} >
                <Grid2 item size={1} textAlign={"center"}>
                    <Box py={1} minHeight={'100%'} p={0}>Image</Box>
                </Grid2>
                <Grid2 item size={3} textAlign={"center"}>
                    <Box bgcolor={grey[300]}>
                        <Typography py={1}>Some product name</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Box>
                        <Typography py={1}>20</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Box bgcolor={grey[300]}>
                        <Typography py={1}>5</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Box>
                        <Typography py={1}>120</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Box bgcolor={grey[300]}>
                        <Typography py={1}>Some Company LLC</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Box>
                        <Typography py={1}>9-20-2024</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Box bgcolor={grey[300]}>
                        <Button>Request</Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default EmployeeProduct;

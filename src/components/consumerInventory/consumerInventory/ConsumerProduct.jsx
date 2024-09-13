import { Box, Grid2, Typography } from '@mui/material';
import React from 'react'

function ConsumerProduct(image, name, inStock, supplierStock, minStock, supplierName, nextDelivery) {
    return (
        <Box borderBottom={2}>
            <Grid2 container>
                <Grid2 item size={1} textAlign={"center"}>
                    <Box py={1}>Image</Box>
                </Grid2>
                <Grid2 item size={3} textAlign={"center"}>
                    <Box borderLeft={1}>
                        <Typography py={1}>Some product name</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Box borderLeft={1}>
                        <Typography py={1}>20</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Box borderLeft={1}>
                        <Typography py={1}>5</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Box borderLeft={1}>
                        <Typography py={1}>Some Company LLC</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Box borderLeft={1}>
                        <Typography py={1}>120</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Box borderLeft={1}>
                        <Typography py={1}>9-20-2024</Typography>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default ConsumerProduct

import {Box, Grid2} from '@mui/material';
import React from 'react'

function ConsumerHeader() {
    return (
        <Box fontWeight={"600"} fontSize={"larger"}>
            <Grid2 container>
                <Grid2 item size={2}></Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    Product Name
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    Warehouse Stock
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    Supplier Name
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    Store Stock
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    Next Shipment
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default ConsumerHeader

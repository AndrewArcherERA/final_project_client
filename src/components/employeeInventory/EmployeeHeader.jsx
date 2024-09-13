import { Box, Grid2 } from '@mui/material'
import React from 'react'

function EmployeeHeader() {
  return (
    <Box p={1} paddingRight={3} fontWeight={"600"} fontSize={"larger"}>
            <Grid2 container>
                <Grid2 item size={1}></Grid2>
                <Grid2 item size={3} textAlign={"center"}>
                    Product Name
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    Store Stock
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    Min Stock level
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    Warehouse Stock
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    Supplier Name
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    Next Shipment
                </Grid2>
            </Grid2>
        </Box>
  )
}

export default EmployeeHeader

import {Box, Grid2, Typography} from '@mui/material'
import React from 'react'
import styles from '../../pages/inventory/inventory.module.scss'

function EmployeeHeader() {
    return (
        <Box className={styles.header} fontWeight={"600"}>
            <Grid2 container size={12}>
                <Grid2 item size={2}></Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography variant={'h6'} fontWeight={'600'}>Product Name</Typography>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Typography variant={'h6'} fontWeight={'600'}>Stock</Typography>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography variant={'h6'} fontWeight={'600'}>Supplier Name</Typography>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography variant={'h6'} fontWeight={'600'}>Sister Stores</Typography>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Typography variant={'h6'} fontWeight={'600'}>In Warehouse</Typography>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography variant={'h6'} fontWeight={'600'}>Next Shipment</Typography>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default EmployeeHeader

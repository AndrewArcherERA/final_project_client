import { Box, Grid2, Typography } from '@mui/material'
import React from 'react'

function ConsumerProduct() {
  return (
    <Box borderBottom={1} height={'100px'} p={1}>
        <Grid2 container>
            <Grid2 item>
                <Typography variant='h5'>Image</Typography>
            </Grid2>
            <Grid2 item>
                <Typography variant='h5'>Price Per Product</Typography>
            </Grid2>
            <Grid2 item>
                <Typography variant='h5'>Num Products Per Unit</Typography>
            </Grid2>
            <Grid2 item>
                <Typography variant='h5'>Num Units Avialable</Typography>
            </Grid2>
        </Grid2>
    </Box>
  )
}

export default ConsumerProduct

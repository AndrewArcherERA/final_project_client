import { Box, Button, Grid2, Typography } from '@mui/material'
import React from 'react'

function ConsumerProduct({productID, image, pricePerProduct, numProdPerUnit, numUnitsAvail, pricePerUnit}) {
  return (
    <Box borderBottom={1} height={'100px'} p={1} textAlign={'center'} >
        <Grid2 container alignItems={'center'} height={'100%'}>
            <Grid2 size={2} item>
                <Typography variant='h5'>Image</Typography>
            </Grid2>
            <Grid2 size={2} item>
                <Typography variant='h5'>Price Per Product</Typography>
            </Grid2>
            <Grid2 size={2} item>
                <Typography variant='h5'>Num Products Per Unit</Typography>
            </Grid2>
            <Grid2 size={2} item>
                <Typography variant='h5'>Num Units Avialable</Typography>
            </Grid2>
            <Grid2 size={2} item>
                <Typography variant='h5'>Price per unit</Typography>
            </Grid2>
            <Grid2 size={2} item>
                <Box>
                    <Button variant='contained'>Add To Cart</Button>
                </Box>
            </Grid2>
        </Grid2>
    </Box>
  )
}

export default ConsumerProduct

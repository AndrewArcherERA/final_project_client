import {Box, Button, Grid2, Typography} from '@mui/material';
import React from 'react'
import styles from '../../../pages/inventory/inventory.module.scss'

function ConsumerProduct({image, name, inStock, supplierName, storeStocks, nextDeliveryDate, nextDeliveryQuantity}) {
    console.log(storeStocks)
    return (
        <Box borderBottom={2}>
            <Grid2 container height={'100%'} display={"flex"} alignItems={'center'}>
                <Grid2 className={styles.col} item size={2} textAlign={"center"}>
                    <img src={image} className={styles.image} alt={'image'}/>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography className={styles.col}>{name}</Typography>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Typography className={styles.col}>{inStock}</Typography>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography className={styles.col}>{supplierName}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.storeStock} textAlign={"center"}>
                    {storeStocks.length > 0 ? storeStocks.map((store, index) => {
                        return <Typography className={styles.col}
                                           key={index}>{store?.name}: {store?.quantity}</Typography>
                    }) : <Typography className={styles.col}>-</Typography>}
                </Grid2>
                <Grid2 className={styles.col} item size={2} textAlign={"center"}>
                    <Box>
                        <Typography>{nextDeliveryDate}</Typography>
                        <Typography>Quantity: {nextDeliveryQuantity}</Typography>
                    </Box>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Button>Send to store</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default ConsumerProduct

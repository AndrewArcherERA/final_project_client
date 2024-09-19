import { Box, Button, Grid2, Hidden, Typography } from '@mui/material'
import React from 'react'
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

function ConsumerProduct({productID, image, pricePerProduct, numProdPerUnit, numUnitsAvail, pricePerUnit, orderProduct}) {
    const [state, setState] = useState({
        right: false,
    });

    // TODO: Write logic for sending axios call to send order

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // TODO: Pass in data for fields (product name, individual/unit price, numPerUnit, NumUnitsAvail, image)
    const list = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {/* TODO: Map field variables passed in for individual product */}
                <ListItem >
                    <Box display={'flex'} alignItems={'center'} flexDirection={'column'} minWidth={"100%"}>
                        <Box width={'300px'} border={1} height={'300px'} borderRadius={3} overflow={'hidden'}>
                            {/* Image of product */}
                        </Box>
                        <Box width={'100%'} p={3}>
                            <Typography variant='h5'>Name</Typography>
                        </Box>

                    </Box>
                </ListItem>
            </List>
            <Divider />
            <List>
                {/* TODO: calculate total price for order, order button here */}
                <ListItem>

                </ListItem>
            </List>
        </Box>
    );
  
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
            <Drawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        {list('right')}
                    </Drawer>
                <Box>
                    <Button onClick={toggleDrawer('right', true)} variant='contained'>Order</Button>
                </Box>
            </Grid2>
        </Grid2>
    </Box>
  )
}

export default ConsumerProduct

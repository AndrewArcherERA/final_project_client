import { Box, Button, Grid2, Typography } from "@mui/material";
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

function ConsumerProduct({
    productID,
    image,
    pricePerProduct,
    numProdPerUnit,
    numUnitsAvail,
    pricePerUnit,
    orderProduct,
}) {
    const [state, setState] = useState({
        right: false,
    });

    // TODO: Write logic for sending axios call to send order

    const toggleDrawer = (anchor, open, toggle) => (event) => {

        if((event.type === 'keydown' && event.key === 'Esc') || toggle) setState({ ...state, [anchor]: open });
    };

    // TODO: Pass in data for fields (product name, individual/unit price, numPerUnit, NumUnitsAvail, image)
    const list = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            p={3}
        >
            <Typography sx={{cursor: "pointer"}} onClick={toggleDrawer(anchor, false, true)} variant="h3" textAlign={'right'}>X</Typography>
            <List>
                {/* TODO: Map field variables passed in for individual product */}
                <ListItem>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        minWidth={"100%"}
                    >
                        <Box
                            width={"300px"}
                            border={1}
                            height={"300px"}
                            borderRadius={3}
                            overflow={"hidden"}
                        >
                            {/* TODO: Image of product */}
                        </Box>
                        <Box width={"100%"}>
                            <Box textAlign={"center"}>
                                <Typography variant="h4">
                                    Product Name
                                </Typography>
                            </Box>
                            <Grid2 container>
                                <Grid2 borderBottom={1} item size={6}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Price per item:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">$5.35</Typography>
                                </Grid2>
                                <Grid2 item size={6} borderBottom={1}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Items per unit:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">100</Typography>
                                </Grid2>
                                <Grid2 item size={6} borderBottom={1}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Price per unit:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">
                                        {/* TODO: Calculate this, price per item * num items per unit */}
                                        $500.35
                                    </Typography>
                                </Grid2>
                                <Grid2 item size={6} borderBottom={1}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Units in stock:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">45</Typography>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Box>
                </ListItem>
            </List>
            <Divider />
            <List>
                {/* TODO: calculate total price for order, order button here */}
                <ListItem>
                    <Grid2 container gap={2}>
                        <Grid2 item size={12} display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={600}>Order quantity (Units):</Typography>
                            {/* TODO: Set max to num units in stock */}
                            <input type="number" max={100} min={0} onChange={(e) => handleQuantity(e)} style={{fontSize: 'xl'}} placeholder={0}/>
                        </Grid2>
                        <Grid2 item size={12} display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={600}>Total:</Typography>
                            {/* TODO: Calc total price */}
                            <Typography variant="h6" >Calc total price</Typography>
                        </Grid2>
                        <Grid2 item size={12} justifyContent={"center"} display={"flex"}>
                            <Button variant="contained">Confirm Order</Button>
                        </Grid2>
                    </Grid2>
                </ListItem>
            </List>
        </Box>
    );

    function handleQuantity(e) {
        let value = parseInt(e.target.value);
        if(value > e.target.max) e.target.value = e.target.max;
        else if(value < e.target.min) e.target.value = e.target.min;
    }

    return (
        <Box borderBottom={1} height={"100px"} p={1} textAlign={"center"}>
            <Grid2 container alignItems={"center"} height={"100%"}>
                <Grid2 size={2} item>
                    <Typography variant="h5">Image</Typography>
                </Grid2>
                <Grid2 size={2} item>
                    <Typography variant="h5">Price Per Product</Typography>
                </Grid2>
                <Grid2 size={2} item>
                    <Typography variant="h5">Num Products Per Unit</Typography>
                </Grid2>
                <Grid2 size={2} item>
                    <Typography variant="h5">Num Units Avialable</Typography>
                </Grid2>
                <Grid2 size={2} item>
                    <Typography variant="h5">Price per unit</Typography>
                </Grid2>
                <Grid2 size={2} item>
                    <Drawer
                        anchor={"right"}
                        open={state["right"]}
                        onClose={toggleDrawer("right", false)}
                    >
                        {list("right")}
                    </Drawer>
                    <Box>
                        <Button
                            onClick={toggleDrawer("right", true, true)}
                            variant="contained"
                        >
                            Order
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default ConsumerProduct;

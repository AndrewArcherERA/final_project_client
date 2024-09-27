import React, { useState } from "react";
import styles from "./products.module.scss";
import { Box, Button, Divider, Drawer, Grid2, Input, List, ListItem, Typography } from "@mui/material";

function Products() {
    return (
        <div>
            <div className={styles.buttonContainer}>
                <Button variant="contained">Add Product</Button>
            </div>
            <div className={styles.container}>
                <div className={styles.productContainer}>
                  {/* TODO: Map products */}
                    <Product />
                </div>
            </div>
        </div>
    );
}

function Product() {
  const [state, setState] = useState({
    right: false,
});

// TODO: Write logic for sending axios call to send order

const toggleEditDrawer = (anchor, open, toggle) => (event) => {

    if((event.type === 'keydown' && event.key === 'Esc') || toggle) setState({ ...state, [anchor]: open });
};

// TODO: Pass in data for fields (product name, individual/unit price, numPerUnit, NumUnitsAvail, image)
const editlist = (anchor, pricePerItem, itemsPerUnit, pricePerUnit) => (
    <Box
        width={500}
        role="presentation"
        onKeyDown={toggleEditDrawer(anchor, false)}
        p={3}
    >
        <Typography sx={{cursor: "pointer"}} onClick={toggleEditDrawer(anchor, false, true)} variant="h3" textAlign={'right'}>X</Typography>
        <List>
            {/* TODO: Map field variables passed in for individual product */}
            {/* TODO: Assign values for for inputs to state, onchange update state, onSubmit update product */}
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
                        <Input value={'Product Name'} className={styles.input}/>
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
                                <Input value={'$5.35'}/>
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
                                <Input value={'100'}/>
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
                                <Input value={'$500.35'}/>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
            </ListItem>
        </List>
        <Divider/>
        <List>
            {/* TODO: calculate total price for order, order button here */}
            <ListItem>
                <Grid2 container width={'100%'}>
                    <Grid2 item size={12} justifyContent={"center"} display={"flex"}>
                        <Button variant="contained">Update</Button>
                    </Grid2>
                </Grid2>
            </ListItem>
        </List>
    </Box>
);
    return (
        <div className={styles.prodcut}>
            <Grid2 container borderBottom={1} alignItems={"center"} height={'60px'}>
                <Grid2 item size={2} className={styles.col}>
                    <Typography className={styles.details}>Image</Typography>
                </Grid2>
                <Grid2 item size={3}className={styles.col}>
                <Typography className={styles.details}>Name</Typography>
                </Grid2>
                <Grid2 item size={1}className={styles.col}>
                <Typography className={styles.details}>price/item</Typography>
                </Grid2>
                <Grid2 item size={1}className={styles.col}>
                <Typography className={styles.details}>num/unit</Typography>
                </Grid2>
                <Grid2 item size={1}className={styles.col}>
                <Typography className={styles.details}>price/unit</Typography>
                </Grid2>
                <Grid2 item size={1}className={styles.col}>
                <Typography className={styles.details}>stock</Typography>
                </Grid2>
                <Grid2 item size={3}>
                <Drawer
                        anchor={"right"}
                        open={state["right"]}
                        onClose={toggleEditDrawer("right", false)}
                    >
                        {editlist("right")}
                    </Drawer>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={3}
                    >
                        <Button variant="contained" onClick={toggleEditDrawer("right", true, true)}>Edit</Button>
                        <Button variant="contained">Refill Stock</Button>
                    </Box>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Products;

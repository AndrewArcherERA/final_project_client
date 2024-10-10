import React, {useState} from "react";
import styles from "./products.module.scss";
import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid2,
    Input,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import {FaImage} from "react-icons/fa";

function Products() {
    const [newProductState, setnewProductState] = useState({
        right: false,
    });

    const toggleNewProduct = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setnewProductState({...newProductState, [anchor]: open});
    };

    function handleCreateProduct(e) {
        e.preventDefault();


        toggleNewProduct("right", false, true)
    }

    const newProductlist = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleNewProduct(anchor, false)}
            p={3}
        >
            <Typography
                sx={{cursor: "pointer"}}
                onClick={toggleNewProduct(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
            <List>
                {/* TODO: Map field variables passed in for individual product */}
                <ListItem>
                    <form onSubmit={(e) => handleCreateProduct(e)}>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            flexDirection={"column"}
                            minWidth={"100%"}
                        >
                            <Box width={"100%"}>
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    gap={3}
                                >
                                    <FaImage size={50}/>
                                    <Input required type="file"/>
                                </Box>
                                <Box textAlign={"center"}>
                                    <Input required placeholder="Enter product name"/>
                                </Box>
                                <Grid2 container>
                                    <Grid2 borderBottom={1} item size={6}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
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
                                        <Input required placeholder="Enter quanity"/>
                                    </Grid2>
                                    <Grid2 item size={6} borderBottom={1}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
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
                                        <Input required placeholder="Enter quanity"/>
                                    </Grid2>
                                    <Grid2 item size={6} borderBottom={1}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
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
                                        <Input required placeholder="Enter quanity"/>
                                    </Grid2>
                                    <Grid2 item size={6} borderBottom={1}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
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
                                        <Input required placeholder="Enter quanity"/>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </Box>
                        <Grid2 container gap={2} size={12} mt={3}>
                            <Grid2
                                item
                                size={12}
                                justifyContent={"center"}
                                display={"flex"}
                            >
                                <Button variant="contained" type='submit'>Create Product</Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </ListItem>
            </List>
            <Divider/>
        </Box>
    );
    return (
        <div>
            <div className={styles.buttonContainer}>
                <Drawer
                    anchor={"right"}
                    open={newProductState["right"]}
                    onClose={toggleNewProduct("right", false)}
                >
                    {newProductlist("right")}
                </Drawer>
                <Button
                    variant="contained"
                    onClick={toggleNewProduct("right", true, true)}
                >
                    Add Product
                </Button>
            </div>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Grid2 container alignItems={"center"} height={"60px"}>
                        <Grid2
                            item
                            size={2}
                            className={styles.col}
                            borderTop={1}
                            borderLeft={1}
                        >
                            <Typography className={styles.details}>
                                Image
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={3}
                            className={styles.col}
                            borderTop={1}
                        >
                            <Typography className={styles.details}>
                                Name
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.col}
                            borderTop={1}
                        >
                            <Typography className={styles.details}>
                                price/item
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.col}
                            borderTop={1}
                        >
                            <Typography className={styles.details}>
                                item/unit
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.col}
                            borderTop={1}
                        >
                            <Typography className={styles.details}>
                                price/unit
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.col}
                            borderTop={1}
                        >
                            <Typography className={styles.details}>
                                stock
                            </Typography>
                        </Grid2>
                        <Grid2 item size={3}>
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                gap={3}
                            ></Box>
                        </Grid2>
                    </Grid2>
                </div>

                <div className={styles.productContainer}>
                    {/* TODO: Map products */}
                    <Product/>
                </div>
            </div>
        </div>
    );
}

function Product() {
    const [editState, setEditState] = useState({
        right: false,
    });

    const toggleEditDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setEditState({...editState, [anchor]: open});
    };

    const editlist = (anchor, pricePerItem, itemsPerUnit, pricePerUnit) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleEditDrawer(anchor, false)}
            p={3}
        >
            <Typography
                sx={{cursor: "pointer"}}
                onClick={toggleEditDrawer(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
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
                                <Input
                                    value={"Product Name"}
                                    className={styles.input}
                                />
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
                                    <Input value={"$5.35"}/>
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
                                    <Input value={"100"}/>
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
                                    <Input value={"$500.35"}/>
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
                    <Grid2 container width={"100%"}>
                        <Grid2
                            item
                            size={12}
                            justifyContent={"center"}
                            display={"flex"}
                        >
                            <Button variant="contained">Update</Button>
                        </Grid2>
                    </Grid2>
                </ListItem>
            </List>
        </Box>
    );

    const [stockState, setStockState] = useState({
        right: false,
    });

    const toggleStockDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setStockState({...stockState, [anchor]: open});
    };

    const stocklist = (anchor, pricePerItem, itemsPerUnit, pricePerUnit) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleStockDrawer(anchor, false)}
            p={3}
        >
            <Typography
                sx={{cursor: "pointer"}}
                onClick={toggleStockDrawer(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
            <List>
                {/* TODO: Map field variables passed in for individual product */}
                {/* TODO: Assign values for for inputs to state, onchange update state, onSubmit update product */}
                <ListItem>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        minWidth={"100%"}
                        gap={3}
                    >
                        <Typography variant="h5">Product Name</Typography>
                        <Grid2 container>
                            <Grid2 item size={6} borderBottom={1}>
                                <Typography variant="h6" fontWeight={600}>
                                    Current Stock:
                                </Typography>
                            </Grid2>
                            <Grid2
                                item
                                size={6}
                                display={"flex"}
                                justifyContent={"flex-end"}
                                borderBottom={1}
                            >
                                <Input value={"240"}/>
                            </Grid2>
                            <Grid2 item size={6} borderBottom={1}>
                                <Typography variant="h6" fontWeight={600}>
                                    Updated Stock:
                                </Typography>
                            </Grid2>
                            <Grid2
                                item
                                size={6}
                                display={"flex"}
                                justifyContent={"flex-end"}
                                borderBottom={1}
                            >
                                <Input/>
                            </Grid2>
                        </Grid2>
                    </Box>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {/* TODO: calculate total price for order, order button here */}
                <ListItem>
                    <Grid2 container width={"100%"}>
                        <Grid2
                            item
                            size={12}
                            justifyContent={"center"}
                            display={"flex"}
                        >
                            <Button variant="contained">Update</Button>
                        </Grid2>
                    </Grid2>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <div className={styles.prodcut}>
            <Grid2
                container
                borderBottom={1}
                alignItems={"center"}
                height={"60px"}
            >
                <Grid2 item size={2} className={styles.col} borderLeft={1}>
                    <Typography className={styles.details}></Typography>
                </Grid2>
                <Grid2 item size={3} className={styles.col}>
                    <Typography className={styles.details}>
                        Some product
                    </Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>$4.25</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>100</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>$425.00</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>200</Typography>
                </Grid2>
                <Grid2 item size={3}>
                    <Drawer
                        anchor={"right"}
                        open={editState["right"]}
                        onClose={toggleEditDrawer("right", false)}
                    >
                        {editlist("right")}
                    </Drawer>
                    <Drawer
                        anchor={"right"}
                        open={stockState["right"]}
                        onClose={toggleStockDrawer("right", false)}
                    >
                        {stocklist("right")}
                    </Drawer>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={3}
                    >
                        <Button
                            variant="contained"
                            onClick={toggleEditDrawer("right", true, true)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={toggleStockDrawer("right", true, true)}
                        >
                            Refill Stock
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Products;

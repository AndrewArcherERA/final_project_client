import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../dashboardStyles.module.scss";
import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid2,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

function ConsumerDashboard() {
    const [state, setState] = useState({
        right: false,
    });
    const {company_name, f_name, l_name} = useSelector((state) => state.user.data)

    // TODO: Write logic for sending axios call to send order

    const toggleDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setState({ ...state, [anchor]: open });
    };

    // TODO: Pass in data for fields (product name, individual/unit price, numPerUnit, NumUnitsAvail, image)
    const accountDrawer = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            p={3}
        >
            <Typography
                sx={{ cursor: "pointer" }}
                onClick={toggleDrawer(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
            <List>
                <ListItem>
                    <Typography variant="h4">Welcome {f_name} {l_name}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Typography>Account Info</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Typography>Store Locations</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Typography>Add Store Location</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Typography>Warehouse Location</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Typography>Logout</Typography>
                </ListItem>
                <Divider />
            </List>
        </Box>
    );
    return (
        <Box>
            <Grid2 container px={3} py={1} borderBottom={2}>
                <Grid2 item size={2}>
                    <Typography variant="h4">{company_name}</Typography>
                </Grid2>
                <Grid2 item size={8}>
                    <nav className={styles.nav}>
                        <Link to={""} className={styles.link}>
                            <Typography variant="h6">Inventory</Typography>
                        </Link>
                        <Link to={"suppliers"} className={styles.link}>
                            <Typography variant="h6">Suppliers</Typography>
                        </Link>
                        <Link to={"messages"} className={styles.link}>
                            <Typography variant="h6">Messages</Typography>
                        </Link>
                        <Link to={"orders"} className={styles.link}>
                            <Typography variant="h6">Orders</Typography>
                        </Link>
                    </nav>
                </Grid2>
                <Grid2 item size={2}>
                    <nav className={styles.navicons}>
                        {/* <Link to={"cart"} className={styles.link}>
                            <Typography variant="h6">
                                <FaShoppingCart size={30} />
                            </Typography>
                        </Link> */}
                        <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}
                        >
                            {accountDrawer("right")}
                        </Drawer>
                        <Typography variant="h6" className={styles.link}>
                            <IoPersonCircleSharp
                                onClick={toggleDrawer("right", true, true)}
                                size={35}
                            />
                        </Typography>
                    </nav>
                </Grid2>
            </Grid2>
            <Box
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                className={styles.outletWrapper}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default ConsumerDashboard;

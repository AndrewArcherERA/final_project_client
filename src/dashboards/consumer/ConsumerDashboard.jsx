import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../dashboardStyles.module.scss";
import { Box, Grid2, Typography } from "@mui/material";
import { IoPersonCircleSharp } from "react-icons/io5";

function ConsumerDashboard() {
    return (
        <Box>
            <Grid2 container px={3} py={1} borderBottom={2}>
                <Grid2 item size={2}>
                    <Typography variant="h4">Company Name</Typography>
                </Grid2>
                <Grid2 item size={8}>
                    <nav className={styles.nav}>
                        <Link to={"inventory"} className={styles.link}>
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
                        <Link to={"account"} className={styles.link}>
                            <Typography variant="h6">
                                <IoPersonCircleSharp size={35} />
                            </Typography>
                        </Link>
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

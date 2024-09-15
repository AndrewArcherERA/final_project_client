import { Box, Input, Typography } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../dashboardStyles.module.scss"

function SupplierDashboard() {
    return (
        <>
            <Box
                py={1}
                px={3}
                borderBottom={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Typography variant="h4">Company Name</Typography>
                <nav className={styles.nav}>
                    <Link to={"products"} className={styles.link}>
                        <Typography variant="h6">Products</Typography>
                    </Link>
                    <Link to={"messages"} className={styles.link}>
                        <Typography variant="h6">Messages</Typography>
                    </Link>
                    <Link to={"orders"} className={styles.link}>
                        <Typography variant="h6">Orders</Typography>
                    </Link>
                    <Link to={"account"} className={styles.link}>
                        <Typography variant="h6">Account</Typography>
                    </Link>
                </nav>
            </Box>
            <Box
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                className={styles.outletWrapper}
            >
                <Outlet />
            </Box>
        </>
    );
}

export default SupplierDashboard;

import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../dashboardStyles.module.scss"

function EmployeeDashboard() {
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
                    <Link to={"inventory"} className={styles.link}>
                        <Typography variant="h6">Inventory</Typography>
                    </Link>
                    <Link to={"suppliers"} className={styles.link}>
                        <Typography variant="h6">Suppliers</Typography>
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

export default EmployeeDashboard;

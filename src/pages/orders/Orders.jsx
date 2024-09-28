import React from "react";
import styles from "./orders.module.scss";
import Order from "../../components/ordersPage/Order";
import { Grid2, Input, Typography } from "@mui/material";

function Orders() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.search}>
                <Input type="text" className={styles.input} placeholder="Search by order ID..."/>
            </div>
            <div className={styles.ordersParent}>
                <div className={styles.heading}>
                    <Grid2 container>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Order ID</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Product</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Quantity</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Order Total</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Status</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Delivery Date</Typography>
                        </Grid2>
                    </Grid2>
                </div>
                <div className={styles.ordersContainer}>
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                </div>
            </div>
        </div>
    );
}

export default Orders;

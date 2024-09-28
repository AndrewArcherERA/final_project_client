import React from "react";
import styles from "./supplierOrder.module.scss";
import { Grid2, Input, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

function SupplierOrders() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.search}>
                <Input
                    type="text"
                    className={styles.input}
                    placeholder="Search by order ID..."
                />
            </div>
            <div className={styles.ordersParent}>
                <div className={styles.heading}>
                    <Grid2 container>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Order ID</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Recipient</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Product</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Quantity</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Order Total</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Status</Typography>
                        </Grid2>
                        <Grid2 item size={3}>
                            <Typography variant="h6">
                                Delivery Address
                            </Typography>
                        </Grid2>
                        <Grid2 item size={1}>
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
                </div>
            </div>
        </div>
    );
}

function Order() {
    return (
    <div>
        <Grid2 container borderBottom={2} borderColor={grey[400]} alignItems={"center"}>
            <Grid2 item size={1}>
                <Typography >1234</Typography>
            </Grid2>
            <Grid2 item size={2} className={styles.grey}>
                <Typography >Some Company</Typography>
            </Grid2>
            <Grid2 item size={2}>
                <Typography >chicken thighs</Typography>
            </Grid2>
            <Grid2 item size={1} className={styles.grey}>
                <Typography >20</Typography>
            </Grid2>
            <Grid2 item size={1}>
                <Typography >$600.00</Typography>
            </Grid2>
            <Grid2 item size={1} className={styles.grey}>
                <Typography >fulfilling</Typography>
            </Grid2>
            <Grid2 item size={3}>
                <Typography >143 Some street, NY, 12345</Typography>
            </Grid2>
            <Grid2 item size={1} className={styles.grey}>
                <Typography >01/10/25</Typography>
            </Grid2>
        </Grid2>
    </div>)
}

export default SupplierOrders;

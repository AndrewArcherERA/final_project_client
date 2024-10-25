import React from "react";
import styles from "./Order.module.scss";
import {Grid2, Typography} from "@mui/material";

function Order({
                   status,
                   delivery_date,
                   expected_delivery_date,
                   order_id,
                   prod_name,
                   quantity,
                   street,
                   city,
                   state,
                   zip,
                   total_cost
               }) {
    return (
        <div className={styles.order}>
            <Grid2 container>
                <Grid2 item size={1}>
                    <Typography>{order_id}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.grey}>
                    <Typography>{prod_name}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{quantity}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.grey}>
                    <Typography>${total_cost}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{status}</Typography>
                </Grid2>
                <Grid2 item size={2} className={styles.grey}>
                    <Typography>{expected_delivery_date}</Typography>
                </Grid2>
                <Grid2 item size={2} className={styles.grey}>
                    <Typography>{delivery_date ? delivery_date : '-'}</Typography>
                </Grid2>
                <Grid2 item size={3} className={styles.grey}>
                    <Typography>{street}, {city} {state}, {zip}</Typography>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Order;

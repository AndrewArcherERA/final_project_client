import React from "react";
import styles from "./Order.module.scss";
import { Grid2, Typography } from "@mui/material";

function Order() {
    return (
        <div className={styles.order}>
            <Grid2 container>
                <Grid2 item size={2}>
                    <Typography>1265</Typography>
                </Grid2>
                <Grid2 item size={2} className={styles.grey}>
                    <Typography>alternator</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>5</Typography>
                </Grid2>
                <Grid2 item size={2} className={styles.grey}>
                    <Typography>$342.56</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>Shipped</Typography>
                </Grid2>
                <Grid2 item size={2} className={styles.grey}>
                    <Typography>11/12/24</Typography>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Order;

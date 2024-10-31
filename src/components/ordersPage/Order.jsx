import React, {useEffect} from "react";
import styles from "./Order.module.scss";
import {Alert, Button, Grid2, Typography} from "@mui/material";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {getOrders, updateStatus} from "../../features/user/ordersSlice";

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
    const token = useSelector(state => state.user.data.token);
    const [snackSent, setSnackSent] = React.useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSnackSentOpen = () => {
        setSnackSent(true);
    };

    const handleSnackSentClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackSent(false);
    };

    async function handleReceived() {
        const config = {
            headers: {
                Authorization: token
            }
        }
        const url = 'http://final-project.us-east-1.elasticbeanstalk.com/orders/updateOrderStatus';
        const data = {
            order_id: order_id,
            status: 'received'
        }
        try {
            await axios.post(url, data, config).then(async () => {
                dispatch(updateStatus({order_id}));
            });
            handleSnackSentOpen()
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className={styles.order}>
            <Snackbar open={snackSent} autoHideDuration={6000} onClose={handleSnackSentClose}>
                <Alert
                    onClose={handleSnackSentClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    Product Stocked!
                </Alert>
            </Snackbar>
            <Grid2 container>
                <Grid2 item size={1}>
                    <Typography>{order_id}</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>{prod_name}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{quantity}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{total_cost ? `$ ${total_cost}` : 'N/A'}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{status}</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>{expected_delivery_date}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{delivery_date ? delivery_date : '-'}</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>{street}, {city} {state}, {zip}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    {status === 'delivered' ? (<Button onClick={handleReceived}>Receive & Stock</Button>) : null}
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Order;

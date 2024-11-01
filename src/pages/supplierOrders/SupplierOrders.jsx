import React, {useEffect, useState} from "react";
import styles from "./supplierOrder.module.scss";
import {Alert, Button, Grid2, Input, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {getOrders, updateStatusShipped} from "../../features/user/ordersSlice";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

function SupplierOrders() {
    const user = useSelector((state) => state.user);
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders({token: user.data.token, user_type: user.type}));
    }, []);
    return (
        <div className={styles.mainContainer}>
            <div className={styles.ordersParent}>
                <div className={styles.heading}>
                    <Grid2 container>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Order ID</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
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
                        <Grid2 item size={2}>
                            <Typography variant="h6">
                                Delivery Address
                            </Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Order Date</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Delivery Date</Typography>
                        </Grid2>
                    </Grid2>
                </div>
                <div className={styles.ordersContainer}>
                    {!orders.loading ? (
                        <>
                            {orders.list.map((order, index) => {
                                return <div key={index} className={index % 2 === 0 ? styles.isEven : null}>
                                    <Order orderId={order.id} status={order.delivery_status}
                                           orderDate={order.order_date}
                                           recipient={order.recipientName} quantity={order.quantity}
                                           deliveryDate={order.delivery_date}
                                           state={order.warehouseState ? order.warehouseState : order?.storeState}
                                           street={order.warehouseStreet ? order.warehouseStreet : order?.storeStreet}
                                           city={order.warehouseCity ? order.warehouseCity : order?.storeCity}
                                           zip={order.warehouseZip ? order.warehouseZip : order?.storeZip}
                                           productName={order.productName} total={order.total_cost}/>
                                </div>
                            })}
                        </>
                    ) : "Loading..."}

                </div>
            </div>
        </div>
    );
}

function Order({
                   recipient,
                   quantity,
                   productName,
                   total,
                   status,
                   street,
                   city,
                   state,
                   zip,
                   deliveryDate,
                   orderDate,
                   orderId
               }) {
    const token = useSelector(state => state.user.data.token);
    const dispatch = useDispatch();
    const [snackBarState, setSnackBarState] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSnackBarState = (open, message, severity) => {
        setSnackBarState({
            open: open,
            message: message,
            severity: severity
        })
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarState({
            open: false,
            message: '',
            severity: 'success'
        });
    };

    async function handleFulfill() {
        const config = {
            headers: {
                Authorization: token
            }
        }
        const url = 'http://fp-server-again-env.eba-mtq3upkp.us-east-1.elasticbeanstalk.com/orders/updateOrderStatus';
        const data = {
            order_id: orderId,
            status: 'shipped'
        }
        try {
            await axios.post(url, data, config).then(() => {
                dispatch(updateStatusShipped({orderId}))
                handleSnackBarState(true, 'Order shipped successfully!', 'success');
            });
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className={styles.order}>
            <Snackbar open={snackBarState.open} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity={snackBarState.severity}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackBarState.message}
                </Alert>
            </Snackbar>
            <Grid2 container alignItems={"center"}>
                <Grid2 item size={1}>
                    <Typography>{orderId}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{recipient}</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>{productName}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{quantity}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>${total}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{status}</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>{street} {city}, {state}, {zip}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{orderDate}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>{deliveryDate ? deliveryDate : '-'}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    {status === 'ordered' ? (<Button onClick={handleFulfill}>Fulfill & Ship</Button>) : null}
                </Grid2>
            </Grid2>
        </div>
    )
}

export default SupplierOrders;

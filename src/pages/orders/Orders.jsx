import React, {useEffect} from "react";
import styles from "./orders.module.scss";
import Order from "../../components/ordersPage/Order";
import {Grid2, Input, Typography} from "@mui/material";
import {getOrders} from '../../features/user/ordersSlice';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

function Orders() {
    const user = useSelector((state) => state.user);
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders({token: user.data.token, user_type: user.type}));
    }, []);
    return (
        <div className={styles.mainContainer}>
            <div className={styles.search}>
                <Input type="text" className={styles.input} placeholder="Search by order ID..."/>
            </div>
            <div className={styles.ordersParent}>
                <div className={styles.heading}>
                    <Grid2 container>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Order ID</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
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
                            <Typography variant="h6">Expected Delivery Date</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Delivery Date</Typography>
                        </Grid2>
                        <Grid2 item size={3}>
                            <Typography variant="h6">Delivery Address</Typography>
                        </Grid2>
                    </Grid2>
                </div>
                <div className={styles.ordersContainer}>
                    {orders.loading ? ('loading...') : (
                        <>
                            {orders.list.map((order) => {
                                return (
                                    <Order
                                        status={order.delivery_status} delivery_date={order.delivery_date}
                                        expected_delivery_date={order.expected_delivery_date} order_id={order.id}
                                        prod_name={order.productName} quantity={order.quantity}
                                        street={order.storeStreet ? order.storeStreet : order.warehouseStreet}
                                        state={order.storeState ? order.storeState : order.warehouseState}
                                        city={order.storeCity ? order.storeCity : order.warehouseCity}
                                        zip={order.storeZip ? order.storeZip : order.warehouseZip}
                                        total_cost={order.total_cost}
                                    />
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Orders;

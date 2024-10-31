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
            <div className={styles.ordersParent}>
                <div className={styles.heading}>
                    <Grid2 container>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Order ID</Typography>
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
                            <Typography variant="h6">Expected Delivery Date</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">Delivery Date</Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">Delivery Address</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                        </Grid2>
                    </Grid2>
                </div>
                <div className={styles.ordersContainer}>
                    {orders.loading ? ('loading...') : (
                        <>
                            {orders.list.map((order, index) => {
                                const delivery_date = new Date(order.delivery_date)
                                const expected_date = new Date(order.expected_delivery_date);
                                const actual_delivery_date = delivery_date.toISOString().slice(0, 10);
                                const expected_delivery_date = expected_date.toISOString().slice(0, 10);
                                return (
                                    <div className={index % 2 === 0 ? styles.isEven : null}>
                                        <Order
                                            status={order.delivery_status}
                                            delivery_date={order.delivery_date ? actual_delivery_date : null}
                                            expected_delivery_date={order.expected_delivery_date ? expected_delivery_date : null}
                                            order_id={order.id}
                                            prod_name={order.productName} quantity={order.quantity}
                                            street={order.storeStreet ? order.storeStreet : order.warehouseStreet}
                                            state={order.storeState ? order.storeState : order.warehouseState}
                                            city={order.storeCity ? order.storeCity : order.warehouseCity}
                                            zip={order.storeZip ? order.storeZip : order.warehouseZip}
                                            total_cost={order.total_cost}
                                        />
                                    </div>
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

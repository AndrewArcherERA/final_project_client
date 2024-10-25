import React, {useEffect} from "react";
import styles from "./supplierOrder.module.scss";
import {Grid2, Input, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../features/user/ordersSlice";

function SupplierOrders() {
    const user = useSelector((state) => state.user);
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders({token: user.data.token, user_type: user.type}));
    }, []);
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
                    {orders.loading ? (
                        <>
                            {orders.list.map((order) => {
                                return <Order orderId={order.id} status={order.delivery_status}
                                              orderDate={order.order_date}
                                              recipient={order.recipientName} quantity={order.quantity}
                                              deliveryDate={order.delivery_date}
                                              state={order.warehouseState ? order.warehouseState : order?.storeState}
                                              street={order.warehouseStreet ? order.warehouseStreet : order?.storeStreet}
                                              city={order.warehouseCity ? order.warehouseCity : order?.storeCity}
                                              zip={order.warehouseZip ? order.warehouseZip : order?.storeZip}
                                              productName={order.productName} total={order.total_cost}/>
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
    return (
        <div>
            <Grid2 container borderBottom={2} borderColor={grey[400]} alignItems={"center"}>
                <Grid2 item size={1}>
                    <Typography>{orderId}</Typography>
                </Grid2>
                <Grid2 item size={2} className={styles.grey}>
                    <Typography>{recipient}</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>{productName}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.grey}>
                    <Typography>{quantity}</Typography>
                </Grid2>
                <Grid2 item size={1}>
                    <Typography>${total}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.grey}>
                    <Typography>{status}</Typography>
                </Grid2>
                <Grid2 item size={2}>
                    <Typography>{street} {city}, {state}, {zip}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.grey}>
                    <Typography>{orderDate}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.grey}>
                    <Typography>{deliveryDate ? deliveryDate : '-'}</Typography>
                </Grid2>
            </Grid2>
        </div>)
}

export default SupplierOrders;

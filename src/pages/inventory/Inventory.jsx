import {Box, Input, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import ConsumerHeader from "../../components/consumerInventory/consumerInventory/ConsumerHeader";
import ConsumerProduct from "../../components/consumerInventory/consumerInventory/ConsumerProduct";
import EmployeeHeader from "../../components/employeeInventory/EmployeeHeader";
import EmployeeProduct from "../../components/employeeInventory/EmployeeProduct";
import {useSelector} from "react-redux";
import axios from "axios";
import styles from './inventory.module.scss'
import loading from '../../images/loading.svg'

function Inventory({userType}) {
    const [inventory, setInventory] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        getInventory()
    }, []);

    async function getInventory() {
        try {
            const config = {
                headers: {
                    Authorization: user.data.token
                }
            }
            const url = `http://fp-server-again-env.eba-mtq3upkp.us-east-1.elasticbeanstalk.com/inventory/getInventory/${userType}/${user.data.warehouse_id ? user.data.warehouse_id : user.data.store_id}`;
            axios.get(url, config).then((res) => {
                console.log(res)
                setInventory([res.data]);
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={styles.container}>
            {userType === "consumer" ? (
                <ConsumerHeader/>
            ) : (
                <EmployeeHeader/>
            )}
            <div className={styles.inventoryWrapper}>
                {userType === "consumer" ? (
                    [inventory[0] ? inventory[0].map((product, index) => {
                        return (
                            <div className={index % 2 === 0 ? styles.isEven : styles.isOdd}>
                                <ConsumerProduct image={product.link} name={product.name} inStock={product?.quantity}
                                                 supplierName={product.company_name}
                                                 nextDeliveryDate={product.incomingShipment?.expected_delivery_date}
                                                 nextDeliveryQuantity={product.incomingShipment?.quantity}
                                                 storeStocks={product.store_quantities}
                                                 key={index}
                                                 id={product.id}
                                                 getInventory={getInventory}
                                />
                            </div>
                        )
                    }) : <div className={styles.loadingContainer}>
                        <img src={loading} className={styles.loading} alt={'loading'}/>
                        <Typography variant={'h5'}>Loading...</Typography>
                    </div>]
                ) : (
                    [inventory[0] ? inventory[0].map((product, index) => {
                        return (
                            <div className={index % 2 === 0 ? styles.isEven : styles.isOdd}>
                                <EmployeeProduct image={product.link} name={product.name} inStock={product?.quantity}
                                                 supplierName={product.company_name}
                                                 nextDeliveryDate={product.incomingShipment?.expected_delivery_date}
                                                 nextDeliveryQuantity={product.incomingShipment?.quantity}
                                                 storeStocks={product.store_quantities}
                                                 warehouseStock={product.warehouse_quantity?.quantity}
                                                 key={index}
                                />
                            </div>
                        )
                    }) : <div className={styles.loadingContainer}>
                        <img src={loading} className={styles.loading} alt={'loading'}/>
                        <Typography variant={'h5'}>Loading...</Typography>
                    </div>]
                )}
            </div>
        </div>
    )
}

export default Inventory;

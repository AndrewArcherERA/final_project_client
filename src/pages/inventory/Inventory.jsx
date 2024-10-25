import {Box, Input} from "@mui/material";
import React, {useEffect, useState} from "react";
import ConsumerHeader from "../../components/consumerInventory/consumerInventory/ConsumerHeader";
import ConsumerProduct from "../../components/consumerInventory/consumerInventory/ConsumerProduct";
import EmployeeHeader from "../../components/employeeInventory/EmployeeHeader";
import EmployeeProduct from "../../components/employeeInventory/EmployeeProduct";
import {blue} from "@mui/material/colors";
import {useSelector} from "react-redux";
import axios from "axios";

function Inventory({userType}) {
    const [inventory, setInventory] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        getInventory()
    }, []);
    useEffect(() => {
        console.log(inventory[0])
    }, [inventory]);

    async function getInventory() {
        try {
            const config = {
                headers: {
                    Authorization: user.data.token
                }
            }
            const url = `http://localhost:8080/inventory/getInventory/${userType}/${user.data.warehouse_id ? user.data.warehouse_id : user.data.store_id}`;
            axios.get(url, config).then((res) => {
                setInventory([res.data]);
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Box>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box mb={2}>
                    <Input type="text" placeholder="Search for product..."/>
                </Box>
            </Box>
            <Box width={"80vw"} border={2} py={2} bgcolor={blue[400]} borderRadius={2}>
                {/* TODO: Map products */}
                {userType === "consumer" ? (
                    <ConsumerHeader/>
                ) : (
                    <EmployeeHeader/>
                )}
                <Box
                    borderTop={2}
                    height={"70vh"}
                    maxHeight={"70vh"}
                    sx={{overflowY: "scroll"}}
                    bgcolor={"white"}
                >
                    {userType === "consumer" ? (
                        [inventory[0] ? inventory[0].map((product) => {
                            return (
                                <ConsumerProduct image={product.link} name={product.name} inStock={product.quantity}
                                                 supplierName={product.company_name}
                                                 nextDeliveryDate={product.incomingShipment?.expected_delivery_date}
                                                 nextDeliveryQuantity={product.incomingShipment?.quantity}
                                                 storeStocks={product.store_quantities}
                                />
                            )
                        }) : 'Loading...']
                    ) : (
                        [inventory[0] ? inventory[0].map((product) => {
                            return (
                                <EmployeeProduct image={product.link} name={product.name} inStock={product.quantity}
                                                 supplierName={product.company_name}
                                                 nextDeliveryDate={product.incomingShipment?.expected_delivery_date}
                                                 nextDeliveryQuantity={product.incomingShipment?.quantity}
                                                 storeStocks={product.store_quantities}
                                                 warehouseStock={product.warehouse_quantity.quantity}
                                />
                            )
                        }) : 'Loading...']
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Inventory;

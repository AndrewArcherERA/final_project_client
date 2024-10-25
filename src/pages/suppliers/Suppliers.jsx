import {Box, Grid2, Input, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import SupplierCard from "../../components/supplierPage/SupplierCard";
import styles from "./suppliers.module.scss";
import ConsumerProduct from "../../components/supplierPage/ConsumerProduct";
import axios from "axios";
import {useSelector} from "react-redux";

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [supplierProducts, setSupplierProducts] = useState([]);
    const [selected_company_id, set_selected_company_id] = useState();
    const user = useSelector((state) => state.user.data);


    async function getSuppliers() {
        try {
            const config = {
                headers: {
                    Authorization: user.token
                }
            }
            const supplierList = await axios.get('http://localhost:8080/supplierPage/getSuppliers', config);
            setSuppliers([...supplierList.data]);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getSelectedSupplierProds(supplier_id) {
        try {
            const config = {
                headers: {
                    Authorization: user.token
                }
            }

            let prods = await axios.get(`http://localhost:8080/supplierPage/getSupplierProds/${supplier_id}`, config);
            setSupplierProducts([...prods.data]);
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleSelected(id) {
        set_selected_company_id(id);
        getSelectedSupplierProds(id);
    }


    useEffect(() => {
        getSuppliers()
    }, []);

    useEffect(() => {
        handleSelected(suppliers[0]?.id);
    }, [suppliers]);

    // useEffect(() => {
    //     console.log(supplierProducts)
    // }, [supplierProducts]);

    return (
        <Box width={'90vw'} height={"70vh"} maxHeight={"70vh"} overflow={'hidden'} border={2} borderRadius={3}
             display={"flex"}>
            <Box width={"25%"} borderRight={2} height={"100%"}>
                <Box
                    height={"100px"}

                    display={"flex"}
                    alignItems={"center"}
                    p={1}
                    borderBottom={2}
                >
                    <Input
                        fullWidth
                        type={"text"}
                        placeholder="Search for supplier..."
                    />
                </Box>
                <Box className={styles.cardWrapper}>
                    {suppliers.length > 0 ? (suppliers.map((supplier) => {
                        return (
                            <div onClick={() => handleSelected(supplier.id)}

                                 className={selected_company_id === supplier.id ? styles.isSelected : null}
                            >
                                <SupplierCard company_name={supplier.company_name}/>
                            </div>
                        )
                        // if (selected_company_id === supplier.id) return
                        // else return <div onClick={(e) => handleSelected(e)} id={supplier.id}><SupplierCard
                        //     name={supplier.company_name}/>
                        // </div>
                    })) : null}
                </Box>
            </Box>
            <Box width={"100%"}>
                <Box
                    height={"100px"}
                    borderBottom={2}
                    display={"grid"}
                    alignItems={"center"}
                    textAlign={"center"}
                    py={1}
                    paddingRight={2}
                >
                    <Grid2 container alignItems={'center'} size={12}>
                        <Grid2 item size={2}></Grid2>
                        <Grid2 size={4} item>
                            <Typography variant='h6'>Product Name</Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">
                                Price Per Product
                            </Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">
                                Num Products Per Unit
                            </Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">
                                Num Units Avialable
                            </Typography>
                        </Grid2>
                        <Grid2 size={1} item>
                            <Typography variant="h6">Price per unit</Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box width={"100%"} className={styles.productWrapper}>
                    {supplierProducts.length > 0 ? (
                        supplierProducts.map((prod) => {
                            return (
                                <ConsumerProduct productID={prod.id} image={prod.image_link}
                                                 pricePerProduct={prod.price_per_product}
                                                 numProdPerUnit={prod.num_products_per_unit}
                                                 numUnitsAvail={prod.num_units_available}
                                                 pricePerUnit={prod.num_products_per_unit * prod.price_per_product}
                                                 name={prod.name}/>
                            )
                        })
                    ) : (<div>
                        <Typography>No Products...</Typography>
                    </div>)}
                </Box>
            </Box>
        </Box>
    );
}

export default Suppliers;

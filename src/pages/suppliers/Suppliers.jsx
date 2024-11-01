import {Box, Grid2, Input, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import SupplierCard from "../../components/supplierPage/SupplierCard";
import styles from "./suppliers.module.scss";
import ConsumerProduct from "../../components/supplierPage/ConsumerProduct";
import axios from "axios";
import {useSelector} from "react-redux";
import noProds from '../../images/noProds.png'
import loading from '../../images/loading.svg'

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [supplierProducts, setSupplierProducts] = useState([]);
    const [selected_company_id, set_selected_company_id] = useState();
    const [gettingProds, setGettingProds] = useState(false);
    const user = useSelector((state) => state.user.data);


    async function getSuppliers() {
        try {
            const config = {
                headers: {
                    Authorization: user.token
                }
            }
            const supplierList = await axios.get('https://arrowsupplies.net/supplierPage/getSuppliers', config);
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

            let prods = await axios.get(`https://arrowsupplies.net/supplierPage/getSupplierProds/${supplier_id}`, config);
            setSupplierProducts([...prods.data]);
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleSelected(id) {
        setGettingProds(true)
        set_selected_company_id(id);
        getSelectedSupplierProds(id).then(() => setGettingProds(false));
    }


    useEffect(() => {
        getSuppliers()
    }, []);

    useEffect(() => {
        handleSelected(suppliers[0]?.id);
    }, [suppliers]);

    return (
        <div className={styles.container}>
            <Box className={styles.cardWrapper}>
                <div className={styles.headerSuppliers}>
                    <Typography variant={'h6'}>Suppliers</Typography>
                </div>
                {suppliers.length > 0 ? (suppliers.map((supplier) => {
                    return (
                        <div onClick={() => handleSelected(supplier.id)}

                             className={selected_company_id === supplier.id ? styles.isSelected : null}
                        >
                            <SupplierCard company_name={supplier.company_name}/>
                        </div>
                    )
                })) : null}
            </Box>
            <Box width={"100%"} height={'100%'}>
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
                                $ / Product
                            </Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">
                                # Products / Unit
                            </Typography>
                        </Grid2>
                        <Grid2 item size={1}>
                            <Typography variant="h6">
                                Stock
                            </Typography>
                        </Grid2>
                        <Grid2 size={1} item>
                            <Typography variant="h6">$ / unit</Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box width={"100%"}>
                    <div className={styles.productWrapper}>
                        {gettingProds ? (
                            <div className={styles.loadingContainer}>
                                <img src={loading} className={styles.loading}/>
                                <Typography variant={'h5'}>Loading...</Typography>
                            </div>
                        ) : (
                            <>
                                {supplierProducts.length > 0 ? (
                                    supplierProducts.map((prod, index) => {
                                        return (
                                            <div className={index % 2 === 0 ? styles.isEven : null}>
                                                <ConsumerProduct productID={prod.id} image={prod.image_link}
                                                                 pricePerProduct={prod.price_per_product}
                                                                 numProdPerUnit={prod.num_products_per_unit}
                                                                 numUnitsAvail={prod.num_units_available}
                                                                 pricePerUnit={prod.num_products_per_unit * prod.price_per_product}
                                                                 name={prod.name}/>
                                            </div>
                                        )
                                    })
                                ) : (<div className={styles.noProductsWrapper}>
                                    <div className={styles.noProdsBackground}>
                                        <img src={noProds} className={styles.noProds}/>
                                        <div className={styles.noProdsText}>
                                            <Typography variant={'h3'} fontWeight={'600'}>Uh oh...</Typography>
                                            <Typography variant={'h4'}>Looks like this supplier hasnt added any products
                                                yet!</Typography>
                                        </div>
                                    </div>
                                </div>)}
                            </>
                        )}
                    </div>
                </Box>
            </Box>
        </div>
    );
}

export default Suppliers;

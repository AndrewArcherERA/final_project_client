import { Box, Grid2, Input, Typography } from "@mui/material";
import React from "react";
import SupplierCard from "../../components/supplierPage/SupplierCard";
import styles from "./suppliers.module.scss";
import ConsumerProduct from "../../components/supplierPage/ConsumerProduct";

function Suppliers() {
    return (
        <Box width={"100%"} height={"100%"} display={"flex"}>
            <Box width={"25%"} borderRight={2} height={"100%"}>
                <Box
                    height={"75px"}
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
                    {/*TODO: Map supplier card for all suppliers */}
                    {/* TODO: onClick display selected suppliers products */}
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                    <SupplierCard />
                </Box>
            </Box>
            <Box width={"100%"}>
                <Box
                    height={"75px"}
                    borderBottom={2}
                    display={"grid"}
                    alignItems={"center"}
                    textAlign={"center"}
                    width={"99%"}
                >
                    <Grid2 container height={'100%'} alignItems={'center'}>
                        <Grid2 item size={2}></Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6" p={0}>
                                Price Per Product
                            </Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">
                                Num Products Per Unit
                            </Typography>
                        </Grid2>
                        <Grid2 item size={2}>
                            <Typography variant="h6">
                                Num Units Avialable
                            </Typography>
                        </Grid2>
                        <Grid2 size={2} item>
                            <Typography variant="h6">Price per unit</Typography>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box width={"100%"} className={styles.productWrapper}>
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                    <ConsumerProduct />
                </Box>
            </Box>
        </Box>
    );
}

export default Suppliers;

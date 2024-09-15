import { Box, Grid2, Input, Typography } from "@mui/material";
import React from "react";
import SupplierCard from "../../components/supplierPage/SupplierCard";
import styles from "./suppliers.module.scss";
import ConsumerProduct from "../../components/supplierPage/ConsumerProduct";

function Suppliers() {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
        >
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
                    py={1}
                    height={"75px"}
                    borderBottom={2}
                    display={"grid"}
                    alignItems={"center"}
                    textAlign={"center"}
                    width={"99%"}
                >
                    <Grid2 container>
                        <Grid2 item size={3}>
                            <Typography variant="h5">Image</Typography>
                        </Grid2>
                        <Grid2 item size={3}>
                            <Typography variant="h5">
                                Price Per Product
                            </Typography>
                        </Grid2>
                        <Grid2 item size={3}>
                            <Typography variant="h5">
                                Num Products Per Unit
                            </Typography>
                        </Grid2>
                        <Grid2 item size={3}>
                            <Typography variant="h5">
                                Num Units Avialable
                            </Typography>
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

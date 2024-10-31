import {Box, Typography} from "@mui/material";
import React from "react";
import styles from '../../pages/suppliers/suppliers.module.scss'

function SupplierCard({company_name}) {
    return (
        <Box
            p={1}
            borderBottom={1}
            sx={{textDecoration: "none"}}
            height={'100px'}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            className={styles.companyCard}
        >
            <Typography>{company_name}</Typography>
        </Box>
    );
}

export default SupplierCard;

import {Box, Typography} from "@mui/material";
import React from "react";
import styles from '../../pages/suppliers/suppliers.module.scss'

function SupplierCard({company_name, phone, email, address}) {
    return (
        <Box
            p={1}
            borderBottom={1}
            sx={{textDecoration: "none"}}
            height={'100px'}
            display={"flex"}
            alignItems={"center"}
            flexDirection={'column'}
            justifyContent={"center"}
            className={styles.companyCard}
        >
            <Typography variant={'h5'}>{company_name}</Typography>
            <div>
                <Typography>Phone: {phone}</Typography>
                <Typography> Email: {email}</Typography>
            </div>
        </Box>
    );
}

export default SupplierCard;

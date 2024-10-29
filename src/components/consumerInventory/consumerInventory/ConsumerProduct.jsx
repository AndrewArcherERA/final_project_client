import {
    Box,
    Button,
    Divider, Drawer,
    FormControl,
    Grid2, Input,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react'
import styles from '../../../pages/inventory/inventory.module.scss'
import {useSelector} from "react-redux";
import axios from "axios";

function ConsumerProduct({
                             id,
                             image,
                             name,
                             inStock,
                             supplierName,
                             storeStocks,
                             nextDeliveryDate,
                             nextDeliveryQuantity
                         }) {
    const user = useSelector(state => state.user.data)
    const [stores, setStores] = useState([]);
    const [location, setLocation] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState({});
    const [adjustableQuantity, setAdjustableQuantity] = useState(0);

    async function handleSendToStore() {
        try {
            const config = {
                headers: {
                    Authorization: user.token
                }
            }
            const data = {
                warehouse_id: user.warehouse_id,
                store_id: deliveryLocation.data.id,
                product_id: id,
                quantity: adjustableQuantity,
            }
            const url = `http://localhost:8080/inventory/sendToStore`;
            await axios.post(url, data, config).then(() => {
                setCartState({...cartState, ['right']: false})
            });
        } catch (error) {
            console.error(error.message)
        }
    }

    function handleDeliveryLocation(e) {
        const locationData = {
            data: stores[parseInt(e.target.value)].store,
            type: 'Store'
        }
        setLocation(e.target.value);
        setDeliveryLocation(locationData);
    }

    function handleQuantity(e) {
        if (e.target.value < 0) e.target.value = 0;
        if (e.target.value > inStock) e.target.value = inStock;
        setAdjustableQuantity(e.target.value);
    }

    async function getStores() {
        const config = {
            headers: {Authorization: user.token},
        };
        const url = `http://localhost:8080/consumerStore/getStores/${user.id}`;
        let response = await axios.get(url, config);
        setStores(response.data);
    }

    const [cartState, setCartState] = useState({
        right: false,
    });
    const toggleCartDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setCartState({...cartState, [anchor]: open});
    };
    const cartDrawer = (anchor, name, inStock) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleCartDrawer(anchor, false)}
            p={3}
        >
            <Typography sx={{cursor: "pointer"}} onClick={toggleCartDrawer(anchor, false, true)} variant="h3"
                        textAlign='right'>X</Typography>
            <List>
                <Typography variant='h4' borderBottom={2}>Order</Typography>
                <ListItem>
                    <Box width={'100%'} alignItems={'center'}>
                        <Typography variant={'h4'} textAlign={'center'}>{name}</Typography>
                        <Typography variant={'h5'}>Units in stock: {inStock}</Typography>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box display={'flex'} width={'100%'} gap={4}>
                        <Typography variant={'h5'}>Order Quantity:</Typography>
                        <Input type={'number'} onChange={handleQuantity} value={adjustableQuantity}/>
                    </Box>
                </ListItem>
                <ListItem>
                    <Button variant="contained" disabled={!deliveryLocation.type}
                            onClick={handleSendToStore}
                            fullWidth>{deliveryLocation.type ? "Create Order" : "Select delivery location"}
                    </Button>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <FormControl variant='standard' sx={{minWidth: '100%'}}>
                        <InputLabel>
                            Delivery Location
                        </InputLabel>
                        <Select fullWidth variant='outlined' value={location} label={'Location'}
                                onChange={(e) => handleDeliveryLocation(e)}>
                            {/*Map warehouse && store locations*/}
                            {stores.map((store, index) => {
                                return (<MenuItem key={index} value={index}>
                                    {store.store.name}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </ListItem>
            </List>
        </Box>
    )

    useEffect(() => {
        getStores();
    }, []);
    return (
        <Box className={styles.productWrapper}>
            <Grid2 container height={'100%'} display={"flex"} alignItems={'center'} size={12}>
                <Grid2 className={styles.col} p={1} item size={2} textAlign={"center"}>
                    <img src={image} className={styles.image} alt={'image'}/>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography className={styles.col}>{name}</Typography>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Typography className={styles.col}>{inStock}</Typography>
                </Grid2>
                <Grid2 item size={2} textAlign={"center"}>
                    <Typography className={styles.col}>{supplierName}</Typography>
                </Grid2>
                <Grid2 item size={2} className={styles.storeStock} textAlign={"center"}>
                    <div className={styles.col} style={{flexDirection: 'column'}}>
                        {storeStocks.length > 0 ? storeStocks.map((store, index) => {
                            if (store?.quantity) {
                                return <Typography key={index}>{store?.name}: {store?.quantity}</Typography>
                            }
                        }) : <Typography>-</Typography>}
                    </div>
                </Grid2>
                <Grid2 className={styles.col} item size={2} textAlign={"center"}>
                    <Box>
                        {nextDeliveryDate ? (
                            <>
                                <Typography>{nextDeliveryDate}</Typography>
                                <Typography>Quantity: {nextDeliveryQuantity}</Typography>
                            </>
                        ) : '-'}
                    </Box>
                </Grid2>
                <Grid2 item size={1} textAlign={"center"}>
                    <Drawer
                        anchor={"right"}
                        open={cartState["right"]}
                        onClose={toggleCartDrawer("right", false)}
                    >
                        {cartDrawer("right", name, inStock)}
                    </Drawer>
                    <Button onClick={toggleCartDrawer("right", true, true)} color={'success'} variant={'contained'}
                            size={'small'}>Resupply
                        Store</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default ConsumerProduct

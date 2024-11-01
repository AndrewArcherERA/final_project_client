import {Alert, Box, Button, Grid2, Input, Typography} from "@mui/material";
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {useState} from "react";
import styles from "../../pages/suppliers/suppliers.module.scss";
import {useSelector} from "react-redux";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

function ConsumerProduct({
                             productID,
                             image,
                             pricePerProduct,
                             numProdPerUnit,
                             numUnitsAvail,
                             pricePerUnit,
                             name
                         }) {
    const [state, setState] = useState({
        right: false,
    });
    const token = useSelector(state => state.user.data.token);
    const id = useSelector(state => state.user.data.id);

    const toggleDrawer = (anchor, open, toggle) => (event) => {

        if ((event.type === 'keydown' && event.key === 'Esc') || toggle) setState({...state, [anchor]: open});
    };

    async function addItemToCart(e) {
        e.preventDefault();
        const quantity = e.target[0].value;

        try {
            const config = {
                headers: {
                    Authorization: token
                }
            }
            const url = 'http://fp-server-again-env.eba-mtq3upkp.us-east-1.elasticbeanstalk.com/cart/addCartItem';
            const data = {
                userID: id,
                productID: productID,
                quantity: quantity
            }
            await axios.post(url, data, config).then(() => {
                setState({...state, ['right']: false});
                handleSnackSentOpen()
            });
        } catch (error) {
            if (error.status === 400) {
                handleSnackDeleteOpen()
                setState({...state, ['right']: false});
                return
            }
            console.error(error.message)
        }
    }


    const list = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            p={3}
            bgcolor={'#001539'}
            height={'100%'}
            color={'whitesmoke'}
        >
            <Typography sx={{cursor: "pointer"}} onClick={toggleDrawer(anchor, false, true)} variant="h3"
                        textAlign={'right'}>X</Typography>
            <List>
                <ListItem>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        minWidth={"100%"}
                    >
                        <Box
                            borderRadius={3}
                            overflow={"hidden"}
                        >
                            <img className={styles.productImage} src={image} alt={'product media'}/>
                        </Box>
                        <Box width={"100%"}>
                            <Box textAlign={"center"}>
                                <Typography variant="h4">
                                    {name}
                                </Typography>
                            </Box>
                            <Grid2 container>
                                <Grid2 borderBottom={1} item size={6}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Price per item:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">${pricePerProduct}</Typography>
                                </Grid2>
                                <Grid2 item size={6} borderBottom={1}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Items per unit:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">{numProdPerUnit}</Typography>
                                </Grid2>
                                <Grid2 item size={6} borderBottom={1}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Price per unit:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">
                                        {numProdPerUnit * pricePerProduct}
                                    </Typography>
                                </Grid2>
                                <Grid2 item size={6} borderBottom={1}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Units in stock:
                                    </Typography>
                                </Grid2>
                                <Grid2
                                    item
                                    size={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    borderBottom={1}
                                >
                                    <Typography variant="h6">{numUnitsAvail}</Typography>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Box>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <form onSubmit={(e) => addItemToCart(e)}>
                    <ListItem>
                        <Grid2 container gap={2}>
                            <Grid2 item size={12} display={'flex'} justifyContent={'space-between'}>
                                <Typography variant="h6" fontWeight={600}>Order quantity (Units):</Typography>
                                <input type="number" defaultValue={1} max={numUnitsAvail} min={0}
                                       onChange={(e) => handleQuantity(e)}
                                       style={{fontSize: 'xl'}} placeholder={0}/>
                            </Grid2>
                            <Grid2 item size={12} justifyContent={"center"} display={"flex"}>
                                <Button variant="contained" type='submit'>Add to cart</Button>
                            </Grid2>
                        </Grid2>
                    </ListItem>
                </form>
            </List>
        </Box>
    );

    function handleQuantity(e) {
        let value = parseInt(e.target.value);
        if (value > e.target.max) e.target.value = e.target.max;
        else if (value < e.target.min) e.target.value = e.target.min;
    }

    const [snackSent, setSnackSent] = React.useState(false);
    const [snackDelete, setSnackDelete] = React.useState(false);

    const handleSnackSentOpen = () => {
        setSnackSent(true);
    };

    const handleSnackSentClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackSent(false);
    };

    const handleSnackDeleteOpen = () => {
        setSnackDelete(true);
    };

    const handleSnackDeleteClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackDelete(false);
    };

    return (
        <Box borderBottom={1} height={'15vh'} textAlign={"center"}>
            <Snackbar open={snackSent} autoHideDuration={6000} onClose={handleSnackSentClose}>
                <Alert
                    onClose={handleSnackSentClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    Item added to cart!
                </Alert>
            </Snackbar>
            <Snackbar open={snackDelete} autoHideDuration={6000} onClose={handleSnackDeleteClose}>
                <Alert
                    onClose={handleSnackDeleteClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    Item already in cart!
                </Alert>
            </Snackbar>
            <Grid2 container alignItems={"center"} height={"100%"}>
                <Grid2 size={2} item className={styles.col}>
                    <img className={styles.productImage} src={image} alt={'product media'}/>
                </Grid2>
                <Grid2 size={4} item className={styles.col}>
                    <Typography>{name}</Typography>
                </Grid2>
                <Grid2 size={1} item className={styles.col}>
                    <Typography variant="h6">${pricePerProduct}</Typography>
                </Grid2>
                <Grid2 size={1} item className={styles.col}>
                    <Typography variant="h6">{numProdPerUnit}</Typography>
                </Grid2>
                <Grid2 size={1} item className={styles.col}>
                    {numUnitsAvail > 0 ? (<Typography variant="h6">{numUnitsAvail}</Typography>) : (
                        <Typography color={'grey'}>Out of Stock</Typography>)}

                </Grid2>
                <Grid2 size={1} item className={styles.col}>
                    <Typography variant="h6">${pricePerUnit}</Typography>
                </Grid2>
                <Grid2 size={2} item className={styles.col}>
                    <Drawer
                        anchor={"right"}
                        open={state["right"]}
                        onClose={toggleDrawer("right", false)}
                    >
                        {list("right")}
                    </Drawer>
                    <Box display={'flex'} justifyContent={'space-around'} gap={5} p={2}>
                        {numUnitsAvail > 0 ? (<Button
                            onClick={toggleDrawer("right", true, true)}
                            variant="contained"
                            size={'small'}
                            color={'success'}
                        >
                            Add to cart
                        </Button>) : (null)}
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default ConsumerProduct;

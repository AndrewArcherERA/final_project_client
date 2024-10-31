import React, {useEffect, useState} from "react";
import styles from "./products.module.scss";
import {
    Alert,
    Box,
    Button,
    Divider,
    Drawer,
    Grid2,
    Input,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import {FaImage} from "react-icons/fa";
import {useSelector} from "react-redux";
import axios from "axios";
import loading from '../../images/loading.svg';
import noProds from '../../images/noProds.png';
import Snackbar from "@mui/material/Snackbar";

function Products() {
    const [newProductState, setnewProductState] = useState({
        right: false,
    });
    const user = useSelector((state) => state.user.data)
    const [products, setProducts] = useState([]);
    const [gettingProducts, setGettingProducts] = useState(false);

    const toggleNewProduct = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setnewProductState({...newProductState, [anchor]: open});
    };

    async function handleCreateProduct(e) {
        e.preventDefault();
        const form = e.target;
        try {
            const formData = new FormData();

            formData.append('file', form[0].files[0]);
            formData.append('name', form[1].value);
            formData.append('price_per_product', form[2].value);
            formData.append('num_products_per_unit', form[3].value);
            formData.append('num_units_available', form[4].value);

            let product = await axios.post(
                "http://localhost:8080/products/createProduct",
                formData,
                {
                    headers: {
                        Authorization: user.token,
                        "content-type": "multipart/form-data",
                    },
                }
            );
            // form[0] = [];
            // form[1].value = '';
            // form[2].value = '';
            // form[3].value = '';
            // form[4].value = '';
            setnewProductState({right: false})
            handleSnackBarState(true, 'Product created successfully!', 'success');
            getAllProducts()
        } catch (error) {
            console.log(error.message)
        }
    }

    async function getAllProducts() {
        try {

            let products = await axios.get(
                `http://localhost:8080/products/getProducts`,
                {
                    headers: {
                        Authorization: user.token,
                    },

                }
            );

            setProducts(products.data);

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        setGettingProducts(true);
        getAllProducts().then(() => {
            setGettingProducts(false);
        })
    }, []);

    const [snackBarState, setSnackBarState] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSnackBarState = (open, message, severity) => {
        setSnackBarState({
            open: open,
            message: message,
            severity: severity
        })
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarState({
            open: false,
            message: '',
            severity: 'success'
        });
    };

    const newProductlist = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleNewProduct(anchor, false)}
            p={3}
            className={styles.newProd}
        >
            <Typography
                sx={{cursor: "pointer"}}
                onClick={toggleNewProduct(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
            <List>
                <ListItem>
                    <form onSubmit={(e) => handleCreateProduct(e)}>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            flexDirection={"column"}
                            minWidth={"100%"}
                        >
                            <Box width={"100%"}>
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    gap={3}
                                >
                                    <FaImage size={50}/>
                                    <Input className={styles.passwordInput} required type="file"/>
                                </Box>
                                <Box textAlign={"center"}>
                                    <Input className={styles.passwordInput} required placeholder="Enter product name"/>
                                </Box>
                                <Grid2 container spacing={2} mt={2}>
                                    <Grid2 borderBottom={1} item size={6}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
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
                                        <Input className={styles.passwordInput} required placeholder="Enter quanity"/>
                                    </Grid2>
                                    <Grid2 item size={6} borderBottom={1}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
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
                                        <Input className={styles.passwordInput} required placeholder="Enter quanity"/>
                                    </Grid2>
                                    <Grid2 item size={6} borderBottom={1}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
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
                                        <Input className={styles.passwordInput} required placeholder="Enter quanity"/>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </Box>
                        <Grid2 container gap={2} size={12} mt={3}>
                            <Grid2
                                item
                                size={12}
                                justifyContent={"center"}
                                display={"flex"}
                            >
                                <Button variant="contained" type='submit'>Create Product</Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </ListItem>
            </List>
            <Divider/>
        </Box>
    );
    return (
        <div>
            <Snackbar open={snackBarState.open} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity={snackBarState.severity}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackBarState.message}
                </Alert>
            </Snackbar>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Grid2 container alignItems={"center"} height={"60px"}>
                        <Grid2
                            item
                            size={2}
                            className={styles.headingCol}
                            borderTop={1}
                            borderLeft={1}
                        >
                            <Drawer
                                anchor={"right"}
                                open={newProductState["right"]}
                                onClose={toggleNewProduct("right", false)}
                            >
                                {newProductlist('right')}
                            </Drawer>
                            <Button variant={'contained'} onClick={toggleNewProduct('right', true, true)}>Add
                                Product</Button>
                        </Grid2>
                        <Grid2
                            item
                            size={3}
                            className={styles.headingCol}
                            borderTop={1}
                        >
                            <Typography variant={'h6'} className={styles.details}>
                                Name
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.headingCol}
                            borderTop={1}
                        >
                            <Typography variant={'h6'} className={styles.details}>
                                $ / item
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.headingCol}
                            borderTop={1}
                        >
                            <Typography variant={'h6'} className={styles.details}>
                                # products / unit
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.headingCol}
                            borderTop={1}
                        >
                            <Typography variant={'h6'} className={styles.details}>
                                $ / unit
                            </Typography>
                        </Grid2>
                        <Grid2
                            item
                            size={1}
                            className={styles.headingCol}
                            borderTop={1}
                        >
                            <Typography variant={'h6'} className={styles.details}>
                                stock
                            </Typography>
                        </Grid2>
                        <Grid2 item size={3}>
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                gap={3}
                            ></Box>
                        </Grid2>
                    </Grid2>
                </div>

                <div className={styles.productContainer}>
                    {gettingProducts ? (
                        <div className={styles.loading}>
                            <img src={loading} alt={'loading'}/>
                            <Typography variant={'h5'}>Loading...</Typography>
                        </div>
                    ) : (
                        <>
                            {products.length > 0 ? (products.map((prod, index) => {
                                return (
                                    < div className={index % 2 === 0 ? styles.isEven : null}>
                                        <Product image={prod.image_link} image_key={prod.image_key} name={prod.name}
                                                 stock={prod.num_units_available}
                                                 items_per_unit={prod.num_products_per_unit}
                                                 price_per_item={prod.price_per_product}
                                                 key={prod.id}
                                                 products={products}
                                                 setProducts={setProducts}
                                                 token={user.token}
                                                 product_id={prod.id}/>
                                    </div>
                                )
                            })) : <div className={styles.loading}>
                                <img src={noProds} alt={'loading'}/>
                                <Typography variant={'h5'}>Add a product to start selling!</Typography>
                            </div>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function Product({
                     image,
                     image_key,
                     name,
                     price_per_item,
                     items_per_unit,
                     stock,
                     product_id,
                     products,
                     setProducts,
                     token
                 }) {
    const [editState, setEditState] = useState({
        right: false,
    });
    const [snackBarState, setSnackBarState] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSnackBarState = (open, message, severity) => {
        setSnackBarState({
            open: open,
            message: message,
            severity: severity
        })
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarState({
            open: false,
            message: '',
            severity: 'success'
        });
    };

    const toggleEditDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setEditState({...editState, [anchor]: open});
    };

    const [stockState, setStockState] = useState({
        right: false,
    });

    const toggleStockDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setStockState({...stockState, [anchor]: open});
    };

    return (
        <div className={styles.prodcut}>
            <Snackbar open={snackBarState.open} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity={snackBarState.severity}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackBarState.message}
                </Alert>
            </Snackbar>
            <Grid2
                container
                borderBottom={1}
                alignItems={"center"}
                height={"150px"}
            >
                <Grid2 item size={2} className={styles.col} borderLeft={1} overflow={'hidden'}>
                    <Box></Box>
                    <img className={styles.productImage} key={image_key} src={image} alt={'product media'}/>
                </Grid2>
                <Grid2 item size={3} className={styles.col}>
                    <Typography className={styles.details}>
                        {name}
                    </Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>${price_per_item}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>{items_per_unit}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>{price_per_item * items_per_unit}</Typography>
                </Grid2>
                <Grid2 item size={1} className={styles.col}>
                    <Typography className={styles.details}>{stock}</Typography>
                </Grid2>
                <Grid2 item size={3}>
                    <Drawer
                        anchor={"right"}
                        open={editState["right"]}
                        onClose={toggleEditDrawer("right", false)}
                    >
                        {EditList("right", price_per_item, items_per_unit, name, image, image_key, toggleEditDrawer, setEditState, product_id, products, setProducts, token, handleSnackBarState)}
                    </Drawer>
                    <Drawer
                        anchor={"right"}
                        open={stockState["right"]}
                        onClose={toggleStockDrawer("right", false)}
                    >
                        {StockList("right", stock, product_id, products, setProducts, token, toggleStockDrawer, setStockState, handleSnackBarState)}
                    </Drawer>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={3}
                    >
                        <Button
                            variant="contained"
                            onClick={toggleEditDrawer("right", true, true)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={toggleStockDrawer("right", true, true)}
                        >
                            Refill Stock
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </div>
    );
}

function StockList(anchor, currentStock, product_id, products, setProducts, token, toggleStockDrawer, setStockState, handleSnackBarState) {
    async function handleRefillStock(e) {
        e.preventDefault();
        try {
            const data = {
                product_id: product_id,
                updated_stock: e.target[0].value
            }

            await axios.put(
                "http://localhost:8080/products/updateStock",
                data,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            let updated = products.map((prod) => {
                if (prod.id === product_id)
                    return prod = {
                        ...prod,
                        num_units_available: e.target[0].value
                    }
                else return prod;
            })
            setProducts(updated);
            setStockState({right: false})
            handleSnackBarState(true, 'Stock updated successfully!', 'success');
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleChange(e) {
        if (e.target.value < 0) e.target.value = 0
    }

    return (<Box
        width={500}
        role="presentation"
        onKeyDown={toggleStockDrawer("right", false)}
        p={3}
        className={styles.newProd}
    >
        <Typography
            sx={{cursor: "pointer"}}
            onClick={toggleStockDrawer("right", false, true)}
            variant="h3"

            textAlign={"right"}
        >
            X
        </Typography>
        <form onSubmit={(e) => handleRefillStock(e)}>
            <List>
                {/* TODO: Map field variables passed in for individual product */}
                {/* TODO: Assign values for for inputs to state, onchange update state, onSubmit update product */}
                <ListItem>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        minWidth={"100%"}
                        gap={3}
                    >
                        <Typography variant="h5">Product Name</Typography>
                        <Grid2 container>
                            <Grid2 item size={6}>
                                <Typography variant="h6" fontWeight={600}>
                                    Current Stock:
                                </Typography>
                            </Grid2>
                            <Grid2
                                item
                                size={6}
                                display={"flex"}
                                justifyContent={"flex-end"}
                            >
                                <Typography>{currentStock}</Typography>
                            </Grid2>
                            <Grid2 item size={6}>
                                <Typography variant="h6" fontWeight={600}>
                                    Updated Stock:
                                </Typography>
                            </Grid2>
                            <Grid2
                                item
                                size={6}
                                display={"flex"}
                                justifyContent={"flex-end"}
                            >
                                <Input type={"number"} placeholder={"Enter new stock..."}
                                       onChange={(e) => handleChange(e)}
                                       className={styles.passwordInput}/>
                            </Grid2>
                        </Grid2>
                    </Box>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <Grid2 container width={"100%"}>
                        <Grid2
                            item
                            size={12}
                            justifyContent={"center"}
                            display={"flex"}
                        >
                            <Button variant="contained" type={'submit'}>Update</Button>
                        </Grid2>
                    </Grid2>
                </ListItem>
            </List>
        </form>
    </Box>)
};


function EditList(anchor, pricePerItem, itemsPerUnit, name, image, image_key, toggleEditDrawer, setEditState, product_id, products, setProducts, token, handleSnackBarState) {
    async function handleUpdateProduct(e) {
        e.preventDefault();
        const form = e.target;
        try {
            const formData = new FormData();
            let offset = 1
            if (form[1].files) {
                formData.append('file', form[1].files[0]);
                offset = 0;
            }

            formData.append('name', form[2 - offset].value);
            formData.append('price_per_product', form[3 - offset].value);
            formData.append('num_products_per_unit', form[4 - offset].value);
            formData.append('product_id', product_id);
            formData.append('old_image_key', image_key);
            formData.append('old_image_link', image);

            let updatedProduct = await axios.post(
                "http://localhost:8080/products/updateProduct",
                formData,
                {
                    headers: {
                        Authorization: token,
                        "content-type": "multipart/form-data",
                    },
                }
            );
            let updated = products.map((prod) => {
                if (prod.id === product_id)
                    return prod = updatedProduct.data[0];
                else return prod;
            })
            setProducts(updated);
            setEditState({'right': false})
            handleSnackBarState(true, 'Product updated successfully!', 'success')
        } catch (error) {
            console.log(error.message)
        }
    }

    const [imagePreview, setImagePreview] = useState(image);

    function handleImageChange(e) {
        e.preventDefault();
        if (e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        else setImagePreview(image);
    }

    function handleCancle() {
        setImagePreview(image);
        const file =
            document.querySelector('#preview');
        file.value = '';
    }

    return (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleEditDrawer(anchor, false)}
            p={3}
            className={styles.newProd}
        >
            <Typography
                sx={{cursor: "pointer"}}
                onClick={toggleEditDrawer(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
            <form onSubmit={(e) => handleUpdateProduct(e)}>
                <List>
                    {/* TODO: Map field variables passed in for individual product */}
                    {/* TODO: Assign values for for inputs to state, onchange update state, onSubmit update product */}
                    <ListItem>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            flexDirection={"column"}
                            minWidth={"100%"}
                        >
                            <Box>
                                <img src={imagePreview} key={image_key} alt={'blah'}
                                     className={styles.productImage}/>
                                {imagePreview !== image ?
                                    <Button onClick={handleCancle}>Cancel</Button> : null}
                            </Box>
                            <Box width={"100%"}>
                                <Grid2 container spacing={2}>
                                    <Grid2 borderBottom={1} item size={6}>
                                        <Typography variant="h6" fontWeight={600}>
                                            Product image:
                                        </Typography>
                                    </Grid2>
                                    <Grid2
                                        item
                                        size={6}
                                        display={"flex"}
                                        justifyContent={"flex-end"}
                                        alignItems={"center"}
                                    >
                                        <input className={styles.passwordInput}
                                               type={"file"} accept={'image/*'}
                                               id={'preview'}
                                               onChange={(e) => handleImageChange(e)}/>
                                    </Grid2>
                                    <Grid2 borderBottom={1} item size={6}>
                                        <Typography variant="h6" fontWeight={600}>
                                            Product name:
                                        </Typography>
                                    </Grid2>
                                    <Grid2
                                        item
                                        size={6}
                                        display={"flex"}
                                        justifyContent={"flex-end"}
                                    >
                                        <Input className={styles.passwordInput}
                                               defaultValue={name}
                                        />
                                    </Grid2>
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
                                    >
                                        <Input className={styles.passwordInput} defaultValue={pricePerItem}/>
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
                                    >
                                        <Input className={styles.passwordInput} defaultValue={itemsPerUnit}/>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </Box>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem>
                        <Grid2 container width={"100%"}>
                            <Grid2
                                item
                                size={12}
                                justifyContent={"center"}
                                display={"flex"}
                            >
                                <Button variant="contained" type={'submit'}>Update</Button>
                            </Grid2>
                        </Grid2>
                    </ListItem>
                </List>
            </form>
        </Box>
    )
}

export default Products;

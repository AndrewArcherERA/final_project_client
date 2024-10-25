import {useEffect, useRef, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import styles from "../dashboardStyles.module.scss";
import {
    Box,
    Button,
    Divider,
    Drawer, FormControl,
    Grid2,
    Input, InputLabel,
    List,
    ListItem, MenuItem, Select,
    Typography,
} from "@mui/material";
import {IoPersonCircleSharp} from "react-icons/io5";
import {useSelector} from "react-redux";
import Modal from "@mui/material/Modal";
import {useDispatch} from "react-redux";
import axios from "axios";
import bcrypt from "bcryptjs";
import {updateUserInfo} from "../../features/user/userSlice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {MdOutlineExpandMore} from "react-icons/md";
import {logout} from "../../features/user/userSlice";
import {FaCartFlatbed} from "react-icons/fa6";
import {deleteCartItem, test, updateQuantity} from '../../features/user/cartSlice';
import {getCartItems} from "../../features/user/cartSlice";
import {grey} from "@mui/material/colors";

function ConsumerDashboard() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        right: false,
    });
    const [cartState, setCartState] = useState({
        right: false,
    });
    const [checkoutState, setCheckoutState] = useState({
        right: false,
    });
    const [stores, setStores] = useState([]);
    const [warehouse, setWarehouse] = useState();
    const [deliveryLocation, setDeliveryLocation] = useState({});
    const [location, setLocation] = useState('');

    //State to handle open/close of modals/drawers
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [infoModal, setInfoModal] = useState(false);
    const handleOpenInfo = () => setInfoModal(true);
    const handleCloseInfo = () => setInfoModal(false);
    const [newLocationModal, setNewLocationModal] = useState(false);
    const handleOpenNewLocation = () => setNewLocationModal(true);
    const handleCloseNewLocation = () => setNewLocationModal(false);
    const {company_name, f_name, l_name, email, phone, id, token} =
        useSelector((state) => state.user.data);
    const {type} = useSelector((state) => state.user);
    const items = useSelector(state => state.cart.items);
    let mutable = items;

    //State to handle updating user info form
    const [firstName, setFirstName] = useState(f_name);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const [lastName, setLastName] = useState(l_name);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const [userEmail, setEmail] = useState(email);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const [userPhone, setPhone] = useState(phone);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const [userComapany, setUserCompany] = useState(company_name);
    const handleCompanyChange = (e) => setUserCompany(e.target.value);

    // State for editing warehouse
    const [warehouseName, setWarehouseName] = useState();
    const handleWarehouseName = (e) => setWarehouseName(e.target.value);
    const [lstreet, setStreet] = useState();
    const handleStreet = (e) => setStreet(e.target.value);
    const [lcity, setcity] = useState();
    const handleCity = (e) => setcity(e.target.value);
    const [lstate, setstate] = useState();
    const handleState = (e) => setstate(e.target.value);
    const [lzip, setzip] = useState();
    const handleZip = (e) => setzip(e.target.value);

    const [createWarehouseModal, setCreateWarehouseModal] = useState(false);
    const handleOpenCreateWarehouseModal = () => setCreateWarehouseModal(true);
    const handleCloseCreateWarehouseModal = () =>
        setCreateWarehouseModal(false);
    const [updateWarehouseModal, setUpdateWarehouseModal] = useState(false);
    const handleOpenUpdateWarehouseModal = () => setUpdateWarehouseModal(true);
    const handleCloseUpdateWarehouseModal = () =>
        setUpdateWarehouseModal(false);

    async function getStores() {
        const config = {
            headers: {Authorization: token},
        };
        const url = `http://localhost:8080/consumerStore/getStores/${id}`;
        let response = await axios.get(url, config);
        setStores(response.data);
    }

    async function handleCreateStore(e) {
        e.preventDefault();
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(e.target[8].value, salt);
        const config = {
            headers: {Authorization: token},
        };
        const body = {
            store: {
                consumer_id: id,
                store_name: e.target[0].value,
                street_address: e.target[1].value,
                city: e.target[2].value,
                state: e.target[3].value,
                zip: e.target[4].value,
            },
            manager: {
                f_name: e.target[5].value,
                l_name: e.target[6].value,
                email: e.target[7].value,
                password: pass,
                phone: e.target[9].value,
            },
        };
        const url = `http://localhost:8080/consumerStore/createStore`;
        let response = await axios.post(url, body, config);
        console.log(response.data);
        setStores([...stores, response.data]);
        handleCloseNewLocation();
    }

    async function handleUpdateInfo(e) {
        e.preventDefault();
        const data = {
            f_name: e.target[0].value,
            l_name: e.target[1].value,
            email: e.target[2].value,
            phone: e.target[3].value,
            company_name: e.target[4].value,
            token: token,
            user_type: type,
            userID: id,
        };
        await dispatch(updateUserInfo(data)).then(function () {
            alert("User info updated succesfully");
            handleCloseInfo();
        });
    }

    const toggleDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setState({...state, [anchor]: open});
    };
    const toggleCartDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setCartState({...cartState, [anchor]: open});
    };
    const toggleCheckoutDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setCheckoutState({...checkoutState, [anchor]: open});
        else alert("Please select a delivery location")
    };

    async function handlePasswordChange(e) {
        e.preventDefault();
        const oldPass = e.target[0].value;
        let newPass = e.target[1].value;
        const config = {
            headers: {Authorization: token},
        };

        try {
            const url = `http://localhost:8080/account/getStoredPass/${type}/${id}`;
            let validPass = await axios.get(url, config);

            if (bcrypt.compareSync(oldPass, validPass.data[0].password)) {
                const url = `http://localhost:8080/account/updatePassword`;
                const salt = bcrypt.genSaltSync(10);
                newPass = bcrypt.hashSync(newPass, salt);
                let data = {
                    user_type: type,
                    userID: id,
                    newPass: newPass,
                };

                await axios.put(url, data, config).then(function (res) {
                    alert("Password changed sucsesfully");
                    handleClose();
                });
            } else {
                alert("Old password does not match current stored password");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCreateWarehouse(e) {
        e.preventDefault();
        const config = {
            headers: {Authorization: token},
        };
        const body = {
            consumer_id: id,
            name: e.target[0].value,
            street_address: e.target[1].value,
            city: e.target[2].value,
            state: e.target[3].value,
            zip: e.target[4].value,
        };
        const url = `http://localhost:8080/account/createWarehouse`;
        let response = await axios.post(url, body, config);
        setWarehouse(response.data[0]);
        handleCloseCreateWarehouseModal();
    }

    async function handleUpdateWarehouse(e) {
        e.preventDefault();
        const config = {
            headers: {Authorization: token},
        };
        const body = {
            consumer_id: id,
            name: e.target[0].value,
            street_address: e.target[1].value,
            city: e.target[2].value,
            state: e.target[3].value,
            zip: e.target[4].value,
        };
        const url = `http://localhost:8080/account/updateWarehouse`;
        let response = await axios.post(url, body, config);
        setWarehouse(response.data[0]);
        handleCloseUpdateWarehouseModal();
    }

    async function getWarehouses() {
        const config = {
            headers: {Authorization: token},
        };

        const url = `http://localhost:8080/account/getWarehouses`;
        let response = await axios.get(url, config);
        setWarehouse(response.data[0]);
        setWarehouseName(response.data[0].name);
        setStreet(response.data[0].street_address);
        setcity(response.data[0].city);
        setstate(response.data[0].state);
        setzip(response.data[0].zip);
    }

    async function deleteWarehouse(consumer_id) {
        const config = {
            headers: {Authorization: token},
        };
        const url = `http://localhost:8080/account/deleteWarehouse/${consumer_id}`;
        await axios.delete(url, config);
        setWarehouse();
    }

    const handleLogout = () => dispatch(logout());

    function handleGetCart() {
        dispatch(getCartItems({token: token}))
        setCartState({...state, ['right']: true});
    }

    function handleDeliveryLocation(e) {
        let locationData;
        if (e.target.value === 'warehouse') locationData = {
            data: warehouse,
            type: 'Warehouse'
        };
        else locationData = {
            data: stores[parseInt(e.target.value)].store,
            type: 'Store'
        }
        setLocation(e.target.value);
        setDeliveryLocation(locationData);
    }

    async function handleCheckout() {
        try {
            const config = {
                headers: {
                    Authorization: token
                }
            }
            const url = 'http://localhost:8080/orders/createConsumerOrder';
            const data = {
                locationType: deliveryLocation.type,
                locationID: deliveryLocation.data.id,
                orders: items
            };
            await axios.post(url, data, config).then(() => {
                // dispatch(clearCart());
                setCheckoutState({...checkoutState, ['right']: false});
                setCartState({...checkoutState, ['right']: false});
            });
        } catch (error) {
            console.error(error.message);
        }

    }

    //gets all stores
    useEffect(() => {
        getStores();
        getWarehouses();
    }, []);

    useEffect(() => {
        console.log(deliveryLocation.type)
    }, [deliveryLocation]);


    const accountDrawer = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            p={3}
        >
            <Typography
                sx={{cursor: "pointer"}}
                onClick={toggleDrawer(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
            <List>
                <ListItem>
                    <Typography variant="h4">
                        {f_name} {l_name}
                    </Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Grid2 container rowSpacing={1}>
                        <Grid2 item size={6}>
                            <Typography variant="h6">Email:</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography>{email}</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography variant="h6">Phone:</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography>{phone}</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography variant="h6">Company Name</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography>{company_name}</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Button fullWidth onClick={handleOpen}>
                                Change Password
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.passWordModelBox}>
                                    <form
                                        className={styles.passform}
                                        onSubmit={(e) =>
                                            handlePasswordChange(e)
                                        }
                                    >
                                        <Input
                                            name="oldPass"
                                            color="white"
                                            type="password"
                                            placeholder="Enter old password..."
                                            fullWidth
                                            className={styles.passwordInput}
                                        />
                                        <Input
                                            name="newPass"
                                            type="password"
                                            placeholder="Enter new password..."
                                            fullWidth
                                            className={styles.passwordInput}
                                        />
                                        <Button type="submit">Update</Button>
                                    </form>
                                </Box>
                            </Modal>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Modal
                                open={infoModal}
                                onClose={handleCloseInfo}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.infoModal}>
                                    <form onSubmit={(e) => handleUpdateInfo(e)}>
                                        <Grid2 container rowSpacing={1}>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    First Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={firstName}
                                                    onChange={
                                                        handleFirstNameChange
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Last Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lastName}
                                                    onChange={
                                                        handleLastNameChange
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Email:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={userEmail}
                                                    onChange={handleEmailChange}
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Phone:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={userPhone}
                                                    onChange={handlePhoneChange}
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Company Name
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={userComapany}
                                                    onChange={
                                                        handleCompanyChange
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={12}>
                                                <Button type="submit" fullWidth>
                                                    Confirm Changes
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </form>
                                </Box>
                            </Modal>
                            <Button fullWidth onClick={handleOpenInfo}>
                                Update User Info
                            </Button>
                        </Grid2>
                    </Grid2>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Box width={"100%"}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Modal
                                open={newLocationModal}
                                onClose={handleCloseNewLocation}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.infoModal}>
                                    <form
                                        onSubmit={(e) => handleCreateStore(e)}
                                    >
                                        <Grid2 container rowSpacing={1}>
                                            <Grid2
                                                item
                                                size={12}
                                                borderBottom={1}
                                            >
                                                <Typography variant="h6">
                                                    Location Information
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Location Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Street Address:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    City:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    State:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Zip:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2
                                                item
                                                size={12}
                                                borderBottom={1}
                                            >
                                                <Typography variant="h6">
                                                    Store Manager Account
                                                    Information
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    First Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Last Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Email:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Password:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Phone:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={12}>
                                                <Button type="submit" fullWidth>
                                                    Create Store
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </form>
                                </Box>
                            </Modal>
                            <Typography variant="h5">
                                Store Locations
                            </Typography>
                            <Button onClick={handleOpenNewLocation}>
                                Add Store Location
                            </Button>
                        </Box>
                        {stores.length > 0
                            ? stores.map((store, index) => {
                                return (
                                    <ConsumerStoreAccordian
                                        store_name={store.store.name}
                                        f_name={store.manager.f_name}
                                        l_name={store.manager.l_name}
                                        email={store.manager.email}
                                        phone={store.manager.phone}
                                        street={store.store.street_address}
                                        city={store.store.city}
                                        state={store.store.state}
                                        zip={store.store.zip}
                                        store_id={store.store.id}
                                        employee_id={store.manager.id}
                                        setStores={setStores}
                                        stores={stores}
                                        index={index}
                                        key={index}
                                    />
                                );
                            })
                            : null}
                    </Box>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            width={"100%"}
                        >
                            <Typography variant="h5">Warehouse</Typography>
                            {warehouse ? null : (
                                <Button
                                    onClick={handleOpenCreateWarehouseModal}
                                >
                                    Add Warehouse
                                </Button>
                            )}
                            <Modal
                                open={createWarehouseModal}
                                onClose={handleCloseCreateWarehouseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.infoModal}>
                                    <form
                                        onSubmit={(e) =>
                                            handleCreateWarehouse(e)
                                        }
                                    >
                                        <Grid2 container rowSpacing={1}>
                                            <Grid2
                                                item
                                                size={12}
                                                borderBottom={1}
                                            >
                                                <Typography variant="h6">
                                                    Warehouse Information
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Warehouse Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Street Address:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    City:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    State:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Zip:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text"/>
                                            </Grid2>
                                            <Grid2 item size={12}>
                                                <Button type="submit" fullWidth>
                                                    Create Warehouse
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </form>
                                </Box>
                            </Modal>
                        </Box>
                        <Box>
                            {warehouse ? (
                                <Grid2 container size={12}>
                                    <Grid2 item size={12}>
                                        <Typography variant="h6">
                                            {warehouse.name}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 item size={12}>
                                        <Typography variant="h6">
                                            {warehouse.street_address},{" "}
                                            {warehouse.city} {warehouse.state},{" "}
                                            {warehouse.zip}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 item size={12}>
                                        <Modal
                                            open={updateWarehouseModal}
                                            onClose={
                                                handleCloseUpdateWarehouseModal
                                            }
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            className={styles.passWordModel}
                                        >
                                            <Box className={styles.infoModal}>
                                                <form
                                                    onSubmit={(e) =>
                                                        handleUpdateWarehouse(e)
                                                    }
                                                >
                                                    <Grid2
                                                        container
                                                        rowSpacing={1}
                                                    >
                                                        <Grid2
                                                            item
                                                            size={12}
                                                            borderBottom={1}
                                                        >
                                                            <Typography variant="h6">
                                                                Warehouse
                                                                Information
                                                            </Typography>
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Typography variant="h6">
                                                                Warehouse Name:
                                                            </Typography>
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Input
                                                                fullWidth
                                                                type="text"
                                                                value={warehouseName}
                                                                onChange={(e) => handleWarehouseName(e)}
                                                            />
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Typography variant="h6">
                                                                Street Address:
                                                            </Typography>
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Input
                                                                fullWidth
                                                                type="text"
                                                                value={lstreet}
                                                                onChange={(e) => handleStreet(e)}
                                                            />
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Typography variant="h6">
                                                                City:
                                                            </Typography>
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Input
                                                                fullWidth
                                                                type="text"
                                                                value={lcity}
                                                                onChange={(e) => handleCity(e)}
                                                            />
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Typography variant="h6">
                                                                State:
                                                            </Typography>
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Input
                                                                fullWidth
                                                                type="text"
                                                                value={lstate}
                                                                onChange={(e) => handleState(e)}
                                                            />
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Typography variant="h6">
                                                                Zip:
                                                            </Typography>
                                                        </Grid2>
                                                        <Grid2 item size={6}>
                                                            <Input
                                                                fullWidth
                                                                type="text"
                                                                value={lzip}
                                                                onChange={(e) => handleZip(e)}
                                                            />
                                                        </Grid2>
                                                        <Grid2 item size={12}>
                                                            <Button
                                                                type="submit"
                                                                fullWidth
                                                            >
                                                                Update Warehouse
                                                            </Button>
                                                        </Grid2>
                                                    </Grid2>
                                                </form>
                                            </Box>
                                        </Modal>
                                        <Button onClick={handleOpenUpdateWarehouseModal}>Update</Button>
                                        <Button
                                            color="error"
                                            onClick={() => deleteWarehouse(id)}
                                        >
                                            Delete
                                        </Button>
                                    </Grid2>
                                </Grid2>
                            ) : null}
                        </Box>
                    </Box>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Button fullWidth color="error" onClick={handleLogout}>Logout</Button>
                </ListItem>
                <Divider/>
            </List>
        </Box>
    );

    const checkoutDrawer = (anchor) => {
        let totalPrice = 0;
        items.forEach((item) => totalPrice += (item.price_per_product * item.num_products_per_unit) * item.quantity);
        return (
            <Box
                width={500}
                role="presentation"
                onKeyDown={toggleCheckoutDrawer(anchor, false)}
                p={3}
            >
                <Typography sx={{cursor: "pointer"}} onClick={toggleCheckoutDrawer(anchor, false, true)} variant="h3"
                            textAlign='right'>X</Typography>
                <List>
                    <ListItem>

                        <Box display={'flex'} flexDirection={"column"} gap={2} width={'100%'}>
                            <Typography borderBottom={3} variant={'h4'}>Order</Typography>
                            {items.map((item) => {
                                const unitPrice = item.price_per_product * item.num_products_per_unit;
                                return <Box key={item.id} display={'flex'} justifyContent={'space-between'} gap={2}
                                            alignItems={'center'}>
                                    <Typography variant='h5'>
                                        {item?.name}
                                    </Typography>
                                    <Typography variant='h6'
                                                textAlign={'right'}> ${unitPrice} X {item.quantity} </Typography>
                                </Box>
                            })}
                        </Box>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Box>
                            <Box display={"flex"} gap={2} alignItems={'center'}>
                                <Typography variant={'h5'}>{deliveryLocation?.type} delivery location:</Typography>
                                <Typography variant={'h6'}>{deliveryLocation.data?.name}</Typography>
                            </Box>
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <Typography variant={'h5'}>Address:</Typography>
                                <Typography
                                    variant={'h6'}>{deliveryLocation?.data?.street_address} {deliveryLocation?.data?.city} {deliveryLocation?.data?.state} {deliveryLocation?.data?.zip}</Typography>
                            </Box>

                        </Box>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Box display={'flex'} flexDirection={"column"} gap={2} width={'100%'}>
                            <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'}>
                                <Typography variant='h5'>Total Price:</Typography>
                                <Typography variant='h6' textAlign={'right'}>${totalPrice}</Typography>
                            </Box>
                        </Box>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Box display={'flex'} flexDirection={"column"} gap={2} width={'100%'}>
                            <Button variant={'contained'} onClick={handleCheckout}>Confirm Order</Button>
                        </Box>
                    </ListItem>
                </List>
            </Box>
        )
    }

    const cartDrawer = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleCartDrawer(anchor, false)}
            p={3}
        >
            <Typography sx={{cursor: "pointer"}} onClick={toggleCartDrawer(anchor, false, true)} variant="h3"
                        textAlign='right'>X</Typography>
            <List>
                <Typography variant='h4' borderBottom={2}>Cart</Typography>
                <ListItem>
                    <div className={styles.cartItems}>
                        {mutable ? mutable.map((item) => {
                            return (
                                <CartItem itemName={item.name} quantity={item.quantity}
                                          unitPrice={item.price_per_product * item.num_products_per_unit}
                                          prodID={item.id} image_link={item.image_link}/>
                            )
                        }) : null}
                    </div>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    {items.length > 0 ? (
                        <Grid2 container spacing={2} width='100%' alignItems={"center"}>
                            <Grid2 item size={5} justifyContent={"center"} display={"flex"}>
                                <Typography variant='h6'>Delivery Location:</Typography>
                            </Grid2>
                            <Grid2 item size={6} justifyContent={"center"} display={"flex"}>
                                <FormControl variant='standard' sx={{minWidth: '100%'}}>
                                    <InputLabel>
                                        Delivery Location
                                    </InputLabel>
                                    <Select fullWidth variant='outlined' value={location} label={'Location'}
                                            onChange={(e) => handleDeliveryLocation(e)}>
                                        {/*Map warehouse && store locations*/}
                                        <MenuItem value={'warehouse'}>
                                            Warehouse
                                        </MenuItem>
                                        {stores.map((store, index) => {
                                            return (<MenuItem key={index} value={index}>
                                                {store.store.name}
                                            </MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 item size={12} justifyContent={"center"} display={"flex"}>
                                <Drawer
                                    anchor={"right"}
                                    open={checkoutState["right"]}
                                    onClose={toggleCheckoutDrawer("right", false)}
                                >
                                    {checkoutDrawer("right")}
                                </Drawer>
                                <Button variant="contained" disabled={!deliveryLocation.type}
                                        onClick={toggleCheckoutDrawer(anchor, true, true)}
                                        fullWidth>{deliveryLocation.type ? "Checkout" : "Select delivery location"}</Button>
                            </Grid2>
                        </Grid2>
                    ) : null}
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Box>
            <Grid2 container px={3} py={1} borderBottom={2}>
                <Grid2 item size={2}>
                    <Typography variant="h4">{company_name}</Typography>
                </Grid2>
                <Grid2 item size={8}>
                    <nav className={styles.nav}>
                        <Link to={""} className={styles.link}>
                            <Typography variant="h6">Inventory</Typography>
                        </Link>
                        <Link to={"suppliers"} className={styles.link}>
                            <Typography variant="h6">Suppliers</Typography>
                        </Link>
                        <Link to={"messages"} className={styles.link}>
                            <Typography variant="h6">Messages</Typography>
                        </Link>
                        <Link to={"orders"} className={styles.link}>
                            <Typography variant="h6" cal>
                                Orders
                            </Typography>
                        </Link>
                    </nav>
                </Grid2>
                <Grid2 item size={2}>
                    <nav className={styles.navicons}>
                        <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}
                        >
                            {accountDrawer("right")}
                        </Drawer>
                        <Drawer
                            anchor={"right"}
                            open={cartState["right"]}
                            onClose={toggleCartDrawer("right", false)}
                        >
                            {cartDrawer("right")}
                        </Drawer>
                        <Typography variant="h6" className={styles.link}>
                            <FaCartFlatbed
                                onClick={handleGetCart}
                                size={35}
                            />
                        </Typography>
                        <Typography variant="h6" className={styles.link}>
                            <IoPersonCircleSharp
                                onClick={toggleDrawer("right", true, true)}
                                size={35}
                            />
                        </Typography>
                    </nav>
                </Grid2>
            </Grid2>
            <Box
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                className={styles.outletWrapper}
            >
                <Outlet/>
            </Box>
        </Box>
    );
}

function ConsumerStoreAccordian({
                                    store_name,
                                    f_name,
                                    l_name,
                                    email,
                                    phone,
                                    street,
                                    city,
                                    state,
                                    zip,
                                    store_id,
                                    employee_id,
                                    setStores,
                                    index,
                                    stores,
                                }) {
    const {token} = useSelector((state) => state.user.data);
    const [lstoreName, setStoreName] = useState(store_name);
    const handleStoreName = (e) => setStoreName(e.target.value);
    const [lf_name, setf_name] = useState(f_name);
    const handlefname = (e) => setf_name(e.target.value);
    const [ll_name, setl_name] = useState(l_name);
    const handlelname = (e) => setl_name(e.target.value);
    const [lemail, setemail] = useState(email);
    const handleemail = (e) => setemail(e.target.value);
    const [lphone, setphone] = useState(phone);
    const handlephone = (e) => setphone(e.target.value);
    const [lstreet, setStreet] = useState(street);
    const handleStreet = (e) => setStreet(e.target.value);
    const [lcity, setcity] = useState(city);
    const handleCity = (e) => setcity(e.target.value);
    const [lstate, setstate] = useState(state);
    const handleState = (e) => setstate(e.target.value);
    const [lzip, setzip] = useState(zip);
    const handleZip = (e) => setzip(e.target.value);
    const [pass, setPassword] = useState();
    const handlePass = (e) => setPassword(e.target.value);

    const [updateLocationModal, setupdateLocationModal] = useState(false);
    const handleOpenupdateLocation = () => setupdateLocationModal(true);
    const handleCloseupdateLocation = () => setupdateLocationModal(false);

    async function handleUpdateLocation(e) {
        e.preventDefault();
        try {
            const salt = bcrypt.genSaltSync(10);
            const pass = bcrypt.hashSync(e.target[8].value, salt);
            const config = {
                headers: {Authorization: token},
            };
            const body = {
                store: {
                    id: store_id,
                    store_name: e.target[0].value,
                    street_address: e.target[1].value,
                    city: e.target[2].value,
                    state: e.target[3].value,
                    zip: e.target[4].value,
                },
                manager: {
                    id: employee_id,
                    f_name: e.target[5].value,
                    l_name: e.target[6].value,
                    email: e.target[7].value,
                    password: pass,
                    phone: e.target[9].value,
                },
            };
            const url = `http://localhost:8080/consumerStore/updateStore`;
            let response = await axios.post(url, body, config);
            let updated = [...stores];
            let shaped = {
                store: response.data.store[0],
                manager: response.data.manager[0],
            };
            updated[index] = shaped;
            setStores([...updated]);
            handleCloseupdateLocation();
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleDeleteLocation() {
        try {
            const config = {
                headers: {Authorization: token},
                data: {
                    store_id: store_id,
                    employee_id: employee_id,
                },
            };

            const url = `http://localhost:8080/consumerStore/deleteStore`;
            await axios.delete(url, config);
            let updated = [...stores];
            updated.splice(index, 1);
            setStores([...updated]);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Accordion key={store_id}>
            <AccordionSummary
                expandIcon={<MdOutlineExpandMore/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography variant="h6">{store_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid2 container>
                    <Grid2 item size={6}>
                        <Typography>Store Manager:</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>
                            {f_name} {l_name}
                        </Typography>
                    </Grid2>
                    <Grid2 item size={6}></Grid2>
                    <Grid2 item size={6}>
                        <Typography>{email}</Typography>
                    </Grid2>
                    <Grid2 item size={6}></Grid2>
                    <Grid2 item size={6}>
                        <Typography>{phone}</Typography>
                    </Grid2>
                    <Grid2 item size={12} my={1} borderBottom={1}>
                        <Typography>Address</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>Street:</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>{street}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>City:</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>{city}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>State:</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>{state}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>Zip:</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Typography>{zip}</Typography>
                    </Grid2>
                    <Grid2 item size={12} mt={1}>
                        <Box display={"flex"}>
                            <Modal
                                open={updateLocationModal}
                                onClose={handleCloseupdateLocation}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.infoModal}>
                                    <form
                                        onSubmit={(e) =>
                                            handleUpdateLocation(e)
                                        }
                                    >
                                        <Grid2 container rowSpacing={1}>
                                            <Grid2
                                                item
                                                size={12}
                                                borderBottom={1}
                                            >
                                                <Typography variant="h6">
                                                    Location Information
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Location Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lstoreName}
                                                    onChange={(e) =>
                                                        handleStoreName(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Street Address:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lstreet}
                                                    onChange={(e) =>
                                                        handleStreet(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    City:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lcity}
                                                    onChange={(e) =>
                                                        handleCity(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    State:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lstate}
                                                    onChange={(e) =>
                                                        handleState(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Zip:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lzip}
                                                    onChange={(e) =>
                                                        handleZip(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2
                                                item
                                                size={12}
                                                borderBottom={1}
                                            >
                                                <Typography variant="h6">
                                                    Store Manager Account
                                                    Information
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    First Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lf_name}
                                                    onChange={(e) =>
                                                        handlefname(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Last Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={ll_name}
                                                    onChange={(e) =>
                                                        handlelname(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Email:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lemail}
                                                    onChange={(e) =>
                                                        handleemail(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Password:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={pass}
                                                    onChange={(e) =>
                                                        handlePass(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Phone:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lphone}
                                                    onChange={(e) =>
                                                        handlephone(e)
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={12}>
                                                <Button type="submit" fullWidth>
                                                    Update Store
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </form>
                                </Box>
                            </Modal>
                            <Button
                                fullWidth
                                onClick={handleOpenupdateLocation}
                            >
                                Update Location Info
                            </Button>
                            <Button
                                fullWidth
                                color="error"
                                onClick={handleDeleteLocation}
                            >
                                Delete Location
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </AccordionDetails>
        </Accordion>
    );
}

function CartItem({itemName, quantity, unitPrice, prodID, image_link}) {
    const [adjustableQuantity, setAdjustableQuantity] = useState(quantity);
    const [price, setPrice] = useState(quantity * unitPrice);
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.data.token)

    function handleInput(e) {
        if (e.target.value < 0) e.target.value = 0;
        setAdjustableQuantity(e.target.value);
        dispatch(updateQuantity({token: token, productID: prodID, quantity: parseInt(e.target.value)}));
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        setPrice(adjustableQuantity * unitPrice)
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
    }, [adjustableQuantity]);

    return (
        <div key={prodID} className={styles.cartItem}>
            <Typography sx={{cursor: "pointer"}}
                        onClick={() => dispatch(deleteCartItem({productID: prodID, token: token}))}
                        variant="h5"
                        textAlign='right'
                        fontWeight={600}
                        paddingRight={2}
                        pb={1}>X</Typography>
            <Grid2 container width={'100%'} alignItems={"center"}>
                <Grid2 item size={12}>
                    <img className={styles.cartImage} src={image_link} alt={'product image'}/>
                </Grid2>
                <Grid2 item size={6} textAlign={'center'}>
                    <Typography variant={'h5'}>{itemName}</Typography>
                </Grid2>
                <Grid2 item size={6} justifyContent={"center"}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Typography>Quantity: </Typography>
                        <Input type={'number'} onChange={handleInput}
                               defaultValue={quantity}/>
                    </Box>
                    <div>
                        <Typography borderBottom={1}>Price: ${price}</Typography>
                    </div>
                </Grid2>
            </Grid2>
        </div>)
}

export default ConsumerDashboard;

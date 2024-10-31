import {
    Box,
    Divider,
    Drawer,
    Grid2,
    Input,
    List,
    ListItem,
    Typography,
    Button,
    Modal, Alert,
} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link, Outlet} from "react-router-dom";
import styles from "../dashboardStyles.module.scss";
import {IoPersonCircleSharp} from "react-icons/io5";
import axios from "axios";
import bcrypt from "bcryptjs";
import {useDispatch} from "react-redux";
import {updateUserInfo} from "../../features/user/userSlice";
import {logout} from "../../features/user/userSlice";
import Snackbar from "@mui/material/Snackbar";

function SupplierDashboard() {
    const [state, setState] = useState({
        right: false,
    });
    const {company_name, f_name, l_name, email, phone, id, token} =
        useSelector((state) => state.user.data);
    const {type} = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [infoModal, setInfoModal] = useState(false);
    const handleOpenInfo = () => setInfoModal(true);
    const handleCloseInfo = () => setInfoModal(false);

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
    const dispatch = useDispatch();

    const toggleDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setState({...state, [anchor]: open});
    };

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
            handleSnackBarState(true, 'User info updated succesfully', 'success');
            handleCloseInfo();
        });
    }

    async function handlePasswordChange(e) {
        e.preventDefault();
        const oldPass = e.target[0].value;
        let newPass = e.target[1].value;
        const config = {
            headers: {Authorization: token},
        };

        try {
            const url = `http://final-project.us-east-1.elasticbeanstalk.com/account/getStoredPass/${type}/${id}`;
            let validPass = await axios.get(url, config);

            if (bcrypt.compareSync(oldPass, validPass.data[0].password)) {
                const url = `http://final-project.us-east-1.elasticbeanstalk.com/account/updatePassword`;
                const salt = bcrypt.genSaltSync(10);
                newPass = bcrypt.hashSync(newPass, salt);
                let data = {
                    user_type: type,
                    userID: id,
                    newPass: newPass,
                };

                await axios.put(url, data, config).then(function (res) {
                    handleSnackBarState(true, 'Password changed sucsesfully', 'success');
                    handleClose();
                });
            } else {
                handleSnackBarState(true, 'Old password does not match current stored password', 'error')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => dispatch(logout());

    // TODO: Pass in data for fields (product name, individual/unit price, numPerUnit, NumUnitsAvail, image)
    const accountDrawer = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            p={3}
            className={styles.drawer}
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
                <ListItem sx={{backgroundColor: '#001539', borderRadius: '10px'}}>
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
                                                    className={styles.passwordInput}
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
                                                    className={styles.passwordInput}
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
                                                    className={styles.passwordInput}
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
                                                    className={styles.passwordInput}
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
                                                    className={styles.passwordInput}
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
                    <Button fullWidth color="error" variant={'contained'} onClick={handleLogout}>
                        Logout
                    </Button>
                </ListItem>
                <Divider/>
            </List>
        </Box>
    );

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

    return (
        <Box className={styles.dashboardBGC}>
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
            <Grid2 container className={styles.navWrapper}>
                <Grid2 item size={2}>
                    <Typography variant="h4">{company_name}</Typography>
                </Grid2>
                <Grid2 item size={10} alignItems={"flex-end"}>
                    <nav className={styles.navicons}>
                        <Link to={""} className={styles.link}>
                            <Typography variant="h5">Products</Typography>
                        </Link>
                        <Link to={"orders"} className={styles.link}>
                            <Typography variant="h5">Orders</Typography>
                        </Link>
                        <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}
                        >
                            {accountDrawer("right")}
                        </Drawer>
                        <Typography onClick={toggleDrawer("right", true, true)} variant="h5" className={styles.link}>
                            Account
                        </Typography>
                    </nav>
                </Grid2>
            </Grid2>
            <Outlet/>
        </Box>
    );
}

export default SupplierDashboard;

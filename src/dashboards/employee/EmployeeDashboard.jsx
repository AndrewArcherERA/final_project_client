import {Box, Button, Divider, Drawer, Grid2, List, ListItem, Typography} from "@mui/material";
import React, {useState} from "react";
import {Link, Outlet} from "react-router-dom";
import styles from "../dashboardStyles.module.scss";
import {IoPersonCircleSharp} from "react-icons/io5";
import {useSelector} from "react-redux";
import {logout} from "../../features/user/userSlice";
import {useDispatch} from "react-redux";

function EmployeeDashboard() {
    const [state, setState] = useState({
        right: false,
    });
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => dispatch(logout());

    const toggleDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setState({...state, [anchor]: open});
    };

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
                    <div>
                        <Typography variant={'h5'}>{user.data.company_name}</Typography>
                        <Typography variant={'h6'}>{user.data.storeName}</Typography>
                        <div>
                            <Typography>{user.data.street_address} {user.data.city} {user.data.state} {user.data.zip}</Typography>
                        </div>
                    </div>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Box>
                        <Typography>{user.data.f_name} {user.data.l_name}</Typography>
                        <Typography>{user.data.email}</Typography>
                        <Typography>{user.data.phone}</Typography>
                    </Box>
                </ListItem>
                <Divider/>
                <Button fullWidth color="error" onClick={handleLogout}>
                    Logout
                </Button>
                <Divider/>
            </List>
        </Box>
    );
    return (
        <>
            <Grid2 container px={3} py={1} borderBottom={2}>
                <Grid2 item size={3}>
                    <Typography variant={'h4'}>{user.data.company_name}</Typography>
                    <Typography variant={'h5'}>{user.data.storeName}</Typography>
                </Grid2>
                <Grid2 item size={7}>
                    <nav className={styles.nav}>
                        <Link to={""} className={styles.link}>
                            <Typography variant="h6">Inventory</Typography>
                        </Link>
                        <Link to={"messages"} className={styles.link}>
                            <Typography variant="h6">Messages</Typography>
                        </Link>
                        <Link to={"orders"} className={styles.link}>
                            <Typography variant="h6">Orders</Typography>
                        </Link>
                    </nav>
                </Grid2>
                <Grid2 item size={2}>
                    <nav className={styles.navicons}>
                        {/* <Link to={"cart"} className={styles.link}>
                            <Typography variant="h6">
                                <FaShoppingCart size={30} />
                            </Typography>
                        </Link> */}
                        <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}
                        >
                            {accountDrawer("right")}
                        </Drawer>
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
        </>
    );
}

export default EmployeeDashboard;

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Box, Button, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import styles from "./signIn.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {signInUser} from "../../features/user/userSlice";
import bgImage from '../../images/AdobeStock_321288298.jpg'
import Snackbar from "@mui/material/Snackbar";

function SignIn() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("consumer");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
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

    function handleUserTypeChange(e) {
        setUserType(e.target.value);
    }

    async function handleSignIn(e) {
        e.preventDefault();
        const data = {
            email: e.target[0].value,
            password: e.target[1].value,
            user_type: userType,
        };
        await dispatch(signInUser(data)).then((res) => {
            if (res.payload.error === 'Request failed with status code 401')
                return handleSnackBarState(true, 'Wrong email or password', 'error');
        });
    }

    useEffect(() => {
        if (user.type) {
            switch (user.type) {
                case "consumer":
                    navigate("/consumerDashboard");
                    break;
                case "supplier":
                    navigate("/supplierDashboard");
                    break;
                case "employee":
                    navigate("/employeeDashboard");
                    break;
            }
        }
    }, [user]);

    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
            className={styles.main}
        >
            <Snackbar open={snackBarState.open} autoHideDuration={6000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity={snackBarState.severity}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackBarState.message}
                </Alert>
            </Snackbar>
            <Box className={styles.bgPhoto} p={8} sx={{backgroundImage: `url(${bgImage})`}}>
                <Box width={"500px"} maxHeight={"fit-content"} className={styles.container}>
                    <Typography variant={'h4'} className={styles.heading}>Welcome to Arrow Supplies!</Typography>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"column"}
                    >
                        <div className={styles.selectContainer}>
                            <ToggleButtonGroup
                                color="primary"
                                value={userType}
                                exclusive
                                onChange={handleUserTypeChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value="consumer">Consumer</ToggleButton>
                                <ToggleButton value="supplier">Supplier</ToggleButton>
                                <ToggleButton value="employee">Employee</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <form
                            className={styles.form}
                            onSubmit={(e) => handleSignIn(e)}
                        >
                            <Typography variant={'h6'}>Email</Typography>
                            <input
                                className="input"
                                id="email"
                                type="email"
                                placeholder="Enter email..."
                            />
                            <Typography variant={'h6'}>Password</Typography>
                            <input
                                className="input"
                                id="pass"
                                type="password"
                                placeholder="Enter password..."
                            />
                            <Button type="submit" color={'success'} variant={'contained'}>Login</Button>
                            <Button onClick={() => navigate("/signUp")}>
                                Create new account
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}

export default SignIn;

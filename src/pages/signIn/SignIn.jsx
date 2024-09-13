import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import styles from "./signIn.module.scss";

function SignIn() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("consumer");

    function handleUserTypeChange(e) {
        setUserType(e.target.value);
    }

    function handleSignIn() {
        navigate("")
        // dispatch(signIn(auth));
    }
    // TODO: implement state to track user type that is signing in to navigate to correct dashboard
    // useEffect(() => {
    //     if (data) navigate("");
    // }, [data]);

    // TODO: Add employee sign in slot
    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"80vh"}
            flexDirection={"column"}
        >
            <Box width={"500px"}>
                <h1 className={styles.heading}>Welcome!</h1>
                <h3 className={styles.heading}>Please sign-in</h3>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>

                    <ToggleButtonGroup
                        color="primary"
                        value={userType}
                        exclusive
                        onChange={handleUserTypeChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="consumer">Consumer</ToggleButton>
                        <ToggleButton value="supplier">Supplier</ToggleButton>
                    </ToggleButtonGroup>

                    <form className={styles.form}>
                        <label htmlFor="#email">Email</label>
                        <input
                            className="input"
                            id="email"
                            type="email"
                            placeholder="Enter email..."
                        />
                        <label htmlFor="#pass">Password</label>
                        <input
                            className="input"
                            id="pass"
                            type="password"
                            placeholder="Enter password..."
                        />
                        <Button onClick={handleSignIn}>Login</Button>
                    </form>
                </Box>
            </Box>
            <Button onClick={() => navigate("/signUp")}>
                Create new account
            </Button>
        </Box>
    );
}

export default SignIn;

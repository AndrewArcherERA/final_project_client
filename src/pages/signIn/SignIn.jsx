import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input } from "@mui/material";
import styles from "./signIn.module.scss";

function SignIn() {
    const navigate = useNavigate();

    function handleSignIn() {
        // dispatch(signIn(auth));
    }
    // TODO: implement state to track user type that is signing in to navigate to correct dashboard
    // useEffect(() => {
    //     if (data) navigate("");
    // }, [data]);
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

                <form className={styles.form}>
                    <label htmlFor="#email">Email</label>
                    <input className="input" id="email" type="text" placeholder="Enter email..." />
                    <label htmlFor="#pass">Password</label>
                    <input className="input" id="pass" type="password" placeholder="Enter password..." />
                    <Button onClick={handleSignIn}>Login</Button>
                </form>
            </Box>

            <Button onClick={() => navigate("/signUp")}>Create new account</Button>
        </Box>
    );
}

export default SignIn;

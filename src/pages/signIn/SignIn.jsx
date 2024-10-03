import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./signIn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../features/user/userSlice";

function SignIn() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("consumer");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    function handleUserTypeChange(e) {
        setUserType(e.target.value);
    }

    function handleSignIn(e) {
        e.preventDefault();
        const data = {
            email: e.target[0].value,
            password: e.target[1].value,
            user_type: userType,
        };
        dispatch(signInUser(data));
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
            height={"80vh"}
            flexDirection={"column"}
        >
            <Box width={"500px"}>
                <h1 className={styles.heading}>Welcome!</h1>
                <h3 className={styles.heading}>Please sign-in</h3>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                >
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

                    <form
                        className={styles.form}
                        onSubmit={(e) => handleSignIn(e)}
                    >
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
                        <Button type="submit">Login</Button>
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

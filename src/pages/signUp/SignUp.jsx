import {
    Box,
    Button,
    Checkbox,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signUp.module.scss";

function SignUp() {
    const [userType, setUserType] = useState("consumer");
    const navigate = useNavigate();

    function handleUserTypeChange(e) {
        setUserType(e.target.value);
    }
    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"80vh"}
            flexDirection={"column"}
        >
            <h2>Select the type of account you would like to create</h2>
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
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <form className={styles.form}>
                    <label>First name</label>
                    <input type="text" />
                    <label>Last name</label>
                    <input type="text" />
                    <label htmlFor="#email">Email</label>
                    <input className="input" id="email" type="email" />
                    <label htmlFor="#pass">Password</label>
                    <input className="input" id="pass" type="password" />
                    <label>Phone</label>
                    <input type="tel" />
                    <label>Company name</label>
                    <input type="text" />

                    {/* TODO: Query industry clusters */}
                    <label>What industry/industries is your company in?</label>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        label="Grouping"
                        multiple
                        value={[]}
                        sx={{ overflowY: "scroll" }}
                    >
                        <Box maxHeight={'300px'}>
                          {/* TODO: Map industries */}
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem key={""} value={""}>
                                <Checkbox checked={""} />
                                <ListItemText primary={"An industry"} />
                            </MenuItem>
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem key={""} value={""}>
                                <Checkbox checked={""} />
                                <ListItemText primary={"An industry"} />
                            </MenuItem>
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem key={""} value={""}>
                                <Checkbox checked={""} />
                                <ListItemText primary={"An industry"} />
                            </MenuItem>
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem key={""} value={""}>
                                <Checkbox checked={""} />
                                <ListItemText primary={"An industry"} />
                            </MenuItem>
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem key={""} value={""}>
                                <Checkbox checked={""} />
                                <ListItemText primary={"An industry"} />
                            </MenuItem>
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem key={""} value={""}>
                                <Checkbox checked={""} />
                                <ListItemText primary={"An industry"} />
                            </MenuItem>
                            <ListSubheader>Category 1</ListSubheader>
                            <MenuItem key={""} value={""}>
                                <Checkbox checked={""} />
                                <ListItemText primary={"An industry"} />
                            </MenuItem>
                        </Box>
                    </Select>
                    <Button onClick={() => navigate("/")}>Submit form</Button>
                </form>
            </Box>
        </Box>
    );
}

export default SignUp;

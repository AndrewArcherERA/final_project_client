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
import bcrypt from 'bcryptjs';
import axios from 'axios';

function SignUp() {
    const [userType, setUserType] = useState("consumer");
    const navigate = useNavigate();
    const salt = bcrypt.genSaltSync(10)

    function handleUserTypeChange(e) {
        setUserType(e.target.value);
    }

    async function registerUser(e) {
        e.preventDefault();
        const password = bcrypt.hashSync(e.target[3].value, salt);
        let newUser = {
            f_name: e.target[0].value,
            l_name: e.target[1].value,
            email: e.target[2].value,
            password: password,
            phone: e.target[4].value,
            company_name: e.target[5].value,
            industry_clusters: [],
            user_type: userType,
            // TODO: handle indrustry clusteres input
        }

        // TODO: URL
        const url = 'http://localhost:8080/auth/register'
        try {
            await axios.post(url, newUser).then(() => {
                alert('Account registered succesfully!');
                navigate('/');
            });
        }catch (error) {
            if(error.status === 400)
                alert('Email already registered to another account')
            else if (error.status === 500)
                alert('Our server seems to be having some issues. Please try again later.')
        }
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
                <form className={styles.form} onSubmit={(e) => registerUser(e)}>
                    <label>First name</label>
                    <input type="text" required />
                    <label>Last name</label>
                    <input type="text" required/>
                    <label htmlFor="#email">Email</label>
                    <input className="input" id="email" type="email" required/>
                    <label htmlFor="#pass">Password</label>
                    <input className="input" id="pass" type="password" required/>
                    <label>Phone</label>
                    <input type="tel" required/>
                    <label>Company name</label>
                    <input type="text" required/>

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
                    <Button type="submit">Submit form</Button>
                </form>
            </Box>
        </Box>
    );
}

export default SignUp;

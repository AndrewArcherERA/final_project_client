import {
    Alert,
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup, Typography,
} from "@mui/material";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./signUp.module.scss";
import axios from 'axios';
import bgImage from "../../images/AdobeStock_376188865.jpeg";
import Snackbar from "@mui/material/Snackbar";

function SignUp() {
    const [userType, setUserType] = useState("consumer");
    const navigate = useNavigate();
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

    async function registerUser(e) {
        e.preventDefault();
        let newUser = {
            f_name: e.target[0].value,
            l_name: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
            phone: e.target[4].value,
            company_name: e.target[5].value,
            user_type: userType,
        }

        const url = 'http://localhost:8080/auth/register'
        try {
            await axios.post(url, newUser).then(() => {
                handleSnackBarState(true, 'Account registered succesfully!', 'success')
                navigate('/');
            });
        } catch (error) {
            if (error.status === 400)
                handleSnackBarState(true, 'Email already registered to another account.', 'error')
        }
    }

    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
            className={styles.main}
            color={'whitesmoke'}
        >
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
            <Box className={styles.bgPhoto} p={8} gap={3}
                 sx={{backgroundImage: `url(${bgImage})`}}>
                <Box display={"flex"} gap={3} flexDirection={'column'} alignItems={'center'}>
                    <div className={styles.bigText}>
                        <Typography variant={'h2'} fontWeight={600}>Select the type of account you would like to create,
                            and
                            then fill out
                            the form.</Typography>
                    </div>
                    <Box bgcolor={'whitesmoke'} borderRadius={3} overflow={'hidden'}>
                        <ToggleButtonGroup
                            color="primary"
                            value={userType}
                            exclusive
                            onChange={handleUserTypeChange}
                            aria-label="Platform"
                            size={'large'}
                        >
                            <ToggleButton value="consumer">Consumer</ToggleButton>
                            <ToggleButton value="supplier">Supplier</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={'column'}
                    gap={3}
                    width={'600px'}
                    className={styles.container}
                >
                    <form className={styles.form} onSubmit={(e) => registerUser(e)}>
                        <label>First name</label>
                        <input className={styles.input} type="text" required/>
                        <label>Last name</label>
                        <input className={styles.input} type="text" required/>
                        <label htmlFor="#email">Email</label>
                        <input className={styles.input} className="input" id="email" type="email" required/>
                        <label htmlFor="#pass">Password</label>
                        <input className={styles.input} className="input" id="pass" type="password" required/>
                        <label>Phone</label>
                        <input className={styles.input} type="tel" required/>
                        <label>Company name</label>
                        <input className={styles.input} type="text" required/>
                        <Button variant={'contained'} color={'success'} type="submit">Submit form</Button>
                    </form>
                    <Typography>Already have an account? <Link to={'/'}>Sign In</Link></Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;

import { Box, Button, Grid2, Typography } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import React from "react";
import styles from "./messages.module.scss";
import { TbTextWrap } from "react-icons/tb";

// TODO: Messages needed to be stored in redux for easier rendering of messages
function Messages() {
    return (
        <Grid2 container size={12} height={"94.1vh"}>
            <Grid2 item size={4} borderRight={2} borderColor={grey[400]}>
                <Box
                    height={80}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bgcolor={grey[200]}
                    px={5}
                    borderBottom={3}
                    borderColor={grey[400]}
                >
                    {/* TODO: Logic for creating new chat with supplier */}
                    <Button variant="contained" fullWidth>
                        New Chat
                    </Button>
                </Box>
                <Box maxHeight={"86.1vh"} className={styles.chatContainer}>
                    {/* TODO: Map chat component */}
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                </Box>
            </Grid2>
            <Grid2 item size={8}>
                <Box
                    height={80}
                    px={5}
                    display={"flex"}
                    alignItems={"center"}
                    borderBottom={3}
                    borderColor={grey[400]}
                    bgcolor={grey[200]}
                >
                    <Typography variant="h4">Some Supplier</Typography>
                </Box>
                <Box p={3} display={"flex"} flexDirection={"column"} gap={3}>
                    {/* Logic to render recipient vs sender message */}
                    <Sender />
                    <Recipient />
                </Box>
                <Box>Input</Box>
            </Grid2>
        </Grid2>
    );
}

function Sender(message) {
    return (
        <Box display={"flex"} justifyContent={"flex-end"}>
            <Box bgcolor={blue[800]} maxWidth={"65%"} p={2} borderRadius={5} color={"white"}>
                <Typography className={styles.message} maxWidth={"100%"}>
                    We will send a replacement! bbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbb bbbbbb bbbbbb b bbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                </Typography>
            </Box>
        </Box>
    );
}

function Recipient(message) {
    return (
        <Box display={"flex"} justifyContent={"flex-start"}>
            <Box bgcolor={grey[800]} maxWidth={"65%"} p={2} borderRadius={5} color={"white"}>
                <Typography className={styles.message} maxWidth={"100%"}>
                    We will send a replacement! bbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbb bbbbbb bbbbbb b bbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                </Typography>
            </Box>
        </Box>
    );
}

function Chat() {
    return (
        <Box
            className={styles.chat}
            height={75}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderBottom={2}
            borderColor={grey[600]}
        >
            <Typography variant="h4">Some Supplier</Typography>
        </Box>
    );
}

export default Messages;

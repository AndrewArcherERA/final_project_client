import { Box, Button, Grid2, Input, Typography } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import React, { useEffect, useRef } from "react";
import styles from "./messages.module.scss";
import { SlPicture } from "react-icons/sl";
import { BsPaperclip } from "react-icons/bs";

// TODO: Messages needed to be stored in redux for easier rendering of messages
function Messages() {
    function ScrollToBottom() {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    }
    return (
        <Box maxHeight={"80vh"} width={"90vw"} border={2} borderRadius={3} overflow={'hidden'}>
            <Grid2 container size={12} height={'100%'}>
                <Grid2 item size={4} borderRight={2} borderColor={grey[400]} maxHeight={'70vh'}>
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
                    <Box className={styles.chatContainer}>
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
                <Grid2 item size={8} height={'100%'} >
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
                    <Box
                        p={3}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                        className={styles.messageContainer}
                    >
                        {/* Logic to render recipient vs sender message */}
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <Sender />
                        <Recipient />
                        <ScrollToBottom />
                    </Box>
                    <Box
                        height={70}
                        borderTop={3}
                        color={grey[400]}
                        bgcolor={grey[200]}
                        p={2}
                    >
                        <Grid2
                            container
                            height={"100%"}
                            alignItems={"center"}
                            spacing={3}
                        >
                            <form className={styles.form}>
                                <Grid2 item size={8}>
                                    <Input
                                        type="text"
                                        placeholder="Enter a message..."
                                        className={styles.textInput}
                                        fullWidth
                                    />
                                </Grid2>
                                <Grid2 item size={4} display={"flex"} gap={1}>
                                    <div>
                                        <label
                                            for="images"
                                            className={styles.label}
                                        >
                                            <SlPicture size={50} />
                                        </label>
                                        <input
                                            id="images"
                                            style={{ display: "none" }}
                                            type="file"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="files"
                                            className={styles.label}
                                        >
                                            <BsPaperclip size={50} />
                                        </label>
                                        <input
                                            id="files"
                                            style={{ display: "none" }}
                                            type="file"
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                    >
                                        Send
                                    </Button>
                                </Grid2>
                            </form>
                        </Grid2>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

function Sender(message) {
    return (
        <Box display={"flex"} justifyContent={"flex-end"}>
            <Box
                bgcolor={blue[800]}
                maxWidth={"65%"}
                p={2}
                borderRadius={5}
                color={"white"}
            >
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
            <Box
                bgcolor={grey[800]}
                maxWidth={"65%"}
                p={2}
                borderRadius={5}
                color={"white"}
            >
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

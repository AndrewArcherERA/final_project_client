import { Box, Input, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import ConsumerHeader from "../../components/consumerInventory/consumerInventory/ConsumerHeader";
import ConsumerProduct from "../../components/consumerInventory/consumerInventory/ConsumerProduct";
import EmployeeHeader from "../../components/employeeInventory/EmployeeHeader";
import EmployeeProduct from "../../components/employeeInventory/EmployeeProduct";

function Inventory({ userType }) {
    const [location, setLoctation] = useState("Warehouse");
    const [inventory, setInventory] = useState([]);
    const [locations, setLocations] = useState([]);

    async function getLocations() {
        // TODO: Makes axios request to API to get list of store locations and warehouse location
    }
    async function getInventory(location) {
        // TODO: Makes axios request to API to get inventory for specific location
    }

    function handleLocationChnage(e) {
        setLoctation(e.target.value);
    }
    return (
        <Box>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box>
                    <InputLabel>Location</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        label="Age"
                        onChange={(e) => handleLocationChnage(e)}
                    >
                        {/* TODO: Map MenuItems with locations */}
                        <MenuItem value={"Warehouse"}>Main</MenuItem>
                        <MenuItem value={"store1"}>Store 1</MenuItem>
                        <MenuItem value={"store2"}>Store 2</MenuItem>
                    </Select>
                </Box>
                <Box>
                    <Input type="text" placeholder="Search for product..." />
                </Box>
            </Box>

            <Box width={"80vw"} border={2} py={2} bgcolor={"blue"}>
                {/* TODO: Map products */}
                {userType === "consumer" ? (
                    <ConsumerHeader />
                ) : (
                    <EmployeeHeader />
                )}
                <Box
                    borderTop={2}
                    height={"70vh"}
                    maxHeight={"70vh"}
                    sx={{ overflowY: "scroll" }}
                    bgcolor={"white"}
                >
                    {userType === "consumer" ? (
                        <ConsumerProduct />
                    ) : (
                        <EmployeeProduct />
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Inventory;

import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../dashboardStyles.module.scss";
import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid2,
    Input,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import axios from "axios";
import bcrypt from "bcryptjs";
import { updateUserInfo } from "../../features/user/userSlice";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdOutlineExpandMore } from "react-icons/md";

function ConsumerDashboard() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        right: false,
    });

    //State to handle open/close of modals/drawers
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [infoModal, setInfoModal] = useState(false);
    const handleOpenInfo = () => setInfoModal(true);
    const handleCloseInfo = () => setInfoModal(false);
    const [newLocationModal, setNewLocationModal] = useState(false);
    const handleOpenNewLocation = () => setNewLocationModal(true);
    const handleCloseNewLocation = () => setNewLocationModal(false);
    const [updateLocationModal, setupdateLocationModal] = useState(false);
    const handleOpenupdateLocation = () => setupdateLocationModal(true);
    const handleCloseupdateLocation = () => setupdateLocationModal(false);
    const { company_name, f_name, l_name, email, phone, id, token } =
        useSelector((state) => state.user.data);
    const { type } = useSelector((state) => state.user);

    //State to handle updating user info form
    const [firstName, setFirstName] = useState(f_name);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const [lastName, setLastName] = useState(l_name);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const [userEmail, setEmail] = useState(email);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const [userPhone, setPhone] = useState(phone);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const [userComapany, setUserCompany] = useState(company_name);
    const handleCompanyChange = (e) => setUserCompany(e.target.value);

    const [stores, setStores] = useState([]);

    async function getStores() {
        const config = {
            headers: { Authorization: token },
        };
        const url = `http://localhost:8080/consumerStore/getStores/${id}`;
        let response = await axios.get(url, config);
        setStores(response.data);
    }
// TODO: Pull store location accordian into seperate component with own state
    const [lstoreName, setStoreName] = useState();
    const handleStoreName = (e) => setStoreName(e.target.value);
    const [lf_name, setf_name] = useState();
    const handlefname = (e) => setf_name(e.target.value);
    const [ll_name, setl_name] = useState();
    const handlelname = (e) => setl_name(e.target.value);
    const [lemail, setemail] = useState();
    const handleemail = (e) => setemail(e.target.value);
    const [lphone, setphone] = useState();
    const handlephone = (e) => setphone(e.target.value);
    const [lstreet, setStreet] = useState();
    const handleStreet = (e) => setStreet(e.target.value);
    const [lcity, setcity] = useState();
    const handleCity = (e) => setcity(e.target.value);
    const [lstate, setstate] = useState();
    const handleState = (e) => setstate(e.target.value);
    const [lzip, setzip] = useState();
    const handleZip = (e) => setzip(e.target.value);
    const [pass, setPassword] = useState();
    const handlePass = (e) => setPassword(e.target.value);

    async function handleUpdateLocation(e) {}

    async function handleCreateStore(e) {
        e.preventDefault();
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(e.target[8].value, salt);
        const config = {
            headers: { Authorization: token },
        };
        const body = {
            store: {
                consumer_id: id,
                store_name: e.target[0].value,
                street_address: e.target[1].value,
                city: e.target[2].value,
                state: e.target[3].value,
                zip: e.target[4].value,
            },
            manager: {
                f_name: e.target[5].value,
                l_name: e.target[6].value,
                email: e.target[7].value,
                password: pass,
                phone: e.target[9].value,
            },
        };
        const url = `http://localhost:8080/consumerStore/createStore`;
        let response = await axios.post(url, body, config);
        setStores([...stores, response.data]);
        handleCloseNewLocation();
    }

    async function handleUpdateInfo(e) {
        e.preventDefault();
        const data = {
            f_name: e.target[0].value,
            l_name: e.target[1].value,
            email: e.target[2].value,
            phone: e.target[3].value,
            company_name: e.target[4].value,
            token: token,
            user_type: type,
            userID: id,
        };
        await dispatch(updateUserInfo(data)).then(function () {
            alert("User info updated succesfully");
            handleCloseInfo();
        });
    }

    const toggleDrawer = (anchor, open, toggle) => (event) => {
        if ((event.type === "keydown" && event.key === "Esc") || toggle)
            setState({ ...state, [anchor]: open });
    };

    async function handlePasswordChange(e) {
        e.preventDefault();
        const oldPass = e.target[0].value;
        let newPass = e.target[1].value;
        const config = {
            headers: { Authorization: token },
        };

        try {
            const url = `http://localhost:8080/account/getStoredPass/${type}/${id}`;
            let validPass = await axios.get(url, config);

            if (bcrypt.compareSync(oldPass, validPass.data[0].password)) {
                const url = `http://localhost:8080/account/updatePassword`;
                const salt = bcrypt.genSaltSync(10);
                newPass = bcrypt.hashSync(newPass, salt);
                let data = {
                    user_type: type,
                    userID: id,
                    newPass: newPass,
                };

                await axios.put(url, data, config).then(function (res) {
                    alert("Password changed sucsesfully");
                    handleClose();
                });
            } else {
                alert("Old password does not match current stored password");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //gets all stores
    useEffect(() => {
        getStores();
    }, []);

    // TODO: Pass in data for fields (product name, individual/unit price, numPerUnit, NumUnitsAvail, image)
    const accountDrawer = (anchor) => (
        <Box
            width={500}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            p={3}
        >
            <Typography
                sx={{ cursor: "pointer" }}
                onClick={toggleDrawer(anchor, false, true)}
                variant="h3"
                textAlign={"right"}
            >
                X
            </Typography>
            <List>
                <ListItem>
                    <Typography variant="h4">
                        {f_name} {l_name}
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Grid2 container rowSpacing={1}>
                        <Grid2 item size={6}>
                            <Typography variant="h6">Email:</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography>{email}</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography variant="h6">Phone:</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography>{phone}</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography variant="h6">Company Name</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Typography>{company_name}</Typography>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Button fullWidth onClick={handleOpen}>
                                Change Password
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.passWordModelBox}>
                                    <form
                                        className={styles.passform}
                                        onSubmit={(e) =>
                                            handlePasswordChange(e)
                                        }
                                    >
                                        <Input
                                            name="oldPass"
                                            color="white"
                                            type="password"
                                            placeholder="Enter old password..."
                                            fullWidth
                                            className={styles.passwordInput}
                                        />
                                        <Input
                                            name="newPass"
                                            type="password"
                                            placeholder="Enter new password..."
                                            fullWidth
                                            className={styles.passwordInput}
                                        />
                                        <Button type="submit">Update</Button>
                                    </form>
                                </Box>
                            </Modal>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Modal
                                open={infoModal}
                                onClose={handleCloseInfo}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.infoModal}>
                                    <form onSubmit={(e) => handleUpdateInfo(e)}>
                                        <Grid2 container rowSpacing={1}>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    First Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={firstName}
                                                    onChange={
                                                        handleFirstNameChange
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Last Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={lastName}
                                                    onChange={
                                                        handleLastNameChange
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Email:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={userEmail}
                                                    onChange={handleEmailChange}
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Phone:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={userPhone}
                                                    onChange={handlePhoneChange}
                                                />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Company Name
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input
                                                    fullWidth
                                                    type="text"
                                                    value={userComapany}
                                                    onChange={
                                                        handleCompanyChange
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 item size={12}>
                                                <Button type="submit" fullWidth>
                                                    Confirm Changes
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </form>
                                </Box>
                            </Modal>
                            <Button fullWidth onClick={handleOpenInfo}>
                                Update User Info
                            </Button>
                        </Grid2>
                    </Grid2>
                </ListItem>
                <Divider />
                <ListItem>
                    <Box width={"100%"}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Modal
                                open={newLocationModal}
                                onClose={handleCloseNewLocation}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className={styles.passWordModel}
                            >
                                <Box className={styles.infoModal}>
                                    <form
                                        onSubmit={(e) => handleCreateStore(e)}
                                    >
                                        <Grid2 container rowSpacing={1}>
                                            <Grid2
                                                item
                                                size={12}
                                                borderBottom={1}
                                            >
                                                <Typography variant="h6">
                                                    Location Information
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Location Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Street Address:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    City:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    State:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Zip:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2
                                                item
                                                size={12}
                                                borderBottom={1}
                                            >
                                                <Typography variant="h6">
                                                    Store Manager Account
                                                    Information
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    First Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Last Name:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Email:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Password:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Typography variant="h6">
                                                    Phone:
                                                </Typography>
                                            </Grid2>
                                            <Grid2 item size={6}>
                                                <Input fullWidth type="text" />
                                            </Grid2>
                                            <Grid2 item size={12}>
                                                <Button type="submit" fullWidth>
                                                    Create Store
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </form>
                                </Box>
                            </Modal>
                            <Typography variant="h5">
                                Store Locations
                            </Typography>
                            <Button onClick={handleOpenNewLocation}>
                                Add Store Location
                            </Button>
                        </Box>
                        {stores.length > 0
                            ? stores.map((store) => {
                                  return (
                                      <Accordion key={store.store.id}>
                                          <AccordionSummary
                                              expandIcon={
                                                  <MdOutlineExpandMore />
                                              }
                                              aria-controls="panel1-content"
                                              id="panel1-header"
                                          >
                                              <Typography variant="h6">
                                                  {store.store.name}
                                              </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                              <Grid2 container>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          Store Manager:
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          {store.manager.f_name}{" "}
                                                          {store.manager.l_name}
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}></Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          {store.manager.email}
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}></Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          {store.manager.phone}
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2
                                                      item
                                                      size={12}
                                                      my={1}
                                                      borderBottom={1}
                                                  >
                                                      <Typography>
                                                          Address
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          Street:
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          {
                                                              store.store
                                                                  .street_address
                                                          }
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          City:
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          {store.store.city}
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          State:
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          {store.store.state}
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          Zip:
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={6}>
                                                      <Typography>
                                                          {store.store.zip}
                                                      </Typography>
                                                  </Grid2>
                                                  <Grid2 item size={12} mt={1}>
                                                      <Box display={"flex"}>
                                                          <Modal
                                                              open={
                                                                  updateLocationModal
                                                              }
                                                              onClose={
                                                                  handleCloseupdateLocation
                                                              }
                                                              aria-labelledby="modal-modal-title"
                                                              aria-describedby="modal-modal-description"
                                                              className={
                                                                  styles.passWordModel
                                                              }
                                                          >
                                                              <Box
                                                                  className={
                                                                      styles.infoModal
                                                                  }
                                                              >
                                                                  <form
                                                                      onSubmit={(
                                                                          e
                                                                      ) =>
                                                                          handleUpdateLocation(
                                                                              e
                                                                          )
                                                                      }
                                                                  >
                                                                      <Grid2
                                                                          container
                                                                          rowSpacing={
                                                                              1
                                                                          }
                                                                      >
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  12
                                                                              }
                                                                              borderBottom={
                                                                                  1
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Location
                                                                                  Information
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Location
                                                                                  Name:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.store.name}
                                                                                  value={
                                                                                      lstoreName
                                                                                  }
                                                                                  onChange={(e) => handleStoreName(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Street
                                                                                  Address:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.store.street_address}
                                                                                  value={
                                                                                      lstreet
                                                                                  }
                                                                                  onChange={(e) => handleStreet(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  City:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.store.city}
                                                                                  value={
                                                                                      lcity
                                                                                  }
                                                                                  onChange={(e) => handleCity(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  State:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.store.state}
                                                                                  value={
                                                                                      lstate
                                                                                  }
                                                                                  onChange={(e) => handleState(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Zip:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.store.zip}
                                                                                  value={
                                                                                      lzip
                                                                                  }
                                                                                  onChange={(e) => handleZip(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  12
                                                                              }
                                                                              borderBottom={
                                                                                  1
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Store
                                                                                  Manager
                                                                                  Account
                                                                                  Information
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  First
                                                                                  Name:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.manager.f_name}
                                                                                  value={
                                                                                      lf_name
                                                                                  }
                                                                                  onChange={(e) => handlefname(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Last
                                                                                  Name:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.manager.l_name}
                                                                                  value={
                                                                                      ll_name
                                                                                  }
                                                                                  onChange={(e) => handlelname(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Email:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.manager.email}
                                                                                  value={
                                                                                      lemail
                                                                                  }
                                                                                  onChange={(e) => handleemail(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Password:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  value={pass}
                                                                                  onChange={(e) => handlePass(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Typography variant="h6">
                                                                                  Phone:
                                                                              </Typography>
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  6
                                                                              }
                                                                          >
                                                                              <Input
                                                                                  fullWidth
                                                                                  type="text"
                                                                                  defaultValue={store.manager.phone}
                                                                                  value={
                                                                                      lphone
                                                                                  }
                                                                                  onChange={(e) => handlephone(e)}
                                                                              />
                                                                          </Grid2>
                                                                          <Grid2
                                                                              item
                                                                              size={
                                                                                  12
                                                                              }
                                                                          >
                                                                              <Button
                                                                                  type="submit"
                                                                                  fullWidth
                                                                              >
                                                                                  Update
                                                                                  Store
                                                                              </Button>
                                                                          </Grid2>
                                                                      </Grid2>
                                                                  </form>
                                                              </Box>
                                                          </Modal>
                                                          <Button fullWidth onClick={handleOpenupdateLocation}>
                                                              Update Location
                                                              Info
                                                          </Button>
                                                          <Button
                                                              fullWidth
                                                              color="error"
                                                          >
                                                              Delete Location
                                                          </Button>
                                                      </Box>
                                                  </Grid2>
                                              </Grid2>
                                          </AccordionDetails>
                                      </Accordion>
                                  );
                              })
                            : null}
                    </Box>
                </ListItem>
                <Divider />
                <ListItem>Warehouse</ListItem>
                <Divider />
                <ListItem>
                    <Typography>Logout</Typography>
                </ListItem>
                <Divider />
            </List>
        </Box>
    );
    return (
        <Box>
            <Grid2 container px={3} py={1} borderBottom={2}>
                <Grid2 item size={2}>
                    <Typography variant="h4">{company_name}</Typography>
                </Grid2>
                <Grid2 item size={8}>
                    <nav className={styles.nav}>
                        <Link to={""} className={styles.link}>
                            <Typography variant="h6">Inventory</Typography>
                        </Link>
                        <Link to={"suppliers"} className={styles.link}>
                            <Typography variant="h6">Suppliers</Typography>
                        </Link>
                        <Link to={"messages"} className={styles.link}>
                            <Typography variant="h6">Messages</Typography>
                        </Link>
                        <Link to={"orders"} className={styles.link}>
                            <Typography variant="h6">Orders</Typography>
                        </Link>
                    </nav>
                </Grid2>
                <Grid2 item size={2}>
                    <nav className={styles.navicons}>
                        {/* <Link to={"cart"} className={styles.link}>
                            <Typography variant="h6">
                                <FaShoppingCart size={30} />
                            </Typography>
                        </Link> */}
                        <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}
                        >
                            {accountDrawer("right")}
                        </Drawer>
                        <Typography variant="h6" className={styles.link}>
                            <IoPersonCircleSharp
                                onClick={toggleDrawer("right", true, true)}
                                size={35}
                            />
                        </Typography>
                    </nav>
                </Grid2>
            </Grid2>
            <Box
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                className={styles.outletWrapper}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default ConsumerDashboard;

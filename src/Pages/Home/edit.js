import '../../App.css';
import React from 'react';
import ResponsiveAppBar from '../../Components/AppBar';
import UsersDataTable from '../../Components/UsersList';
import { projectId, auth } from "../../Services/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CircularProgress, Grid, Input, TextField } from '@mui/material';
import { Label } from '@mui/icons-material';
import { Stack } from '@mui/system';

import { useDispatch, useSelector } from '../../redux/store';
import { getUser, updateUser } from '../../redux/slices/user';

function Edit() {
    const dispatch = useDispatch();

    const { user, isLoading } = useSelector((state) => state.user);
    const [userT, setUserT] = React.useState(null)

    let navigate = useNavigate();
    const [loginUser, setLoginUser] = React.useState(null)
    let { id } = useParams();

    React.useEffect(() => {
        console.log("parms", id);
        console.log("user", user);
    }, [])

    React.useEffect(() => {
        dispatch(getUser(id));
    }, [dispatch]);
    React.useEffect(() => {
        console.log("user", user);
        setUserT(user);
    }, [user])



    const onChangeHandler = (event) => {
        setUserT({ ...userT, [event.target.name]: event.target.value })
    }

    const onSaveHandler = () => {
        try {
            dispatch(updateUser(userT));
            navigate("/home");
        } catch (e) {
            console.log("error", e)
        }
    };

    return (
        <div className="App">
            <ResponsiveAppBar></ResponsiveAppBar>
            <Box>
                <Grid container spacing={2}>
                    <Grid sx={{ m: 1 }} item xs={12}>
                        <h3>Edit User #{id}</h3>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid sx={{ m: 1 }} item xs={12}>
                        {(isLoading || userT == null) ? (
                            <CircularProgress />
                        ) : (
                            <Card sx={{ p: 3, mx: 4 }} xs={12} spacing={3}>
                                <TextField
                                    id="name"
                                    name='name'
                                    label="Full Name"
                                    variant="outlined"
                                    value={userT.name}
                                    size='small'
                                    onChange={onChangeHandler}
                                    sx={{ mx: 1 }}
                                />
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    variant="outlined"
                                    type={"email"}
                                    size='small'
                                    value={userT.email}
                                    onChange={(e) => onChangeHandler(e)}
                                    sx={{ mx: 1 }}
                                />
                                <TextField
                                    id="contact"
                                    name="contact"
                                    label="Contact"
                                    variant="outlined"
                                    value={userT.contact}
                                    size='small'
                                    sx={{ mx: 1 }}
                                    type={"text"} />
                                <Button variant='contained' onClick={onSaveHandler}>Save</Button>
                            </Card>)}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Edit;

// import * as React from 'react';
import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';

import axios from 'axios';

import { Box, Button, CircularProgress, Grid, IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Delete, Edit } from '@mui/icons-material';

import { useDispatch, useSelector } from '../redux/store';
import { deleteUser, getUser, getUsers, setUser } from '../redux/slices/user';
import { useNavigate } from "react-router-dom";
import ConfirmDelete from './ConfirmDelete';


export default function UsersDataTable() {
    const dispatch = useDispatch();

    const { users, isLoading } = useSelector((state) => state.user);
    const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();

    const onDeleteHandler = (event, row) => {
        console.log("delete", event, row);
        dispatch(deleteUser(row.id))
        setOpen(false)
    };
    const onEditHandler = (row) => {
        navigate(`/users/${row.id}`);
    }

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'avatar', headerName: 'Avatar', width: 200, renderCell: (params) => { return (<Avatar alt={params.row.name} src={params.row.avatar} />) } },
        { field: 'name', headerName: 'First name', width: 200 },
        { field: 'email', headerName: 'Email Address', width: 200 },
        { field: 'contact', headerName: 'Contact Number', width: 200 },
        { field: 'createdAt', headerName: 'Created At', width: 200, type: 'dateTime' },
        {
            field: 'action', headerName: '', width: 200, renderCell: (params) => {
                return (
                    <div>
                        <IconButton
                            color="success"
                            variant="outlined"
                            onClick={() => onEditHandler(params.row)}
                        >
                            <Edit></Edit>
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => setOpen(true)}
                            variant="outlined">
                            <Delete></Delete>
                        </IconButton>
                        <ConfirmDelete
                            open={open}
                            handleClose={() => setOpen(false)}
                            handleDelete={(e) => { onDeleteHandler(e, params.row) }}>
                        </ConfirmDelete>
                    </div>
                );
            }
        },

    ];


    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);



    return (
        <Box sx={{ flexGrow: 1 }} marginX='20'>
            <Grid container spacing={2}>
                <Grid item xs={12} height="400px">
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
// import * as React from 'react';
import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';

import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'avatar', headerName: 'Avatar', width: 200, renderCell: (params) => { return (<Avatar alt={params.row.name} src={params.row.avatar} />) } },
    { field: 'name', headerName: 'First name', width: 200 },
    { field: 'email', headerName: 'Email Address', width: 200 },
    { field: 'contact', headerName: 'Contact Number', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200, type: 'dateTime' },
];

export default function UsersDataTable() {
    const [rows, setRows] = useState([]);

    const fetchUsers = async () => {
        var config = {
            method: 'get',
            url: 'https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/users',
            headers: {}
        };
        await axios(config)
            .then(function (response) {
                // console.log(response.data);
                setRows(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        fetchUsers();
    }, []);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection />
        </div>
    );
}
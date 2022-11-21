import '../../App.css';
import React, { Component } from 'react';
import ResponsiveAppBar from '../../Components/AppBar';
import UsersDataTable from '../../Components/UsersList';
import { ViewAgenda } from '@mui/icons-material';

function Welcome() {
    return (
      <div className="App">
        <ResponsiveAppBar></ResponsiveAppBar>
        <div style={{ textAlignVertical: "center",textAlignLast:"center", textAlign: "center",marginTop:200,fontSize:24 }}>
          Welcome to TestApp
        </div>
      </div>
    );
}

export default Welcome;

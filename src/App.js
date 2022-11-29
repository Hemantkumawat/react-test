import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';
import ResponsiveAppBar from './Components/AppBar';
import Welcome from './Pages/Welcome';
import { Routes, Route, useNavigate, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import Edit from './Pages/Home/edit';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

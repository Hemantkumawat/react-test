import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';
import ResponsiveAppBar from './Components/AppBar';
import Welcome from './Pages/Welcome';
import { Routes, Route, useNavigate, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';


function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

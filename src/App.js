
import './App.css';
// import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from './components/Top';
import Main from './components/Main';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
       {/* <Top /> */}
       <Routes>
        <Route exact path='/' element={<Main />}>
          
        </Route>
       </Routes>
       {/* <Footer /> */}
    </BrowserRouter>
   
  );
}

export default App;

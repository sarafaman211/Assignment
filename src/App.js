import React from 'react'
import "./App.css"
import Navbar from './components/Headers/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Accounts/Login"
import SignUp from "./components/Accounts/SignUp"
import PrivateRoute from './components/Assest/PrivateRoute';
import Records from './components/Pages/Records';
import DataState from './Context/dataState';
import ScrollToTop from "./components/Assest/ScrollToTop"


const App = () => {
  return (

    <Router>
      <DataState >
        <ScrollToTop />
        <Navbar heading="MASS_MAILER" />
        <div className='App'>
          <Routes>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/signup' element={<SignUp />} ></Route>
            <Route element={<PrivateRoute />}>
              <Route path='/data' element={<Records />} ></Route>
            </Route>
          </Routes>
        </div>
      </DataState>
    </Router>
  )
}

export default App;

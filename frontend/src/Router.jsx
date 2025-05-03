import "./Global.css"
import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Home/>}/>
            
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
        </Routes>
        <ToastContainer />
    </BrowserRouter>
  )
}

export default Router;

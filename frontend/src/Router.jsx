import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "./Global.css"
import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<LoginForm/>}/>
            
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

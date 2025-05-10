import "./Global.css"
import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Employers from "./pages/Employers";
import Error404 from "./pages/Error404";
import AddEmployee from "./pages/AddEmployee";
import AddEmployer from "./pages/AddEmployer";
import AddContract from "./pages/AddContract";
import Contracts from "./pages/Contracts";
import UpdateEmployee from "./pages/UpdateEmployee";
import UpdateEmployer from "./pages/UpdateEmployer";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/empregados" element={<PrivateRoute>  <Employees /> </PrivateRoute>} />

        <Route path="/empregadores" element={<PrivateRoute>  <Employers />  </PrivateRoute>} />

        <Route path="/empregados/adicionar" element={<PrivateRoute> <AddEmployee /> </PrivateRoute>} />

        <Route path="/empregadores/adicionar" element={<PrivateRoute> <AddEmployer /> </PrivateRoute>} />

        <Route path="/contratos" element={<PrivateRoute> <Contracts /> </PrivateRoute>} />

        <Route path="/contratos/adicionar" element={<PrivateRoute> <AddContract /> </PrivateRoute>} />
        
        <Route path="/empregados/editar/:id" element={<PrivateRoute> <UpdateEmployee /> </PrivateRoute>} />

        <Route path="/empregador/editar/:id" element={<PrivateRoute> <UpdateEmployer /> </PrivateRoute>} />

        <Route path="*" element={<Error404 />} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default Router;

import "./Global.css"
import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Employers from "./pages/Employers";
import Error404 from "./pages/Error404";
import AddEmployer from "./pages/AddEmployer";
import { FormProvider } from "./components/ContractContext";
import Contracts from "./pages/Contracts";
import AddContract from "./pages/AddContract";
import UpdateEmployee from "./pages/UpdateEmployee";
import UpdateEmployer from "./pages/UpdateEmployer";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/empregadores" element={<PrivateRoute>  <Employers />  </PrivateRoute>} />

        <Route path="/empregadores/adicionar" element={<PrivateRoute> <AddEmployer /> </PrivateRoute>} />

        <Route path="/contratos" element={<PrivateRoute> <Contracts /> </PrivateRoute>} />

        <Route path="/contratos/adicionar" element={
          <FormProvider> <PrivateRoute> <AddContract /> </PrivateRoute> </FormProvider>} 
        />
        
        <Route path="/empregados/editar/:id" element={<PrivateRoute> <UpdateEmployee /> </PrivateRoute>} />

        <Route path="/empregador/editar/:id" element={<PrivateRoute> <UpdateEmployer /> </PrivateRoute>} />

        <Route path="*" element={<Error404 />} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default Router;

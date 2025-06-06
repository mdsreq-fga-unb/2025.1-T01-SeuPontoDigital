import express from "express";
import loginAdmin from "../controllers/Admin/loginAdmin.js";
import loginEmployer from "../controllers/Employers/loginEmployer.js";

const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);

publicRoute.post("/login-employer", loginEmployer);

export default publicRoute;

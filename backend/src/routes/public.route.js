import express from "express";
import loginAdmin from "../controllers/Admin/loginAdmin.js";
import loginEmployer from "../controllers/Employers/loginEmployer.js";
import firstAccessController from "../controllers/FirstAccess/firstAccessController.js";
import createPassword from "../controllers/FirstAccess/createPassword.js";
import validatePassword from '../middlewares/validatePassword.js';
const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);
publicRoute.post("/login-employer", loginEmployer);

// ======== FIRST ACCESS ========
publicRoute.post("/first-access", validatePassword, firstAccessController);
publicRoute.patch("/create-password", createPassword);

export default publicRoute;

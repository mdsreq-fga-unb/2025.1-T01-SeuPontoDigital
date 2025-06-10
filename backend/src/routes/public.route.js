import express from "express";
import loginAdmin from "../controllers/Admin/loginAdmin.js";
import loginApp from "../controllers/LoginApp/loginApp.js";
import firstAccessController from "../controllers/FirstAccess/firstAccessController.js";
import createPassword from "../controllers/FirstAccess/createPassword.js";
import forgottenPasswordController from "../controllers/ForgottenPassword/forgottenPasswordController.js";
import updatePassword from "../controllers/ForgottenPassword/updatePassword.js";
import validatePassword from '../middlewares/validatePassword.js';

const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);
publicRoute.post("/login-app", loginApp);

// ======== FIRST ACCESS ========
publicRoute.post("/first-access", validatePassword, firstAccessController);
publicRoute.patch("/create-password", createPassword);

// ======== FORGOTTEN PASSWORD ========
publicRoute.post("/forgotten-password", forgottenPasswordController);
publicRoute.patch("/update-password", updatePassword);

export default publicRoute;

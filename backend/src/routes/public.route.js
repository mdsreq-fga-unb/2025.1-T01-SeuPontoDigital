import express from "express";
import loginAdmin from "../controllers/Admin/loginAdmin.js";
import loginEmployer from "../controllers/Employers/loginEmployer.js";
import firstAccessController from "../controllers/FirstAccess/firstAccessController.js";
import verifyCodeController from "../controllers/FirstAccess/verifyCodeController.js";

const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);

publicRoute.post("/login-employer", loginEmployer);

publicRoute.post("/send-code", firstAccessController);

publicRoute.post("/verify-code", verifyCodeController);

export default publicRoute;

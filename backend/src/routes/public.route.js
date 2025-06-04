import express from "express";
import loginAdmin from "../controllers/Admin/loginAdmin.js";
import loginEmployer from "../controllers/Employers/loginEmployer.js";
import firstAccessController from "../controllers/FirstAccess/firstAccessController.js";
import verifyCodeController from "../controllers/FirstAccess/verifyCodeController.js";
import checkPasswordIsNull from "../middlewares/checkPasswordIsNull.js";
import createUserPassword from "../middlewares/createUserPassword.js";

const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);
publicRoute.post("/login-employer", loginEmployer);
publicRoute.post("/send-code", checkPasswordIsNull, firstAccessController);
publicRoute.post("/verify-code", verifyCodeController);
publicRoute.patch("/create-password", checkPasswordIsNull, createUserPassword);

export default publicRoute;

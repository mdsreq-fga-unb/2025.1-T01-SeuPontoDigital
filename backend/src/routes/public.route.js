import express from "express";
import loginMobile from "../controllers/loginMobile.js";
import loginAdmin from "../controllers/Admin/loginAdmin.js";

const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);
publicRoute.post("/loginMobile", loginMobile);

export default publicRoute;

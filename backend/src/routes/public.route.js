import express from "express";
import loginAdmin from "../controllers/loginAdmin.js";
import loginMobile from "../controllers/loginMobile.js";

const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);
publicRoute.post("/loginMobile", loginMobile);


export default publicRoute;
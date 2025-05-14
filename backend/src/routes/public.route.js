import express from "express";
import loginAdmin from "../controllers/loginAdmin.js";

const publicRoute = express.Router();

publicRoute.post("/login", loginAdmin);

export default publicRoute;
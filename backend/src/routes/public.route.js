import express from "express";
import getAdmin from "../controllers/getAdmin.js";

const publicRoute = express.Router();

publicRoute.post("/login", getAdmin);

export default publicRoute;
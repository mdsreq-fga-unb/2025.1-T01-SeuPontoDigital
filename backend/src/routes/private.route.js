import express from "express";
import getEmployees from "../controllers/getEmployees.js";
import authVerifyToken from "../middleware/authVerifyToken.js";

const privateRoute = express.Router();

privateRoute.get("/dashboard", authVerifyToken, getEmployees);

export default privateRoute;
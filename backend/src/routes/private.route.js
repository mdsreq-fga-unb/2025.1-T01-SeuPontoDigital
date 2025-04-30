import express from "express";
import getEmployees from "../controllers/getEmployees.js";
import authVerifyJWT from "../middleware/authVerifyToken.js";

const privateRoute = express.Router();

privateRoute.get("/dashboard", authVerifyJWT, getEmployees);

export default privateRoute;
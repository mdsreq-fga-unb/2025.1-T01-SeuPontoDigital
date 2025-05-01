import express from "express";
import getEmployees from "../controllers/getEmployees.js";
import authVerifyToken from "../middlewares/authVerifyToken.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

privateRoute.get("/empregados", getEmployees);

export default privateRoute;
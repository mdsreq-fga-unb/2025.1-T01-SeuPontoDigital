import express from "express";
import getEmployees from "../controllers/getEmployees.js";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import postEmployee from "../controllers/postEmployee.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

privateRoute.get("/empregados", getEmployees);

privateRoute.post("/empregados", postEmployee)

export default privateRoute;
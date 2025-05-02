import express from "express";
import getEmployees from "../controllers/Employees/getEmployees.js";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import postEmployee from "../controllers/Employees/postEmployee.js";
import updateEmployee from "../controllers/Employees/updateEmployee.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES =============

privateRoute.get("/empregados", getEmployees);
privateRoute.post("/empregados", postEmployee);
privateRoute.put("/empregados/:id", updateEmployee);

// ============= EMPLOYERS =============

export default privateRoute;
import express from "express";
import getEmployees from "../controllers/Employees/getEmployees.js";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import postEmployee from "../controllers/Employees/postEmployee.js";
import updateEmployee from "../controllers/Employees/updateEmployee.js";
import deleteEmployee from "../controllers/Employees/deleteEmployee.js";
import getEmployers from "../controllers/Employers/getEmployers.js";
import validateEmail from "../services/validateEmail.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES =============

privateRoute.get("/empregados", getEmployees);
privateRoute.post("/empregados", postEmployee);
privateRoute.put("/empregados/:id", updateEmployee);
privateRoute.delete("/empregados/:id", deleteEmployee);

// ============= EMPLOYERS =============

privateRoute.get("/empregadores", getEmployers);

export default privateRoute;
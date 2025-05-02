import express from "express";
import getEmployees from "../controllers/Employees/getEmployees.js";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import postEmployee from "../controllers/Employees/postEmployee.js";
import updateEmployee from "../controllers/Employees/updateEmployee.js";
import deleteEmployee from "../controllers/Employees/deleteEmployee.js";
import getEmployers from "../controllers/Employers/getEmployers.js";
import postEmployer from "../controllers/Employers/postEmployer.js";
import validateEmail from "../middlewares/validateEmail.js";
import deleteEmployer from "../controllers/Employers/deleteEmployer.js";
import updateEmployer from "../controllers/Employers/updateEmployer.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES =============

privateRoute.get("/empregados", getEmployees);
privateRoute.post("/empregados", postEmployee);
privateRoute.put("/empregados/:id", updateEmployee);
privateRoute.delete("/empregados/:id", deleteEmployee);

// ============= EMPLOYERS =============

privateRoute.get("/empregadores", getEmployers);
privateRoute.post("/empregadores", validateEmail, postEmployer);
privateRoute.put("/empregadores/:id", validateEmail, updateEmployer);
privateRoute.delete("/empregadores/:id", deleteEmployer);


export default privateRoute;
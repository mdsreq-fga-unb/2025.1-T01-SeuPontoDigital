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

// ============= EMPLOYEES (role: 0)=============

privateRoute.get("/employees", getEmployees);
privateRoute.post("/employee", validateEmail, postEmployee);
privateRoute.put("/employee/:id", updateEmployee);
privateRoute.delete("/employee/:id", deleteEmployee);

// ============= EMPLOYERS (role: 1)=============

privateRoute.get("/employers", getEmployers);
privateRoute.post("/employer", validateEmail, postEmployer);
privateRoute.put("/employer/:id", validateEmail, updateEmployer);
privateRoute.delete("/employer/:id", deleteEmployer);


export default privateRoute;
import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import validateEmail from "../middlewares/validateEmail.js";
import getEmployeesController from "../controllers/Employees/getEmployeesController.js";
import postEmployeeController from "../controllers/Employees/postEmployeeController.js";
import updateEmployeeController from "../controllers/Employees/updateEmployeeController.js";
import deleteEmployeeController from "../controllers/Employees/deleteEmployeeController.js";
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";
import updateEmployerController from "../controllers/Employers/updateEmployerController.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES (role: 0)=============

privateRoute.get("/employees", getEmployeesController);
privateRoute.post("/employee", validateEmail, postEmployeeController);
privateRoute.put("/employee/:id", validateEmail, updateEmployeeController);
privateRoute.delete("/employee/:id", deleteEmployeeController);

// ============= EMPLOYERS (role: 1)=============

privateRoute.get("/employers", getEmployersController);
privateRoute.post("/employer", validateEmail, postEmployerController);
privateRoute.put("/employer/:id", validateEmail, updateEmployerController);
privateRoute.delete("/employer/:id", deleteEmployerController);


export default privateRoute;
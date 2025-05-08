import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import validateUser from "../middlewares/validateUser.js";
import getEmployeesController from "../controllers/Employees/getEmployeesController.js";
import getOneEmployeeController from "../controllers/Employees/getOneEmployeeController.js";
import postEmployeeController from "../controllers/Employees/postEmployeeController.js";
import updateEmployeeController from "../controllers/Employees/updateEmployeeController.js";
import deleteEmployeeController from "../controllers/Employees/deleteEmployeeController.js";
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import getOneEmployerController from "../controllers/Employers/getOneEmployerController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";
import updateEmployerController from "../controllers/Employers/updateEmployerController.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES (role: 0)=============

privateRoute.get("/employees", getEmployeesController);
privateRoute.get("/employee/:id", getOneEmployeeController);
privateRoute.post("/employee", validateUser, postEmployeeController);
privateRoute.put("/employee/:id", validateUser, updateEmployeeController);
privateRoute.delete("/employee/:id", deleteEmployeeController);

// ============= EMPLOYERS (role: 1)=============

privateRoute.get("/employers", getEmployersController);
privateRoute.get("/employer/:id", getOneEmployerController);
privateRoute.post("/employer", validateUser, postEmployerController);
privateRoute.put("/employer/:id", validateUser, updateEmployerController);
privateRoute.delete("/employer/:id", deleteEmployerController);


export default privateRoute;
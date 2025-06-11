import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import validateUser from "../middlewares/validateUser.js";
import {validateDateTwoYearsEmployee, validateDateTwoYearsEmployer} from "../middlewares/validateDateTwoYears.js";
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import getOneEmployerController from "../controllers/Employers/getOneEmployerController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";
import putEmployerController from "../controllers/Employers/putEmployerController.js";
import postAddressController from "../controllers/Address/postAddressController.js";
import putAddressController from "../controllers/Address/putAddressController.js";
import postEmployeeController from "../controllers/Employees/postEmployeeController.js";
import getEmployeesController from "../controllers/Employees/getEmployeesController.js";
import getOneEmployeeController from "../controllers/Employees/getOneEmployeeController.js";
import putEmployeeController from "../controllers/Employees/putEmployeeController.js";
import deleteEmployeeController from "../controllers/Employees/deleteEmployeeController.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ================= ADDRESS =================
privateRoute.post("/address", postAddressController);
privateRoute.put("/address/:id", putAddressController);

// ============= EMPLOYEES-CONTRACTS =============

// privateRoute.get("/contracts", getContractsController);
// privateRoute.get("/contract/:id", getOneContractController);
// privateRoute.post("/contract", validateUser, validateContract, postContractController);
// privateRoute.put("/contract/:id", validateUser, validateContract, putContractController);
// privateRoute.delete("/contract/:id", verifyDateContract, deleteContractController);

// ================== EMPLOYERS ==================

privateRoute.get("/employers", getEmployersController);
privateRoute.get("/employer/:id", getOneEmployerController);
privateRoute.post("/employer", validateUser, postEmployerController);
privateRoute.put("/employer/:id", validateUser, putEmployerController);
privateRoute.delete("/employer/:id", validateDateTwoYearsEmployer, deleteEmployerController);

// ================== EMPLOYEES ==================

privateRoute.get("/employees", getEmployeesController);
privateRoute.get("/employee/:id", getOneEmployeeController);
privateRoute.post("/employee", validateUser, postEmployeeController);
privateRoute.put("/employee/:id", validateUser, putEmployeeController);
privateRoute.delete("/employee/:id", validateDateTwoYearsEmployee, deleteEmployeeController);

export default privateRoute;

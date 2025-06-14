import express from "express";
import validateTokenJWT from "../middlewares/validateTokenJWT.js";
import validateUser from "../middlewares/validateUser.js";
import validateDataContract from "../middlewares/validateDataContract.js"
import {validateDateTwoYearsEmployee, validateDateTwoYearsEmployer, validateDateTwoYearsContract} from "../middlewares/validateDateTwoYears.js";
import postAddressController from "../controllers/Address/postAddressController.js";
import putAddressController from "../controllers/Address/putAddressController.js";
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import getOneEmployerController from "../controllers/Employers/getOneEmployerController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";
import putEmployerController from "../controllers/Employers/putEmployerController.js";
import getEmployeesController from "../controllers/Employees/getEmployeesController.js";
import getOneEmployeeController from "../controllers/Employees/getOneEmployeeController.js";
import postEmployeeController from "../controllers/Employees/postEmployeeController.js";
import deleteEmployeeController from "../controllers/Employees/deleteEmployeeController.js";
import putEmployeeController from "../controllers/Employees/putEmployeeController.js";
import getContractsController from "../controllers/Contracts/getContractsController.js";
import getOneContractController from "../controllers/Contracts/getOneContractController.js";
import postContractController from "../controllers/Contracts/postContractController.js";
import putContractController from "../controllers/Contracts/putContractController.js";
import deleteContractController from "../controllers/Contracts/deleteContractController.js";
import postWorkAddressController from "../controllers/WorkAddress/postWorkAddressController.js";
import getAllWorkAddressController from "../controllers/WorkAddress/getAllWorkAddressController.js";
import getAllEmployController from "../controllers/Employ/getEmployController.js";
import postEmployController from "../controllers/Employ/postEmployController.js";
import getAllSignContractController from "../controllers/SignContract /getAllSignContractController.js";
import getOneSignContractController from "../controllers/SignContract /getOneSignContractController.js";
import postSignContractController from "../controllers/SignContract /postSignContractController.js";

const privateRoute = express.Router();

privateRoute.use(validateTokenJWT);

// ================= ADDRESS =================
privateRoute.post("/address", postAddressController);
privateRoute.put("/address/:id", putAddressController);


// ================= WORK ADDRESS =================
privateRoute.get("work-address", getAllWorkAddressController);
privateRoute.post("/work-address", postWorkAddressController);


// ================= CONTRACTS =================
privateRoute.get("/contracts", getContractsController);
privateRoute.get("/contract/:id", getOneContractController);
privateRoute.post("/contract", postContractController);
privateRoute.put("/contract/:id", validateDataContract, putContractController);
privateRoute.delete("/contract/:id", validateDateTwoYearsContract, deleteContractController);


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

// ================= EMPLOY =================
privateRoute.get("/employ", getAllEmployController);
privateRoute.post("/employ", postEmployController);


// ================= SIGN CONTRACT =================
privateRoute.get("/sign-contract", getAllSignContractController);
privateRoute.get("/sign-contract/:id", getOneSignContractController);
privateRoute.post("/sign-contract", postSignContractController);


export default privateRoute;

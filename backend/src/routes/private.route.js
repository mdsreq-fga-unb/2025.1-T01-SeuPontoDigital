import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";

// ========== IMPORTS DOS CONTROLLERS ==========

// Address Controllers
import postAddressController from "../controllers/Address/postAddressController.js";
import putAddressController from "../controllers/Address/putAddressController.js";

// Contract Controllers
import getContractsController from "../controllers/Contracts/getContractsController.js";
import getOneContractController from "../controllers/Contracts/getOneContractController.js";
import getFullContractDataController from "../controllers/Contracts/getFullContractDataController.js";
import getEmployeeAndContractsController from "../controllers/Contracts/getEmployeeAndContractsController.js";
import postContractController from "../controllers/Contracts/postContractController.js";
import postCompleteContractController from "../controllers/Contracts/postCompleteContractController.js";
import putContractController from "../controllers/Contracts/putContractController.js";
import deleteContractController from "../controllers/Contracts/deleteContractController.js";

// Employee Controllers
import getEmployeesController from "../controllers/Employees/getEmployeesController.js";
import getOneEmployeeController from "../controllers/Employees/getOneEmployeeController.js";
import postEmployeeController from "../controllers/Employees/postEmployeeController.js";
import putEmployeeController from "../controllers/Employees/putEmployeeController.js";
import deleteEmployeeController from "../controllers/Employees/deleteEmployeeController.js";

// Employer Controllers
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import getOneEmployerController from "../controllers/Employers/getOneEmployerController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import putEmployerController from "../controllers/Employers/putEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";

// SignContract Controllers
import getAllSignContractController from "../controllers/SignContract/getAllSignContractController.js";
import getOneSignContractController from "../controllers/SignContract/getOneSignContractController.js";
import postSignContractController from "../controllers/SignContract/postSignContractController.js";

// Employ Controllers
import postEmployController from "../controllers/Employ/postEmployController.js";

// WorkAddress Controllers
import postWorkAddressController from "../controllers/WorkAddress/postWorkAddressController.js";

// WorkSchedule Controllers
import getAllWorkScheduleController from "../controllers/WorkSchedule/getAllWorkScheduleController.js";
import getOneWorkScheduleController from "../controllers/WorkSchedule/getOneWorkScheduleController.js";
import postWorkScheduleController from "../controllers/WorkSchedule/postWorkScheduleController.js";
import putOneWorkScheduleController from "../controllers/WorkSchedule/putOneWorkScheduleController.js";
import deleteOneWorkScheduleController from "../controllers/WorkSchedule/deleteOneWorkScheduleController.js";

// WorkBreaks Controllers
import putBreakController from "../controllers/WorkBreaks/putBreakController.js";

// Worklog Controllers
import postWorklogController from "../controllers/Worklog/postWorklogController.js";
import putWorklogController from "../controllers/Worklog/putWorklogController.js";

const privateRoute = express.Router();

// Aplicar middleware de autenticação em todas as rotas privadas
privateRoute.use(authVerifyToken);

// ========== ADDRESS ROUTES ==========
privateRoute.post("/address", postAddressController);
privateRoute.put("/address/:id", putAddressController);

// ========== CONTRACT ROUTES ==========
privateRoute.get("/contracts", getContractsController);
privateRoute.get("/contract/:id", getOneContractController);
privateRoute.get("/contract/:id/full", getFullContractDataController);
privateRoute.get("/employee-contracts/:id", getEmployeeAndContractsController);
privateRoute.post("/contract", postContractController);
privateRoute.post("/contract/complete", postCompleteContractController);
privateRoute.put("/contract/:id", putContractController);
privateRoute.delete("/contract/:id", deleteContractController);

// ========== EMPLOYEE ROUTES ==========
privateRoute.get("/employees", getEmployeesController);
privateRoute.get("/employee/:id", getOneEmployeeController);
privateRoute.post("/employee", postEmployeeController);
privateRoute.put("/employee/:id", putEmployeeController);
privateRoute.delete("/employee/:id", deleteEmployeeController);

// ========== EMPLOYER ROUTES ==========
privateRoute.get("/employers", getEmployersController);
privateRoute.get("/employer/:id", getOneEmployerController);
privateRoute.post("/employer", postEmployerController);
privateRoute.put("/employer/:id", putEmployerController);
privateRoute.delete("/employer/:id", deleteEmployerController);

// ========== SIGN CONTRACT ROUTES ==========
privateRoute.get("/sign-contract", getAllSignContractController);
privateRoute.get("/sign-contract/:id", getOneSignContractController);
privateRoute.post("/sign-contract", postSignContractController);

// ========== EMPLOY ROUTES ==========
privateRoute.post("/employ", postEmployController);

// ========== WORK ADDRESS ROUTES ==========
privateRoute.post("/work-address", postWorkAddressController);

// ========== WORK SCHEDULE ROUTES ==========
privateRoute.get("/workschedule", getAllWorkScheduleController);
privateRoute.get("/workschedule/:id", getOneWorkScheduleController);
privateRoute.post("/workschedule/:id", postWorkScheduleController);
privateRoute.put("/workschedule/:id", putOneWorkScheduleController);
privateRoute.delete("/workschedule/:id", deleteOneWorkScheduleController);

// ========== WORK BREAKS ROUTES ==========
privateRoute.put("/workbreak/:id", putBreakController);

// ========== WORKLOG ROUTES ==========
privateRoute.post("/worklog", postWorklogController);
privateRoute.put("/worklog", putWorklogController);

export default privateRoute;
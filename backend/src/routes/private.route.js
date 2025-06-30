import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import validateUser from "../middlewares/validateUser.js";
import validateContract from "../middlewares/validateContract.js"
import validateCPF from "../middlewares/validateCPF.js";
import verifyDateEmployer from "../middlewares/verifyDateEmployer.js";
import verifyDateContract from "../middlewares/verifyDateContract.js";
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import getOneEmployerController from "../controllers/Employers/getOneEmployerController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";
import putEmployerController from "../controllers/Employers/putEmployerController.js";
import postContractController from "../controllers/Contracts/postContractController.js";
import getContractsController from "../controllers/Contracts/getContractsController.js";
import getOneContractController from "../controllers/Contracts/getOneContractController.js";
import deleteContractController from "../controllers/Contracts/deleteContractController.js";
import putContractController from "../controllers/Contracts/putContractController.js";
import postWorklogController from "../controllers/Worklog/postWorklogController.js";
import putWorklogController from "../controllers/Worklog/putWorklogController.js";
import getEmployeeAndContractsController from "../controllers/Contracts/getEmployeeAndContractsController.js";
import getTodayRecordsController from "../controllers/Worklog/getTodayRecordsController.js";
import getRecordsController from "../controllers/Worklog/getRecordsController.js"

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES-CONTRACTS =============

privateRoute.get("/contracts", getContractsController);
privateRoute.get("/contract/:id", getOneContractController);
privateRoute.get("/employee-contracts", getEmployeeAndContractsController);
privateRoute.post("/contract", validateUser, validateContract, postContractController);
privateRoute.put("/contract/:id", validateUser, validateContract, putContractController);
privateRoute.delete("/contract/:id", verifyDateContract, deleteContractController);

// ================== EMPLOYERS ==================

privateRoute.get("/employers", getEmployersController);
privateRoute.get("/employer/:id", getOneEmployerController);
privateRoute.post("/employer", validateUser, postEmployerController);
privateRoute.put("/employer/:id", validateUser, putEmployerController);
privateRoute.delete("/employer/:id", verifyDateEmployer, deleteEmployerController);

// ================== WORKLOGS ==================
privateRoute.get("/worklogToday/:id", getTodayRecordsController);
privateRoute.get("/worklog", getRecordsController); //US17 nova, apague este comentário em produção
privateRoute.post("/worklog", postWorklogController);
privateRoute.put("/worklog", putWorklogController);

export default privateRoute;

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
import postContractController from "../controllers/ContractEmployee/postContractController.js";
import getContractsController from "../controllers/ContractEmployee/getContractsController.js";
import getOneContractController from "../controllers/ContractEmployee/getOneContractController.js";
import deleteContractController from "../controllers/ContractEmployee/deleteContractController.js";
import putContractController from "../controllers/ContractEmployee/putContractController.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES-CONTRACTS =============

privateRoute.get("/contracts", getContractsController);
privateRoute.get("/contract/:id", getOneContractController);
privateRoute.post("/contract", validateUser, validateContract, postContractController);
privateRoute.put("/contract/:id", validateUser, validateContract, putContractController);
privateRoute.delete("/contract/:id", verifyDateContract, deleteContractController);

// ================== EMPLOYERS ==================

privateRoute.get("/employers", getEmployersController);
privateRoute.get("/employer/:id", getOneEmployerController);
privateRoute.post("/employer", validateUser, postEmployerController);
privateRoute.put("/employer/:id", validateUser, putEmployerController);
privateRoute.delete("/employer/:id", verifyDateEmployer, deleteEmployerController);

export default privateRoute;

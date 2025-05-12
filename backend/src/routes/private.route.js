import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";
import validateUser from "../middlewares/validateUser.js";
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import getOneEmployerController from "../controllers/Employers/getOneEmployerController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";
import updateEmployerController from "../controllers/Employers/updateEmployerController.js";
import postContractController from "../controllers/ContractEmployee/postContractController.js";
import getContractsController from "../controllers/ContractEmployee/getContractsController.js";
import getOneContractController from "../controllers/ContractEmployee/getOneContractController.js";

const privateRoute = express.Router();

privateRoute.use(authVerifyToken);

// ============= EMPLOYEES-CONTRACTS=============

privateRoute.get("/contracts", getContractsController);
privateRoute.get("/contract/:id", getOneContractController);
privateRoute.post("/contract", validateUser, postContractController);
// privateRoute.put("/contract/:id", validateUser, );
// privateRoute.delete("/contract/:id", );

// ============= EMPLOYERS =============

privateRoute.get("/employers", getEmployersController);
privateRoute.get("/employer/:id", getOneEmployerController);
privateRoute.post("/employer", validateUser, postEmployerController);
privateRoute.put("/employer/:id", validateUser, updateEmployerController);
privateRoute.delete("/employer/:id", deleteEmployerController);

export default privateRoute;